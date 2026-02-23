'use client';

import React, { useState } from 'react';

type Mode = 'slice' | 'methods';

interface StringsVisualizerProps {
    initialMode?: Mode;
}

const StringsVisualizer: React.FC<StringsVisualizerProps> = ({ initialMode = 'slice' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Slice state
    const targetString = "PYTHON";
    const [startIdx, setStartIdx] = useState(1);
    const [endIdx, setEndIdx] = useState(4);

    // Methods state
    const baseString = " Hello, World! ";
    const [method, setMethod] = useState<'upper' | 'lower' | 'strip' | 'replace'>('upper');
    const [executed, setExecuted] = useState(false);

    const handleMethodRun = () => {
        setExecuted(false);
        setTimeout(() => setExecuted(true), 100);
    };

    let resultString = baseString;
    if (method === 'upper') resultString = baseString.toUpperCase();
    if (method === 'lower') resultString = baseString.toLowerCase();
    if (method === 'strip') resultString = baseString.trim();
    if (method === 'replace') resultString = baseString.replace("World", "Python");

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('slice'); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'slice' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Indexing & Slicing
                    </button>
                    <button
                        onClick={() => { setMode('methods'); setExecuted(false); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'methods' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Methods & Immutability
                    </button>
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'slice' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Interactive Pointers & Index inputs */}
                        <div className="flex gap-4 p-4 bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl w-full justify-center">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">text</span>[
                                <input
                                    type="number"
                                    className="w-12 bg-background border border-divider rounded px-1 text-center"
                                    value={startIdx}
                                    onChange={(e) => setStartIdx(Number(e.target.value))}
                                />
                                :
                                <input
                                    type="number"
                                    className="w-12 bg-background border border-divider rounded px-1 text-center"
                                    value={endIdx}
                                    onChange={(e) => setEndIdx(Number(e.target.value))}
                                />
                                ]
                            </div>
                        </div>

                        {/* Array mapping */}
                        <div className="relative pt-8 pb-8 flex flex-col items-center">
                            {/* Positive Indexes */}
                            <div className="flex gap-1 mb-2">
                                {targetString.split('').map((_, i) => (
                                    <div key={`pos-${i}`} className="w-12 text-center text-xs font-mono text-slate-400">
                                        {i}
                                    </div>
                                ))}
                            </div>

                            {/* The String */}
                            <div className="flex gap-1">
                                {targetString.split('').map((char, i) => {
                                    // Handle python style negative and positive wrapping logic safely
                                    const safeStart = startIdx < 0 ? Math.max(0, targetString.length + startIdx) : startIdx;
                                    const safeEnd = endIdx < 0 ? Math.max(0, targetString.length + endIdx) : (endIdx === 0 ? targetString.length : endIdx);

                                    const isIncluded = i >= safeStart && i < safeEnd;

                                    return (
                                        <div
                                            key={`char-${i}`}
                                            className={`w-12 h-16 rounded border-2 flex items-center justify-center font-mono font-bold text-2xl transition-all duration-300 ${isIncluded ? 'bg-blue-900/80 border-blue-500 text-blue-300 scale-110 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-500'}`}
                                        >
                                            {char}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Negative Indexes */}
                            <div className="flex gap-1 mt-2">
                                {targetString.split('').map((_, i) => (
                                    <div key={`neg-${i}`} className="w-12 text-center text-xs font-mono text-slate-500">
                                        {-(targetString.length - i)}
                                    </div>
                                ))}
                            </div>

                            {/* Visual Pointers based on inputs */}
                            <div className="absolute left-0 right-0 h-full pointer-events-none">
                                {/* We can leave this pure CSS layout for now */}
                            </div>
                        </div>

                        {/* Result Output */}
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-sm font-mono text-slate-400">Result = </span>
                            <div className="px-4 py-2 bg-slate-900 border border-slate-700 font-mono text-emerald-400 font-bold tracking-widest rounded shadow-inner">
                                "{targetString.slice(startIdx, endIdx)}"
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'methods' && (
                    <div className="w-full max-w-2xl flex flex-col gap-8 relative">
                        {/* Editor Line */}
                        <div className="flex flex-col gap-4 p-4 bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl">
                            <div className="flex gap-4 border-b border-slate-800 pb-4">
                                <button onClick={() => { setMethod('upper'); setExecuted(false); }} className={`px-2 py-1 rounded ${method === 'upper' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-slate-800'}`}>.upper()</button>
                                <button onClick={() => { setMethod('lower'); setExecuted(false); }} className={`px-2 py-1 rounded ${method === 'lower' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-slate-800'}`}>.lower()</button>
                                <button onClick={() => { setMethod('strip'); setExecuted(false); }} className={`px-2 py-1 rounded ${method === 'strip' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-slate-800'}`}>.strip()</button>
                                <button onClick={() => { setMethod('replace'); setExecuted(false); }} className={`px-2 py-1 rounded ${method === 'replace' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-slate-800'}`}>.replace("World", "Python")</button>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-blue-400">new_text</span> = <span className="text-blue-400">text</span>.<span className="text-yellow-300">{method}</span>(
                                {method === 'replace' && <span className="text-green-400">"World"</span>}
                                {method === 'replace' && <span className="text-slate-300">, </span>}
                                {method === 'replace' && <span className="text-green-400">"Python"</span>}
                                )
                                <button onClick={handleMethodRun} className="ml-auto px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded shadow">Execute</button>
                            </div>
                        </div>

                        {/* Visual Memory Blocks */}
                        <div className="flex justify-between items-end pb-8">

                            {/* Original String */}
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-mono font-bold text-slate-500 tracking-widest mb-2 border-b-2 border-slate-700 pb-1 w-full text-center">text</div>
                                <div className="p-4 bg-slate-800 border-2 border-slate-600 font-mono text-slate-300 font-bold tracking-wider rounded-lg shadow-xl opacity-90 transition-all duration-300 flex">
                                    {baseString.split('').map((char, i) => (
                                        <span key={i} className={char === ' ' ? 'w-3 bg-red-500/20 mx-[1px] rounded' : ''}>{char}</span>
                                    ))}
                                </div>
                                <div className="text-xs text-slate-500 mt-2 italic">Immutable (Never changes)</div>
                            </div>

                            {/* Arrow */}
                            <div className="flex-1 flex justify-center mb-8">
                                <svg className={`w-24 h-8 transition-opacity duration-300 ${executed ? 'opacity-100 text-green-500' : 'opacity-0'}`} viewBox="0 0 100 24" fill="none" stroke="currentColor">
                                    <path d="M0 12 L100 12 M90 4 L100 12 L90 20" strokeWidth="2" />
                                </svg>
                            </div>

                            {/* New String */}
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-mono font-bold text-slate-500 tracking-widest mb-2 border-b-2 border-slate-700 pb-1 w-full text-center">new_text</div>
                                {executed ? (
                                    <div className="p-4 bg-green-900/30 border-2 border-green-500 font-mono text-green-400 font-bold tracking-wider rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-in zoom-in slide-in-from-left-8 duration-500 flex">
                                        {resultString.split('').map((char, i) => (
                                            <span key={`res-${i}`} className={char === ' ' ? 'w-3 bg-red-500/20 mx-[1px] rounded' : ''}>{char}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 border-2 border-dashed border-slate-700 text-slate-600 font-mono w-48 text-center rounded-lg">
                                        Waiting to execute...
                                    </div>
                                )}
                                <div className={`text-xs text-green-500 mt-2 font-bold transition-opacity duration-500 ${executed ? 'opacity-100' : 'opacity-0'}`}>New object created in memory!</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default StringsVisualizer;
