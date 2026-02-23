'use client';

import React, { useState, useEffect } from 'react';

type Mode = 'math' | 'random' | 'datetime';

interface StdlibVisualizerProps {
    initialMode?: Mode;
}

const StdlibVisualizer: React.FC<StdlibVisualizerProps> = ({ initialMode = 'math' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Math state
    const [mathInput, setMathInput] = useState(4.7);

    // Random state
    const [dice, setDice] = useState([1, 1, 1]);
    const [rolling, setRolling] = useState(false);

    // Datetime state
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (mode === 'datetime') {
            interval = setInterval(() => setTimeNow(new Date()), 1000);
        }
        return () => clearInterval(interval);
    }, [mode]);

    const rollDice = async () => {
        if (rolling) return;
        setRolling(true);

        let rolls = 0;
        const interval = setInterval(() => {
            setDice([
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1
            ]);
            rolls++;
            if (rolls > 10) {
                clearInterval(interval);
                setRolling(false);
            }
        }, 100);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => setMode('math')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'math' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        import math
                    </button>
                    <button
                        onClick={() => setMode('random')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'random' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        import random
                    </button>
                    <button
                        onClick={() => setMode('datetime')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'datetime' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        import datetime
                    </button>
                </div>
            </div>

            <div className="p-6 md:p-12 min-h-[350px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'math' && (
                    <div className="w-full max-w-2xl flex flex-col gap-8 items-center animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-lg">
                            <span className="text-slate-400 font-mono">Input x:</span>
                            <input
                                type="range"
                                min="0" max="10" step="0.1"
                                value={mathInput}
                                onChange={(e) => setMathInput(parseFloat(e.target.value))}
                                className="w-48 accent-blue-500"
                            />
                            <span className="text-blue-400 font-mono font-bold w-12 text-right">{mathInput.toFixed(1)}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                            <div className="bg-slate-900 border-t-4 border-t-green-500 p-6 rounded-lg text-center shadow-md relative overflow-hidden group hover:border-l-4 transition-all">
                                <div className="text-sm font-mono text-green-400 mb-2 bg-green-950/30 px-2 py-1 inline-block rounded">math.floor(x)</div>
                                <div className="text-4xl font-light text-slate-200">{Math.floor(mathInput)}</div>
                                <div className="text-xs text-slate-500 mt-2">Rounds DOWN to nearest int</div>
                            </div>

                            <div className="bg-slate-900 border-t-4 border-t-blue-500 p-6 rounded-lg text-center shadow-md relative overflow-hidden group hover:border-l-4 transition-all">
                                <div className="text-sm font-mono text-blue-400 mb-2 bg-blue-950/30 px-2 py-1 inline-block rounded">round(x)</div>
                                <div className="text-4xl font-light text-slate-200">{Math.round(mathInput)}</div>
                                <div className="text-xs text-slate-500 mt-2">Built-in: nearest int</div>
                            </div>

                            <div className="bg-slate-900 border-t-4 border-t-purple-500 p-6 rounded-lg text-center shadow-md relative overflow-hidden group hover:border-l-4 transition-all">
                                <div className="text-sm font-mono text-purple-400 mb-2 bg-purple-950/30 px-2 py-1 inline-block rounded">math.ceil(x)</div>
                                <div className="text-4xl font-light text-slate-200">{Math.ceil(mathInput)}</div>
                                <div className="text-xs text-slate-500 mt-2">Rounds UP to nearest int</div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg text-center shadow-md w-full max-w-sm flex justify-between items-center px-8">
                            <div>
                                <div className="text-sm font-mono text-yellow-400 mb-1">math.pi</div>
                                <div className="text-lg text-slate-200 font-mono">3.14159...</div>
                            </div>
                            <div className="h-8 w-px bg-slate-700"></div>
                            <div>
                                <div className="text-sm font-mono text-pink-400 mb-1">math.pow(x, 2)</div>
                                <div className="text-lg text-slate-200 font-mono">{(mathInput ** 2).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'random' && (
                    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={rollDice}
                            disabled={rolling}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={rolling ? "animate-spin" : ""}><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 12.8-15.61L21.5 8M2.5 22v-6h6M21.87 8.43a9 9 0 1 0-12.8 15.61L2.5 16" /></svg>
                            random.randint(1, 6)
                        </button>

                        <div className="flex gap-6">
                            {dice.map((val, i) => (
                                <div key={i} className={`w-24 h-24 bg-white rounded-xl shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_15px_-3px_rgba(0,0,0,0.3)] flex items-center justify-center relative ${rolling ? 'animate-bounce' : 'animate-in zoom-in duration-300'}`} style={{ animationDelay: `${i * 100}ms` }}>
                                    {val === 1 && <div className="w-4 h-4 bg-slate-900 rounded-full"></div>}
                                    {val === 2 && <>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 right-4"></div>
                                    </>}
                                    {val === 3 && <>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 right-4"></div>
                                    </>}
                                    {val === 4 && <>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 right-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 right-4"></div>
                                    </>}
                                    {val === 5 && <>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 right-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 right-4"></div>
                                    </>}
                                    {val === 6 && <>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-4 right-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-1/2 left-4 -translate-y-1/2"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-1/2 right-4 -translate-y-1/2"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 left-4"></div>
                                        <div className="w-4 h-4 bg-slate-900 rounded-full absolute bottom-4 right-4"></div>
                                    </>}
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 px-6 py-4 rounded-lg border border-slate-700 font-mono text-sm text-center shadow-lg w-full max-w-md mt-4">
                            <span className="text-purple-400">random.choice</span>([<span className="text-green-400">"apple"</span>, <span className="text-green-400">"banana"</span>, <span className="text-green-400">"cherry"</span>])<br />
                            <span className="text-slate-500 text-xs block mt-2">→ returns a random element from a list</span>
                        </div>
                    </div>
                )}

                {mode === 'datetime' && (
                    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                        {/* Digital Clock */}
                        <div className="bg-slate-900 border-2 border-slate-700 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                            <div className="text-center mb-6">
                                <div className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider mb-2">datetime.now()</div>
                                <div className="text-5xl md:text-6xl font-mono font-light text-slate-100 tracking-tight flex items-center justify-center gap-2">
                                    <span>{timeNow.getHours().toString().padStart(2, '0')}</span>
                                    <span className="animate-pulse text-slate-600">:</span>
                                    <span>{timeNow.getMinutes().toString().padStart(2, '0')}</span>
                                    <span className="animate-pulse text-slate-600">:</span>
                                    <span className="text-blue-400">{timeNow.getSeconds().toString().padStart(2, '0')}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-6">
                                <div className="text-center">
                                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">.year</div>
                                    <div className="text-xl text-slate-300 font-mono bg-slate-800 px-2 py-1 rounded">{timeNow.getFullYear()}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">.month</div>
                                    <div className="text-xl text-slate-300 font-mono bg-slate-800 px-2 py-1 rounded">{(timeNow.getMonth() + 1).toString().padStart(2, '0')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">.day</div>
                                    <div className="text-xl text-slate-300 font-mono bg-slate-800 px-2 py-1 rounded">{timeNow.getDate().toString().padStart(2, '0')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Timedelta Visualization */}
                        <div className="flex items-center gap-4 bg-slate-900 px-6 py-4 rounded-xl border border-dashed border-slate-600">
                            <div className="text-sm font-mono text-slate-400 text-center">
                                <span className="text-blue-300 font-bold block mb-1">datetime.date.today()</span>
                                <span>{timeNow.toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-green-400 font-mono mb-1">+ timedelta(days=7)</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="m9 18 6-6-6-6" /></svg>
                            </div>
                            <div className="text-sm font-mono text-slate-400 text-center">
                                <span className="text-purple-300 font-bold block mb-1">Next Week</span>
                                <span>{new Date(timeNow.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default StdlibVisualizer;
