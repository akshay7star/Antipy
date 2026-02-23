'use client';

import React, { useState } from 'react';

type Mode = 'for' | 'while' | 'break';

interface LoopsVisualizerProps {
    initialMode?: Mode;
}

const LoopsVisualizer: React.FC<LoopsVisualizerProps> = ({ initialMode = 'for' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    For (over list):
    0: Idle
    1-3: Iteration 1 (Grab 'apple', print)
    4-6: Iteration 2 (Grab 'banana', print)
    7-9: Iteration 3 (Grab 'cherry', print)
    10: Done

    While:
    0: Idle (count = 0)
    1: Check Condition (0 < 3) -> True
    2: Print (0)
    3: Add 1 (count = 1)
    4: Check Condition (1 < 3) -> True
    5: Print (1)
    6: Add 1 (count = 2)
    7: Check Condition (2 < 3) -> True
    8: Print (2)
    9: Add 1 (count = 3)
    10: Check Condition (3 < 3) -> False -> Exit

    Break:
    0: Idle
    1: Check 4 -> Not 9
    2: Check 7 -> Not 9
    3: Check 9 -> IS 9!
    4: Break execution!
    5: Exit
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        const maxSteps = mode === 'for' ? 10 : (mode === 'while' ? 10 : 5);

        for (let i = 1; i <= maxSteps; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, mode === 'while' ? 800 : 1000));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('for'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'for' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        for Loop
                    </button>
                    <button
                        onClick={() => { setMode('while'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'while' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        while Loop
                    </button>
                    <button
                        onClick={() => { setMode('break'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'break' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        break Statement
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Run Loop' : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[420px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'for' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Data Source */}
                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex items-center justify-center gap-4 shadow-xl">
                            <span className="text-slate-400 font-mono text-sm mr-2">fruits =</span>

                            <div className={`px-4 py-2 rounded-md font-mono text-sm border-2 transition-all duration-300 ${step >= 1 && step <= 3 ? 'border-green-500 bg-green-900/40 text-green-300 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>"apple"</div>

                            <div className={`px-4 py-2 rounded-md font-mono text-sm border-2 transition-all duration-300 ${step >= 4 && step <= 6 ? 'border-green-500 bg-green-900/40 text-green-300 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>"banana"</div>

                            <div className={`px-4 py-2 rounded-md font-mono text-sm border-2 transition-all duration-300 ${step >= 7 && step <= 9 ? 'border-green-500 bg-green-900/40 text-green-300 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>"cherry"</div>
                        </div>

                        {/* Code Execution */}
                        <div className="flex w-full gap-8">
                            <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-lg p-6 font-mono text-sm relative">
                                <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Code</div>

                                <div className={`mt-4 py-1 flex items-center gap-2 ${[1, 4, 7].includes(step) ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <div className={`w-2 h-2 rounded-full ${[1, 4, 7].includes(step) ? 'bg-green-500' : 'bg-transparent'}`}></div>
                                    <span className="text-purple-400">for</span> <span className="text-yellow-300">fruit</span> <span className="text-purple-400">in</span> <span className="text-blue-300">fruits</span>:
                                </div>
                                <div className={`pl-8 py-1 flex items-center gap-2 ${[2, 5, 8].includes(step) ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <div className={`w-2 h-2 rounded-full ${[2, 5, 8].includes(step) ? 'bg-green-500' : 'bg-transparent'}`}></div>
                                    <span className="text-blue-300">print</span>(<span className="text-yellow-300">fruit</span>)
                                </div>

                                {/* Active Variable Box */}
                                <div className={`mt-6 p-3 border-2 border-yellow-600/50 bg-yellow-900/10 rounded overflow-hidden relative transition-all duration-300 ${step > 0 && step < 10 ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="text-[10px] text-yellow-500/80 mb-1">Current loop variable 'fruit' in memory:</div>
                                    <div className="text-green-400 font-bold text-center text-lg animate-in slide-in-from-top-4 fade-in duration-300" key={step}>
                                        {step >= 1 && step <= 3 ? '"apple"' : step >= 4 && step <= 6 ? '"banana"' : step >= 7 && step <= 9 ? '"cherry"' : ''}
                                    </div>
                                </div>
                            </div>

                            {/* Terminal */}
                            <div className="flex-1 bg-black border-2 border-slate-700 rounded-lg p-4 font-mono text-sm relative shadow-inner">
                                <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Terminal Output</div>
                                <div className="mt-6 flex flex-col gap-1 text-slate-300">
                                    {(step >= 3 || step === 10) && <div className="animate-in fade-in slide-in-from-bottom-2">apple</div>}
                                    {(step >= 6 || step === 10) && <div className="animate-in fade-in slide-in-from-bottom-2">banana</div>}
                                    {(step >= 9 || step === 10) && <div className="animate-in fade-in slide-in-from-bottom-2">cherry</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'while' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        <div className="flex w-full gap-8">
                            <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-lg p-6 font-mono text-sm relative">
                                <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Code</div>

                                <div className="mt-4 px-2">
                                    <span className="text-blue-300">count</span> = <span className="text-orange-400">0</span>
                                </div>
                                <div className={`py-1 mt-2 flex items-center gap-2 ${[1, 4, 7, 10].includes(step) ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <div className={`w-2 h-2 rounded-full ${[1, 4, 7, 10].includes(step) ? 'bg-green-500' : 'bg-transparent'}`}></div>
                                    <span className="text-purple-400">while</span> <span className="text-blue-300">count</span> &lt; <span className="text-orange-400">3</span>:

                                    {/* Condition evaluation overlay */}
                                    {[1, 4, 7, 10].includes(step) && (
                                        <div className={`ml-auto px-2 py-0.5 rounded text-xs animate-in zoom-in ${step === 10 ? 'bg-red-900 text-red-300 border border-red-500' : 'bg-green-900 text-green-300 border border-green-500'}`}>
                                            {step === 1 ? '0 < 3 (True)' : step === 4 ? '1 < 3 (True)' : step === 7 ? '2 < 3 (True)' : '3 < 3 (False!)'}
                                        </div>
                                    )}
                                </div>
                                <div className={`pl-8 py-1 flex items-center gap-2 ${[2, 5, 8].includes(step) ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <div className={`w-2 h-2 rounded-full ${[2, 5, 8].includes(step) ? 'bg-green-500' : 'bg-transparent'}`}></div>
                                    <span className="text-blue-300">print</span>(<span className="text-blue-300">count</span>)
                                </div>
                                <div className={`pl-8 py-1 flex items-center gap-2 ${[3, 6, 9].includes(step) ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <div className={`w-2 h-2 rounded-full ${[3, 6, 9].includes(step) ? 'bg-green-500' : 'bg-transparent'}`}></div>
                                    <span className="text-blue-300">count</span> += <span className="text-orange-400">1</span>
                                </div>

                                {/* Active Variable Box */}
                                <div className="mt-6 p-3 border-2 border-blue-600/50 bg-blue-900/10 rounded overflow-hidden relative">
                                    <div className="text-[10px] text-blue-400/80 mb-1">State Variable 'count':</div>
                                    <div className="text-orange-400 font-bold text-center text-3xl" key={step}>
                                        {step === 0 ? '0' : step >= 1 && step <= 2 ? '0' : step >= 3 && step <= 5 ? '1' : step >= 6 && step <= 8 ? '2' : '3'}
                                    </div>
                                </div>
                            </div>

                            {/* Terminal */}
                            <div className="flex-1 bg-black border-2 border-slate-700 rounded-lg p-4 font-mono text-sm relative shadow-inner">
                                <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Terminal Output</div>
                                <div className="mt-6 flex flex-col gap-1 text-slate-300">
                                    {step >= 3 && <div className="animate-in fade-in slide-in-from-bottom-2">0</div>}
                                    {step >= 6 && <div className="animate-in fade-in slide-in-from-bottom-2">1</div>}
                                    {step >= 9 && <div className="animate-in fade-in slide-in-from-bottom-2">2</div>}
                                    {step === 10 && <div className="mt-2 text-red-500 text-xs italic animate-pulse">Loop finished!</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'break' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Data Source */}
                        <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex items-center justify-center gap-4 shadow-xl">
                            <span className="text-slate-400 font-mono text-sm mr-2">numbers =</span>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-sm border transition-all ${step === 1 ? 'border-yellow-500 bg-yellow-900/40 text-yellow-300 scale-110' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>4</div>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-sm border transition-all ${step === 2 ? 'border-yellow-500 bg-yellow-900/40 text-yellow-300 scale-110' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>7</div>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-sm border transition-all ${step === 3 || step === 4 ? 'border-red-500 bg-red-900/40 text-red-300 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : step >= 5 ? 'opacity-30 border-slate-700' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>9</div>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-sm border ${step >= 4 ? 'opacity-30 border-slate-700' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>1</div>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-sm border ${step >= 4 ? 'opacity-30 border-slate-700' : 'border-slate-700 bg-slate-800 text-slate-400'}`}>8</div>
                        </div>

                        <div className="flex w-full gap-8">
                            <div className={`flex-1 bg-slate-900 border-2 rounded-lg p-6 font-mono text-sm relative transition-colors duration-500 ${step === 4 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-slate-700'}`}>
                                <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Search Target: 9</div>

                                <div className="mt-4 px-2">
                                    <span className="text-purple-400">for</span> <span className="text-blue-300">n</span> <span className="text-purple-400">in</span> <span className="text-blue-300">numbers</span>:
                                </div>
                                <div className={`pl-8 py-1 flex items-center gap-2 ${step > 0 && step < 5 ? 'bg-slate-800 rounded px-2' : 'px-2'}`}>
                                    <span className="text-purple-400">if</span> <span className="text-blue-300">n</span> == <span className="text-orange-400">9</span>:
                                </div>
                                <div className={`pl-16 py-1 flex items-center gap-2 ${step === 4 ? 'bg-red-900 border-l-4 border-red-500 px-2 font-bold text-white shadow-xl' : 'px-2'}`}>
                                    {step === 4 && <span className="text-red-300 animate-pulse text-xl absolute -left-6">💣</span>}
                                    <span className={step === 4 ? 'text-red-300' : 'text-purple-400'}>break</span>
                                </div>

                                <div className="mt-6 text-xs text-slate-400 flex flex-col gap-1 font-sans">
                                    <div className="border-b border-slate-700 pb-1 font-bold">Status:</div>
                                    <div className={`${step === 1 ? 'text-white' : ''}`}>4 == 9? False. Continue searching.</div>
                                    <div className={`${step === 2 ? 'text-white' : ''}`}>7 == 9? False. Continue searching.</div>
                                    <div className={`${step === 3 ? 'text-orange-400 font-bold' : step === 4 ? 'text-red-500 font-bold' : ''}`}>{step >= 3 ? '9 == 9? TRUE!' : ''} {step === 4 ? 'Triggering break...' : ''}</div>
                                    <div className={`${step === 5 ? 'text-red-500 font-bold' : ''}`}>{step >= 5 ? 'Loop destroyed. Exiting early.' : ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoopsVisualizer;
