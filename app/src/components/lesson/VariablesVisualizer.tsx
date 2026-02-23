'use client';

import React, { useState } from 'react';

const VariablesVisualizer: React.FC = () => {
    const [step, setStep] = useState(0);

    /* Steps:
       0: a = 5
       1: b = "hello"
       2: a = b  (pointer reassignment)
       3: b = "world" (immutability)
    */

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex justify-between items-center">
                <span className="font-mono text-sm font-semibold">Variables as Name Tags (Pointers)</span>
                <div className="flex gap-2">
                    <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="px-3 py-1 bg-secondary text-secondary-foreground rounded disabled:opacity-50 text-sm">Prev</button>
                    <button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3} className="px-3 py-1 bg-primary text-primary-foreground rounded disabled:opacity-50 text-sm">Next</button>
                </div>
            </div>

            <div className="p-8 flex items-center justify-center bg-dot-pattern relative min-h-[300px] overflow-x-auto">

                {/* Code execution side */}
                <div className="absolute left-8 top-8 bg-slate-900 border border-slate-700 p-4 rounded-lg font-mono text-sm shadow-xl">
                    <div className={`transition-colors duration-300 ${step >= 0 ? 'text-white' : 'text-slate-600'}`}>
                        {step === 0 && <span className="absolute -left-4 text-green-500">▶</span>}
                        a = <span className="text-orange-400">5</span>
                    </div>
                    <div className={`transition-colors duration-300 ${step >= 1 ? 'text-white' : 'text-slate-600'}`}>
                        {step === 1 && <span className="absolute -left-4 text-green-500">▶</span>}
                        b = <span className="text-green-400">"hello"</span>
                    </div>
                    <div className={`transition-colors duration-300 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                        {step === 2 && <span className="absolute -left-4 text-green-500">▶</span>}
                        a = b
                    </div>
                    <div className={`transition-colors duration-300 ${step >= 3 ? 'text-white' : 'text-slate-600'}`}>
                        {step === 3 && <span className="absolute -left-4 text-green-500">▶</span>}
                        b = <span className="text-green-400">"world"</span>
                    </div>
                </div>

                {/* VISUALIZATION Canvas: Names -> Objects */}
                <div className="flex w-1/2 ml-auto justify-between items-center relative h-64 border-l-2 border-dashed border-slate-700 pl-8">

                    {/* Names (Variables) */}
                    <div className="flex flex-col gap-16 z-20">
                        <div className="flex items-center">
                            <div className="w-12 h-8 bg-blue-900/50 border border-blue-500 rounded flex items-center justify-center font-mono font-bold shadow-lg">
                                a
                            </div>
                            {/* Arrow from 'a' */}
                            <svg className="absolute left-[3.5rem] w-32 h-32 overflow-visible z-10" style={{ top: '2.5rem' }}>
                                {/* pointer to 5 */}
                                {step < 2 && <path d="M 0 0 L 100 0" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-500" markerEnd="url(#arrow)" />}
                                {/* pointer to "hello" (step 2+) */}
                                {step >= 2 && <path d="M 0 0 C 50 0, 50 64, 100 64" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-500 animate-in fade-in" markerEnd="url(#arrow)" />}
                            </svg>
                        </div>

                        <div className="flex items-center opacity-0 transition-opacity duration-300" style={{ opacity: step >= 1 ? 1 : 0 }}>
                            <div className="w-12 h-8 bg-blue-900/50 border border-blue-500 rounded flex items-center justify-center font-mono font-bold shadow-lg">
                                b
                            </div>
                            {/* Arrow from 'b' */}
                            <svg className="absolute left-[3.5rem] w-32 h-32 overflow-visible z-10" style={{ top: '6.5rem' }}>
                                {/* pointer to "hello" (step 1-2) */}
                                {(step === 1 || step === 2) && <path d="M 0 0 L 100 0" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-500" markerEnd="url(#arrow)" />}
                                {/* pointer to "world" (step 3) */}
                                {step === 3 && <path d="M 0 0 C 50 0, 50 64, 100 64" stroke="currentColor" strokeWidth="2" fill="none" className="text-yellow-500 animate-in fade-in" markerEnd="url(#arrow)" />}
                            </svg>
                        </div>
                    </div>

                    <svg height="0" width="0">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                            </marker>
                        </defs>
                    </svg>

                    {/* Objects in Memory */}
                    <div className="flex flex-col gap-8 z-20 pl-16">
                        <div className="flex flex-col items-center animate-in zoom-in duration-300">
                            <span className="text-[10px] text-slate-500 font-mono mb-1">&lt;class 'int'&gt;</span>
                            <div className="w-16 h-12 bg-slate-800 border-2 border-orange-500 rounded flex items-center justify-center font-mono text-orange-400 font-bold shadow-xl">
                                5
                            </div>
                        </div>

                        {step >= 1 && (
                            <div className="flex flex-col items-center animate-in zoom-in duration-300">
                                <span className="text-[10px] text-slate-500 font-mono mb-1">&lt;class 'str'&gt;</span>
                                <div className="w-24 h-12 bg-slate-800 border-2 border-green-500 rounded flex items-center justify-center font-mono text-green-400 font-bold shadow-xl">
                                    "hello"
                                </div>
                            </div>
                        )}

                        {step >= 3 && (
                            <div className="flex flex-col items-center animate-in zoom-in duration-300">
                                <span className="text-[10px] text-slate-500 font-mono mb-1">&lt;class 'str'&gt;</span>
                                <div className="w-24 h-12 bg-slate-800 border-2 border-green-500 rounded flex items-center justify-center font-mono text-green-400 font-bold shadow-xl">
                                    "world"
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explanation text */}
                <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm">
                    {step === 0 && <span className="text-orange-400">Variables are not boxes! They are name tags pointing to objects in memory.</span>}
                    {step === 1 && <span className="text-green-400">A new string object is created, and 'b' points to it.</span>}
                    {step === 2 && <span className="text-blue-400 font-bold bg-blue-500/20 px-2 rounded">Reassignment: 'a' stops pointing to 5 and now points to the same object as 'b'.</span>}
                    {step === 3 && <span className="text-purple-400 font-bold">Strings are immutable! Reassigning 'b' creates a new object in memory. 'a' still points to "hello".</span>}
                </div>
            </div>
        </div>
    );
};

export default VariablesVisualizer;
