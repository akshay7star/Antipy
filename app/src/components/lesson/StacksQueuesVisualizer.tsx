'use client';

import React, { useState } from 'react';

const StacksQueuesVisualizer: React.FC = () => {
    // Stack State
    const [stack, setStack] = useState<number[]>([10, 20]);
    const [stackAction, setStackAction] = useState<{ type: 'push' | 'pop', val?: number } | null>(null);

    // Queue State
    const [queue, setQueue] = useState<number[]>([10, 20]);
    const [queueAction, setQueueAction] = useState<{ type: 'enqueue' | 'dequeue', val?: number } | null>(null);

    const handleStackPush = () => {
        if (stack.length >= 6) return;
        const val = Math.floor(Math.random() * 90) + 10; // random 10-99
        setStackAction({ type: 'push', val });
        setTimeout(() => {
            setStack(prev => [...prev, val]);
            setStackAction(null);
        }, 500);
    };

    const handleStackPop = () => {
        if (stack.length === 0) return;
        setStackAction({ type: 'pop', val: stack[stack.length - 1] });
        setTimeout(() => {
            setStack(prev => prev.slice(0, -1));
            setStackAction(null);
        }, 500);
    };

    const handleQueueEnqueue = () => {
        if (queue.length >= 6) return;
        const val = Math.floor(Math.random() * 90) + 10;
        setQueueAction({ type: 'enqueue', val });
        setTimeout(() => {
            setQueue(prev => [...prev, val]);
            setQueueAction(null);
        }, 500);
    };

    const handleQueueDequeue = () => {
        if (queue.length === 0) return;
        setQueueAction({ type: 'dequeue', val: queue[0] });
        setTimeout(() => {
            setQueue(prev => prev.slice(1));
            setQueueAction(null);
        }, 500);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">

            <div className="p-8 bg-dot-pattern flex flex-col md:flex-row gap-8 items-stretch justify-center min-h-[400px] overflow-x-auto">

                {/* ---------------- STACK SECTION ---------------- */}
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-lg text-indigo-700 mb-1">Stack (LIFO)</h3>
                    <p className="text-xs text-slate-500 font-mono mb-6">Last In, First Out</p>

                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={handleStackPush} disabled={stack.length >= 6 || stackAction !== null}
                            className="px-4 py-1.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 text-sm font-medium rounded transition-colors"
                        >
                            Push(x)
                        </button>
                        <button
                            onClick={handleStackPop} disabled={stack.length === 0 || stackAction !== null}
                            className="px-4 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-50 text-sm font-medium rounded transition-colors"
                        >
                            Pop()
                        </button>
                    </div>

                    {/* Stack Container */}
                    <div className="relative w-32 h-64 border-x-4 border-b-4 border-slate-700 rounded-b-lg flex flex-col-reverse justify-start items-center p-2 bg-slate-50">

                        {stack.map((val, idx) => {
                            const isTop = idx === stack.length - 1;
                            const isPopping = isTop && stackAction?.type === 'pop';

                            return (
                                <div
                                    key={`s-${idx}`}
                                    className={`w-full h-8 mb-1 flex items-center justify-center font-mono font-bold text-white shadow-sm rounded transition-all duration-300
                                        ${isPopping ? 'bg-rose-500 transform -translate-y-16 opacity-0' : 'bg-indigo-500 transform translate-y-0 opacity-100'}
                                    `}
                                >
                                    {val}
                                    {isTop && !isPopping && <div className="absolute -left-12 text-xs font-mono text-indigo-600 animate-pulse">top &rarr;</div>}
                                </div>
                            );
                        })}

                        {/* Incoming Push Item */}
                        {stackAction?.type === 'push' && (
                            <div className="w-full h-8 bg-indigo-500 flex items-center justify-center font-mono font-bold text-white shadow-sm rounded absolute -top-12 animate-in slide-in-from-top-12 duration-500 z-10">
                                {stackAction.val}
                            </div>
                        )}

                        {stack.length === 0 && stackAction === null && (
                            <div className="h-full flex items-center justify-center text-slate-400 font-mono text-xs italic">
                                empty
                            </div>
                        )}
                    </div>
                </div>

                {/* ---------------- QUEUE SECTION ---------------- */}
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-lg text-emerald-700 mb-1">Queue (FIFO)</h3>
                    <p className="text-xs text-slate-500 font-mono mb-6">First In, First Out</p>

                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={handleQueueEnqueue} disabled={queue.length >= 6 || queueAction !== null}
                            className="px-4 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-50 text-sm font-medium rounded transition-colors"
                        >
                            Enqueue(x)
                        </button>
                        <button
                            onClick={handleQueueDequeue} disabled={queue.length === 0 || queueAction !== null}
                            className="px-4 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 text-sm font-medium rounded transition-colors"
                        >
                            Dequeue()
                        </button>
                    </div>

                    {/* Queue Container */}
                    <div className="relative w-full max-w-[280px] h-20 border-y-4 border-slate-700 flex flex-row-reverse justify-start items-center p-2 bg-slate-50 mt-12">

                        {queue.map((val, idx) => {
                            const isFront = idx === 0;
                            const isBack = idx === queue.length - 1;
                            const isDequeuing = isFront && queueAction?.type === 'dequeue';

                            return (
                                <div
                                    key={`q-${idx}`}
                                    className={`w-10 h-10 ml-2 flex-shrink-0 flex items-center justify-center font-mono font-bold text-white shadow-sm rounded transition-all duration-300 relative
                                        ${isDequeuing ? 'bg-amber-500 transform translate-x-16 opacity-0' : 'bg-emerald-500 transform translate-x-0 opacity-100'}
                                    `}
                                >
                                    {val}
                                    {isFront && !isDequeuing && <div className="absolute -top-6 text-xs font-mono text-amber-600 whitespace-nowrap">front</div>}
                                    {isBack && queueAction?.type !== 'enqueue' && !isDequeuing && <div className="absolute -bottom-6 text-xs font-mono text-emerald-600 whitespace-nowrap">back</div>}
                                </div>
                            );
                        })}

                        {/* Incoming Enqueue Item */}
                        {queueAction?.type === 'enqueue' && (
                            <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center font-mono font-bold text-white shadow-sm rounded absolute -left-12 animate-in slide-in-from-left-12 duration-500 z-10">
                                {queueAction.val}
                                <div className="absolute -bottom-6 text-xs font-mono text-emerald-600 whitespace-nowrap">back</div>
                            </div>
                        )}

                        {queue.length === 0 && queueAction === null && (
                            <div className="w-full flex items-center justify-center text-slate-400 font-mono text-xs italic">
                                empty
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StacksQueuesVisualizer;
