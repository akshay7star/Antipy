'use client';

import React, { useState } from 'react';

const InterpreterVisualizer: React.FC = () => {
    const [step, setStep] = useState(0);

    /*
    0: Idle
    1: Source Code
    2: Compiler -> Bytecode
    3: Virtual Machine
    4: Output
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        for (let i = 1; i <= 4; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1200));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex justify-between items-center">
                <div className="text-sm font-bold text-slate-300">Execution Pipeline</div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Run python script.py' : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[350px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">
                <div className="w-full max-w-4xl flex justify-between items-center relative z-10">

                    {/* 1. Source Code */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
                        <div className="w-32 h-40 bg-slate-900 border-2 border-slate-600 rounded-lg p-3 shadow-xl relative flex flex-col">
                            <div className="text-[10px] text-slate-500 font-mono border-b border-slate-700 pb-1 mb-2">script.py</div>
                            <div className="font-mono text-[10px] text-blue-300">print(<span className="text-green-400">"Hello"</span>)</div>
                            <div className="font-mono text-[10px] text-blue-300">x = <span className="text-orange-400">42</span></div>

                            {step === 1 && (
                                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                            )}
                        </div>
                        <div className="text-xs font-bold text-slate-300">1. Source Code</div>
                        <div className="text-[10px] text-slate-500 max-w-[120px] text-center">Human-readable text you write</div>
                    </div>

                    {/* Arrow 1 */}
                    <div className="flex-1 flex justify-center relative">
                        <div className={`h-[2px] w-full bg-slate-700 relative`}>
                            {step >= 2 && (
                                <div className="absolute inset-0 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-[growRight_0.5s_ease-out_forwards]"></div>
                            )}
                        </div>
                        <div className="absolute -top-6 text-[10px] font-mono text-yellow-400 font-bold">Compiler</div>
                    </div>

                    {/* 2. Bytecode */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <div className="w-32 h-40 bg-slate-900 border-2 border-yellow-600 rounded-lg p-3 shadow-xl relative flex flex-col justify-center items-center overflow-hidden">
                            <div className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">.pyc (Hidden)</div>
                            <div className="font-mono text-xs text-yellow-400/70 text-center leading-tight break-all">
                                01001010<br />11010011<br />00110100<br />10101011
                            </div>

                            {step === 2 && (
                                <div className="absolute inset-0 border-2 border-yellow-500 rounded-lg animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                            )}
                        </div>
                        <div className="text-xs font-bold text-yellow-500">2. Bytecode</div>
                        <div className="text-[10px] text-slate-500 max-w-[120px] text-center">Optimized instructions for Python</div>
                    </div>

                    {/* Arrow 2 */}
                    <div className="flex-1 flex justify-center relative">
                        <div className={`h-[2px] w-full bg-slate-700 relative`}>
                            {step >= 3 && (
                                <div className="absolute inset-0 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-[growRight_0.5s_ease-out_forwards]"></div>
                            )}
                        </div>
                    </div>

                    {/* 3. PVM */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <div className="w-32 h-40 bg-slate-950 border-2 border-purple-500 rounded-lg p-3 shadow-xl relative flex flex-col justify-center items-center">
                            <div className="absolute top-2 left-2 right-2 text-[10px] text-slate-500 font-mono border-b border-slate-800 pb-1 text-center">PVM</div>
                            <svg className={`w-12 h-12 text-purple-400 ${step === 3 ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>

                            {step === 3 && (
                                <div className="absolute inset-0 border-2 border-purple-400 rounded-lg animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                            )}
                        </div>
                        <div className="text-xs font-bold text-purple-400">3. Virtual Machine</div>
                        <div className="text-[10px] text-slate-500 max-w-[120px] text-center">Executes bytecode step-by-step</div>
                    </div>

                    {/* Arrow 3 */}
                    <div className="flex-1 flex justify-center relative">
                        <div className={`h-[2px] w-full bg-slate-700 relative`}>
                            {step >= 4 && (
                                <div className="absolute inset-0 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-[growRight_0.5s_ease-out_forwards]"></div>
                            )}
                        </div>
                    </div>

                    {/* 4. Output */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <div className="w-32 h-40 bg-black border-2 border-slate-700 rounded-lg p-3 shadow-xl relative flex flex-col">
                            <div className="text-[10px] text-slate-500 font-mono border-b border-slate-800 pb-1 mb-2">Terminal</div>
                            <div className="font-mono text-xs text-slate-300">$ python script.py</div>
                            <div className="font-mono text-xs text-green-400 mt-2">Hello</div>
                            <div className="font-mono text-xs text-slate-300 mt-1">$ <span className="animate-pulse">_</span></div>

                            {step === 4 && (
                                <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                            )}
                        </div>
                        <div className="text-xs font-bold text-green-400">4. Output</div>
                        <div className="text-[10px] text-slate-500 max-w-[120px] text-center">Results on your screen</div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes growRight {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}} />
        </div>
    );
};

export default InterpreterVisualizer;
