'use client';

import React, { useState, useEffect } from 'react';

type TaskStatus = 'idle' | 'running' | 'waiting' | 'done';

interface AsyncObj {
    id: number;
    name: string;
    duration: number; // in increments of 100ms
    progress: number;
    status: TaskStatus;
}

const ConcurrencyVisualizer: React.FC = () => {
    const [mode, setMode] = useState<'sync' | 'async'>('sync');
    const [tasks, setTasks] = useState<AsyncObj[]>([
        { id: 1, name: 'Fetch User', duration: 40, progress: 0, status: 'idle' },
        { id: 2, name: 'Fetch Posts', duration: 30, progress: 0, status: 'idle' },
        { id: 3, name: 'Fetch Comments', duration: 20, progress: 0, status: 'idle' }
    ]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const reset = () => {
        setTasks(tasks.map(t => ({ ...t, progress: 0, status: 'idle' })));
        setTimeElapsed(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPlaying) {
            timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);

                setTasks(currentTasks => {
                    let updated = [...currentTasks];

                    if (mode === 'sync') {
                        // Find first incomplete task
                        const activeIdx = updated.findIndex(t => t.progress < t.duration);

                        if (activeIdx !== -1) {
                            // Update status of all tasks
                            updated = updated.map((t, i) => {
                                if (i === activeIdx) {
                                    return { ...t, progress: t.progress + 1, status: 'running' };
                                } else if (i < activeIdx) {
                                    return { ...t, status: 'done' };
                                } else {
                                    return { ...t, status: 'idle' };
                                }
                            });
                        } else {
                            // All done
                            updated = updated.map(t => ({ ...t, status: 'done' }));
                            setIsPlaying(false);
                        }
                    } else if (mode === 'async') {
                        // All incomplete tasks run concurrently
                        let allDone = true;

                        updated = updated.map(t => {
                            if (t.progress < t.duration) {
                                allDone = false;
                                return { ...t, progress: t.progress + 1, status: 'running' };
                            }
                            return { ...t, status: 'done' };
                        });

                        if (allDone) {
                            setIsPlaying(false);
                        }
                    }

                    return updated;
                });
            }, 100);
        }

        return () => clearInterval(timer);
    }, [isPlaying, mode]);

    const handlePlay = () => {
        if (tasks.every(t => t.progress >= t.duration)) {
            reset();
            setTimeout(() => setIsPlaying(true), 50);
        } else {
            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('sync'); reset(); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'sync' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Synchronous (Blocking)
                    </button>
                    <button
                        onClick={() => { setMode('async'); reset(); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'async' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Asynchronous (Concurrent)
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handlePlay}
                        disabled={isPlaying && tasks.some(t => t.progress < t.duration)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 ${isPlaying && tasks.some(t => t.progress < t.duration) ? 'bg-slate-200 text-slate-400' : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Run
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                        Reset
                    </button>
                </div>
            </div>

            <div className="p-6 bg-dot-pattern relative flex flex-col gap-6 overflow-x-auto">

                <div className="flex justify-between items-center mb-2 px-2">
                    <div className="font-mono text-sm font-medium text-slate-700">Total Time: <span className="text-blue-600 font-bold">{(timeElapsed / 10).toFixed(1)}s</span></div>
                    {mode === 'sync' ? (
                        <div className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">Tasks wait for each other</div>
                    ) : (
                        <div className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">Tasks run at the same time</div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="relative">
                            <div className="flex justify-between text-xs font-mono mb-1 px-1">
                                <span className={task.status === 'running' ? 'text-blue-600 font-bold' : 'text-slate-500'}>{task.name}</span>
                                <span className="text-slate-400">{(task.duration / 10).toFixed(1)}s</span>
                            </div>
                            <div className="h-8 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-inner relative">
                                <div
                                    className={`h-full absolute top-0 left-0 transition-all duration-100 ease-linear ${task.status === 'done' ? 'bg-green-500' : 'bg-blue-500'}`}
                                    style={{ width: `${(task.progress / task.duration) * 100}%` }}
                                >
                                    {task.status === 'running' && (
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    )}
                                </div>

                                {task.status === 'waiting' && mode === 'sync' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-mono text-slate-400">waiting for previous...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm text-slate-300 shadow-inner">
                    {mode === 'sync' ? (
                        <>
                            <div className="text-pink-400 mb-2"># Synchronous execution</div>
                            <div className="text-blue-300">import <span className="text-white">time</span></div>
                            <br />
                            <div className="text-blue-300">def <span className="text-yellow-200">fetch_data</span>():</div>
                            <div className="pl-4">time.sleep(<span className="text-orange-300">4.0</span>)  <span className="text-slate-500"># blocks everything</span></div>
                            <div className="pl-4 text-green-300">return <span className="text-green-200">"data"</span></div>
                        </>
                    ) : (
                        <>
                            <div className="text-pink-400 mb-2"># Asynchronous execution</div>
                            <div className="text-blue-300">import <span className="text-white">asyncio</span></div>
                            <br />
                            <div className="text-blue-300">async def <span className="text-yellow-200">fetch_data</span>():</div>
                            <div className="pl-4">await asyncio.sleep(<span className="text-orange-300">4.0</span>)  <span className="text-slate-500"># yields control back</span></div>
                            <div className="pl-4 text-green-300">return <span className="text-green-200">"data"</span></div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ConcurrencyVisualizer;
