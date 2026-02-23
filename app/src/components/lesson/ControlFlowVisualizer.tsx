'use client';

import React, { useState } from 'react';

const ControlFlowVisualizer: React.FC = () => {
    const [age, setAge] = useState(18);
    const [step, setStep] = useState(0);
    // 0: idle
    // 1: evaluating `age >= 18`
    // 2: executing branch

    const isAdult = age >= 18;

    const runSimulation = async () => {
        if (step !== 0) return;
        setStep(1);
        await new Promise(r => setTimeout(r, 1500));
        setStep(2);
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex justify-between items-center">
                <span className="font-mono text-sm font-semibold">Control Flow: If / Else</span>
                <div className="flex items-center gap-4">
                    <label className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                        Set age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            disabled={step !== 0}
                            className="w-16 bg-background border border-divider rounded px-2 py-1 text-foreground"
                        />
                    </label>
                    <button
                        onClick={runSimulation}
                        disabled={step !== 0}
                        className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-mono rounded shadow disabled:opacity-50"
                    >
                        {step === 0 ? 'Run Code' : 'Executing...'}
                    </button>
                </div>
            </div>

            <div className="p-8 flex items-center justify-center bg-dot-pattern overflow-x-auto">
                <div className="max-w-md w-full bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl overflow-hidden relative">

                    {/* Line 1: Setting Variable */}
                    <div className="px-6 py-3 border-b border-slate-800 text-slate-300 relative">
                        <span className="text-blue-400">age</span> = <span className="text-orange-400">{age}</span>
                    </div>

                    {/* Line 2: The Condition */}
                    <div className={`px-6 py-3 relative transition-colors duration-300 ${step >= 1 ? 'bg-slate-800' : ''}`}>
                        {step === 1 && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded bg-black/50 border border-slate-600 animate-in fade-in slide-in-from-right-4">
                                {age} &gt;= 18 is <span className={isAdult ? 'text-green-400' : 'text-red-400'}>{isAdult ? 'True' : 'False'}</span>
                            </div>
                        )}
                        <span className="text-purple-400">if</span> age &gt;= <span className="text-orange-400">18</span>:
                    </div>

                    {/* Line 3: The True Branch */}
                    <div className={`px-6 py-3 pl-12 relative transition-colors duration-500 ${step === 2 && isAdult ? 'bg-green-900/40 border-l-4 border-green-500' : 'border-l-4 border-transparent'}`}>
                        <span className="text-blue-300">print</span>(<span className="text-green-300">"You can vote!"</span>)
                        {step === 2 && isAdult && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse">
                                Executing!
                            </div>
                        )}
                    </div>

                    {/* Line 4: The Else */}
                    <div className={`px-6 py-3 relative transition-colors duration-300 ${step >= 1 ? 'bg-slate-800/50' : ''}`}>
                        <span className="text-purple-400">else</span>:
                    </div>

                    {/* Line 5: The False Branch */}
                    <div className={`px-6 py-3 pl-12 relative transition-colors duration-500 ${step === 2 && !isAdult ? 'bg-red-900/40 border-l-4 border-red-500' : 'border-l-4 border-transparent'}`}>
                        <span className="text-blue-300">print</span>(<span className="text-green-300">"Too young to vote"</span>)
                        {step === 2 && !isAdult && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse">
                                Executing!
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Output Console simulation */}
            <div className="bg-black p-4 border-t border-slate-800 font-mono text-sm min-h-[80px]">
                <div className="text-slate-500 mb-2">Terminal Output:</div>
                <div className="text-slate-300 transition-opacity duration-300">
                    {step === 2 ? (isAdult ? '> You can vote!' : '> Too young to vote') : '> _'}
                </div>
            </div>
        </div>
    );
};

export default ControlFlowVisualizer;
