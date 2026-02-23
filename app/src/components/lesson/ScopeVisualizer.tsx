'use client';

import React, { useState } from 'react';

type Mode = 'legb' | 'args' | 'kwargs';

interface ScopeVisualizerProps {
    initialMode?: Mode;
}

const ScopeVisualizer: React.FC<ScopeVisualizerProps> = ({ initialMode = 'legb' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    LEGB:
    0: Idle
    1: Define Global `x`
    2: Define outer()
    3: Call outer() -> Defines Enclosing `y`
    4: Call inner() -> Defines Local `z`
    5: Inner trying to print(x, y, z)
    6: Resolving `z` (Local)
    7: Resolving `y` (Enclosing)
    8: Resolving `x` (Global)

    Args/Kwargs:
    0: Idle
    1: Pass (1, 2, a=3, b=4) to func(*args, **kwargs)
    2: Pack into args tuple -> (1, 2)
    3: Pack into kwargs dict -> {'a': 3, 'b': 4}
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        const maxSteps = mode === 'legb' ? 8 : 3;

        for (let i = 1; i <= maxSteps; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, mode === 'legb' ? 1200 : 1500));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('legb'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'legb' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        LEGB Scope Rule
                    </button>
                    <button
                        onClick={() => { setMode('args'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'args' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        *args & **kwargs
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Run Code' : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[450px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'legb' && (
                    <div className="w-full flex flex-col md:flex-row gap-8 items-stretch justify-center relative z-10">
                        {/* Code Execution */}
                        <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-lg p-6 font-mono text-sm relative shadow-xl max-w-md">
                            <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Code</div>

                            <div className="mt-4">
                                <div className={`py-1 px-2 rounded transition-colors ${step === 1 ? 'bg-blue-900/50 border border-blue-500' : ''}`}>
                                    <span className="text-blue-300">x</span> = <span className="text-green-400">"global"</span>
                                </div>

                                <div className={`mt-2 py-1 px-2 rounded transition-colors ${step === 2 ? 'bg-purple-900/50 border border-purple-500' : ''}`}>
                                    <span className="text-purple-400">def</span> <span className="text-yellow-300">outer</span>():
                                </div>

                                <div className={`pl-4 py-1 px-2 rounded transition-colors ${step === 3 ? 'bg-yellow-900/50 border border-yellow-500' : ''}`}>
                                    <span className="text-blue-300">y</span> = <span className="text-green-400">"enclosing"</span>
                                </div>

                                <div className="pl-4 mt-2 py-1 px-2">
                                    <span className="text-purple-400">def</span> <span className="text-yellow-300">inner</span>():
                                </div>

                                <div className={`pl-8 py-1 px-2 rounded transition-colors ${step === 4 ? 'bg-green-900/50 border border-green-500' : ''}`}>
                                    <span className="text-blue-300">z</span> = <span className="text-green-400">"local"</span>
                                </div>

                                <div className={`pl-8 py-1 px-2 rounded transition-colors ${step >= 5 ? 'bg-red-900/30 border border-red-500/50' : ''}`}>
                                    <span className="text-blue-300">print</span>(
                                    <span className={`transition-colors ${step === 8 ? 'text-blue-400 font-bold bg-blue-900' : 'text-slate-300'}`}>x</span>,
                                    <span className={`transition-colors ${step === 7 ? 'text-yellow-400 font-bold bg-yellow-900' : 'text-slate-300'}`}>y</span>,
                                    <span className={`transition-colors ${step === 6 ? 'text-green-400 font-bold bg-green-900' : 'text-slate-300'}`}>z</span>
                                    )
                                </div>

                                <div className="pl-4 mt-2 py-1 px-2">
                                    <span className="text-yellow-300">inner</span>()
                                </div>

                                <div className="mt-2 py-1 px-2 text-slate-500">
                                    <span className="text-yellow-300">outer</span>()
                                </div>
                            </div>
                        </div>

                        {/* Memory Scopes (The Onion) */}
                        <div className="flex-1 max-w-md flex items-center justify-center relative">
                            {/* Global Scope */}
                            <div className={`absolute w-[350px] h-[350px] rounded-full border-4 border-dashed transition-all duration-500 flex items-start justify-center pt-8
                                ${step >= 1 ? 'border-blue-500 bg-blue-950/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-slate-800'}
                            `}>
                                <div className="text-blue-400 font-bold opacity-80 backdrop-blur px-2 rounded">Global Scope</div>
                                {step >= 1 && <div className="absolute top-16 right-16 bg-blue-900 px-3 py-1 rounded border border-blue-400 text-blue-200 text-sm font-mono animate-in zoom-in">x = "global"</div>}

                                {/* Enclosing Scope */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border-4 border-dashed transition-all duration-500 flex items-start justify-center pt-8
                                    ${step >= 3 ? 'border-yellow-500 bg-yellow-950/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-slate-800'}
                                `}>
                                    <div className="text-yellow-400 font-bold opacity-80 backdrop-blur px-2 rounded">Enclosing (outer)</div>
                                    {step >= 3 && <div className="absolute top-20 left-4 bg-yellow-900 px-3 py-1 rounded border border-yellow-400 text-yellow-200 text-sm font-mono animate-in zoom-in">y = "enclosing"</div>}

                                    {/* Local Scope */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[130px] h-[130px] rounded-full border-4 border-solid transition-all duration-500 flex items-start justify-center pt-4
                                        ${step >= 4 ? 'border-green-500 bg-green-950/50 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-slate-700'}
                                    `}>
                                        <div className="text-green-400 font-bold text-sm text-center leading-tight">Local<br />(inner)</div>
                                        {step >= 4 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-900 px-2 py-0.5 rounded border border-green-400 text-green-200 text-xs font-mono animate-in zoom-in">z = "local"</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Scope Resolution Arrows */}
                            {step === 6 && (
                                <div className="absolute z-20 text-green-400 font-bold text-center text-sm bg-green-950 border border-green-500 py-1 px-3 rounded-full animate-bounce">
                                    Found 'z' in Local!
                                </div>
                            )}
                            {step === 7 && (
                                <div className="absolute z-20 top-1/4 left-1/4 text-yellow-400 font-bold text-center text-sm bg-yellow-950 border border-yellow-500 py-1 px-3 rounded-full animate-bounce">
                                    'y' not local.<br />Found in Enclosing!
                                </div>
                            )}
                            {step === 8 && (
                                <div className="absolute z-20 top-8 right-8 text-blue-400 font-bold text-center text-sm bg-blue-950 border border-blue-500 py-1 px-3 rounded-full animate-bounce">
                                    'x' not local or enclosing.<br />Found in Global!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {mode === 'args' && (
                    <div className="w-full flex justify-center items-center gap-12 relative z-10 animate-in fade-in duration-300">
                        {/* Function Call */}
                        <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-lg font-mono text-xl text-center shadow-xl z-20 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded text-slate-400 border border-slate-600 font-sans">1. Function Call</div>
                            <span className="text-yellow-300">function</span>(
                            <span className="text-green-400">1</span>, <span className="text-green-400">2</span>,
                            <span className="text-purple-400 ml-2">a</span>=<span className="text-orange-400">3</span>,
                            <span className="text-purple-400">b</span>=<span className="text-orange-400">4</span>
                            )

                            {/* Animated Particles */}
                            {step >= 1 && (
                                <>
                                    {/* Positional args flowing */}
                                    <div className="absolute top-full left-[20%] w-3 h-3 bg-green-500 rounded-full animate-[flowDownDiagLeft_1.5s_ease-in-out_forwards]"></div>
                                    <div className="absolute top-full left-[30%] w-3 h-3 bg-green-500 rounded-full animate-[flowDownDiagLeft_1.5s_ease-in-out_0.2s_forwards]"></div>

                                    {/* Keyword args flowing */}
                                    <div className="absolute top-full right-[30%] w-3 h-3 bg-purple-500 rounded-full animate-[flowDownDiagRight_1.5s_ease-in-out_forwards]"></div>
                                    <div className="absolute top-full right-[20%] w-3 h-3 bg-purple-500 rounded-full animate-[flowDownDiagRight_1.5s_ease-in-out_0.2s_forwards]"></div>
                                </>
                            )}
                        </div>

                        {/* Packing Results */}
                        <div className="absolute top-48 w-full max-w-2xl flex justify-between px-16">

                            {/* *args box */}
                            <div className={`w-56 bg-slate-900 border-4 rounded-xl p-4 flex flex-col items-center transition-all duration-700 ${step >= 2 ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-green-950/30' : 'border-slate-800 opacity-50'}`}>
                                <div className="text-xl font-bold text-green-400 mb-2">*args</div>
                                <div className="text-xs text-slate-400 mb-4 text-center">Positional arguments are packed into a TUPLE.</div>

                                <div className="h-16 flex items-center justify-center font-mono text-2xl text-slate-200">
                                    {step >= 2 ? (
                                        <div className="animate-in zoom-in spin-in-12 duration-500 bg-green-900/50 border border-green-500 px-4 py-2 rounded-lg">
                                            (<span className="text-green-400">1</span>, <span className="text-green-400">2</span>)
                                        </div>
                                    ) : (
                                        <span className="opacity-20">()</span>
                                    )}
                                </div>
                            </div>

                            {/* **kwargs box */}
                            <div className={`w-64 bg-slate-900 border-4 rounded-xl p-4 flex flex-col items-center transition-all duration-700 ${step >= 3 ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-purple-950/30' : 'border-slate-800 opacity-50'}`}>
                                <div className="text-xl font-bold text-purple-400 mb-2">**kwargs</div>
                                <div className="text-xs text-slate-400 mb-4 text-center">Keyword arguments are packed into a DICTIONARY.</div>

                                <div className="h-16 flex items-center justify-center font-mono text-lg text-slate-200">
                                    {step >= 3 ? (
                                        <div className="animate-in zoom-in spin-in-12 duration-500 bg-purple-900/50 border border-purple-500 px-4 py-2 rounded-lg text-center">
                                            {'{'}<br />
                                            <span className="text-purple-300">'a'</span>: <span className="text-orange-400">3</span>, <span className="text-purple-300">'b'</span>: <span className="text-orange-400">4</span><br />
                                            {'}'}
                                        </div>
                                    ) : (
                                        <span className="opacity-20">{'{ }'}</span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes flowDownDiagLeft {
                    0% { transform: translate(0, 0); opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translate(-100px, 120px); opacity: 0; }
                }
                @keyframes flowDownDiagRight {
                    0% { transform: translate(0, 0); opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translate(100px, 120px); opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default ScopeVisualizer;
