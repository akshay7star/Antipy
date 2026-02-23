'use client';

import React, { useState } from 'react';

type Mode = 'handled' | 'bubbling' | 'unhandled';

interface ExceptionsVisualizerProps {
    initialMode?: Mode;
}

const ExceptionsVisualizer: React.FC<ExceptionsVisualizerProps> = ({ initialMode = 'handled' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    Handled (Simple Try/Except):
    0: Idle
    1: Enter try block
    2: Error occurs! -> Exception Object created
    3: Jump to except block
    4: Continue execution normally

    Bubbling (Call Stack):
    0: Idle
    1: main() calls process()
    2: process() calls get_data()
    3: Error in get_data()! Exception created.
    4: get_data() crashes, error falls to process()
    5: process() crashes, error falls to main()
    6: main() except block catches it.

    Unhandled:
    0: Idle
    1: Enter function
    2: Error occurs
    3: Crashes program (Terminal stack trace)
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        const maxSteps = mode === 'handled' ? 4 : (mode === 'bubbling' ? 6 : 3);

        for (let i = 1; i <= maxSteps; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, mode === 'bubbling' ? 1200 : 1500));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('handled'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'handled' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Basic Try/Except
                    </button>
                    <button
                        onClick={() => { setMode('bubbling'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'bubbling' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Exception Bubbling
                    </button>
                    <button
                        onClick={() => { setMode('unhandled'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'unhandled' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Unhandled Crash
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

                {mode === 'handled' && (
                    <div className="w-full max-w-lg flex flex-col items-center gap-8">
                        <div className="w-full bg-slate-900 border border-slate-700 p-6 rounded-lg font-mono text-sm shadow-xl relative">

                            {/* Execution Line Pointer */}
                            <div className={`absolute left-2 transition-all duration-300 text-green-500 font-bold ${step === 0 ? 'top-6' : step === 1 ? 'top-12' : step === 2 ? 'top-18' : step === 3 ? 'top-[120px]' : 'top-[168px]'}`}>
                                {step > 0 && '▶'}
                            </div>

                            <div className="text-purple-400">try:</div>
                            <div className={`pl-8 py-1 ${step === 1 ? 'bg-slate-800 rounded' : ''}`}>
                                <span className="text-blue-400">age</span> = <span className="text-yellow-300">int</span>(<span className="text-green-400">"twenty"</span>)
                            </div>

                            {/* Error Flash / Object */}
                            <div className={`absolute right-8 top-12 transition-all duration-500 transform ${step === 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${step >= 3 ? 'translate-y-[60px] scale-75' : ''}`}>
                                <div className="bg-red-900/90 border border-red-500 text-red-200 px-3 py-2 rounded shadow-[0_0_20px_rgba(239,68,68,0.6)] flex items-center gap-2 z-20">
                                    <span className="text-2xl">💣</span> ValueError
                                </div>
                            </div>

                            <div className="pl-8 py-1 text-slate-500 line-through">
                                <span className="text-blue-300">print</span>(<span className="text-green-400">"Age is:"</span>, age)
                            </div>

                            <div className={`py-1 flex items-center gap-2 mt-4 ${step === 3 ? 'bg-orange-900/40 border-l-4 border-orange-500 pl-3' : 'border-l-4 border-transparent pl-4'}`}>
                                <span className="text-purple-400">except</span> ValueError:
                                {step === 3 && <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded animate-bounce ml-auto">Caught It!</div>}
                            </div>
                            <div className={`pl-8 py-1 ${step === 3 ? 'text-white' : 'text-slate-400'}`}>
                                <span className="text-blue-300">print</span>(<span className="text-green-400">"Please enter a number."</span>)
                            </div>

                            <div className={`mt-4 py-1 ${step === 4 ? 'bg-green-900/40 border-l-4 border-green-500 pl-3' : 'border-l-4 border-transparent pl-4'}`}>
                                <span className="text-blue-300">print</span>(<span className="text-green-400">"Program continues nicely..."</span>)
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'bubbling' && (
                    <div className="w-full max-w-xl flex gap-8">
                        {/* The Call Stack */}
                        <div className="flex-1 flex flex-col-reverse gap-2 relative mt-16">

                            {/* Exception Object falling through the stack */}
                            <div className={`absolute right-4 w-32 bg-red-900 border-2 border-red-500 text-red-100 font-mono text-xs font-bold p-2 text-center shadow-[0_0_20px_rgba(239,68,68,0.8)] rounded z-50 transition-all duration-700 ease-in-out
                                ${step < 3 ? 'opacity-0 top-0' : 'opacity-100'}
                                ${step === 3 ? 'top-4' : ''}
                                ${step === 4 ? 'top-20' : ''}
                                ${step === 5 ? 'top-36' : ''}
                                ${step === 6 ? 'top-36 opacity-0 scale-50' : ''}
                            `}>
                                ⚡ Exception
                            </div>

                            {/* Frame 1: main() */}
                            <div className={`p-4 rounded border-2 transition-colors duration-300 ${step >= 1 ? 'bg-slate-800 border-slate-600' : 'bg-slate-900/50 border-slate-800 text-slate-600'} ${step === 6 ? 'border-green-500 bg-green-900/20' : ''}`}>
                                <div className="text-xs font-bold mb-2">main() Frame</div>
                                <div className="font-mono text-xs mx-4">
                                    <div className="text-purple-400">try:</div>
                                    <div className="pl-4">process()</div>
                                    <div className="text-purple-400">except:</div>
                                    <div className="pl-4">print("Caught!") {step === 6 && <span className="text-green-400 ml-2 animate-bounce">✔ Rescued</span>}</div>
                                </div>
                            </div>

                            {/* Frame 2: process() */}
                            <div className={`p-4 rounded border-2 transition-colors duration-300 ${step >= 2 && step <= 4 ? 'bg-slate-800 border-slate-600' : 'bg-slate-900/50 border-slate-800 text-slate-600'} ${step > 4 ? 'border-red-900 bg-red-950/50 opacity-50' : ''}`}>
                                <div className="text-xs font-bold mb-2">process() Frame</div>
                                <div className="font-mono text-xs mx-4">
                                    <div>data = get_data()</div>
                                    <div className="text-slate-500 line-through">return data * 2</div>
                                </div>
                                {step === 4 && <div className="text-red-500 text-xs font-bold text-center mt-2 animate-pulse">💥 Crashed (No except block)</div>}
                            </div>

                            {/* Frame 3: get_data() */}
                            <div className={`p-4 rounded border-2 transition-colors duration-300 ${step >= 3 && step <= 3 ? 'bg-slate-800 border-slate-600' : 'bg-slate-900/50 border-slate-800 text-slate-600'} ${step > 3 ? 'border-red-900 bg-red-950/50 opacity-50' : ''}`}>
                                <div className="text-xs font-bold mb-2">get_data() Frame</div>
                                <div className="font-mono text-xs mx-4">
                                    <div className="text-red-400">1 / 0  # ZeroDivisionError</div>
                                </div>
                                {step === 3 && <div className="text-red-500 text-xs font-bold text-center mt-2 animate-pulse">💥 Crashed!</div>}
                            </div>
                        </div>

                        {/* Explanation panel */}
                        <div className="flex-1 flex flex-col justify-center gap-4 text-sm font-mono text-slate-400">
                            <div className={`p-3 rounded transition-colors ${step === 3 ? 'bg-red-900/30 text-red-200' : ''}`}>
                                1. Error occurs deep in the call stack.
                            </div>
                            <div className={`p-3 rounded transition-colors ${step === 4 || step === 5 ? 'bg-orange-900/30 text-orange-200' : ''}`}>
                                2. Python looks for a <code>try/except</code> block in the current function. If not found, it destroys the function frame and throws the error "up" to the caller.
                            </div>
                            <div className={`p-3 rounded transition-colors ${step === 6 ? 'bg-green-900/30 text-green-200' : ''}`}>
                                3. The error "bubbles up" until it hits a <code>try/except</code> block, which catches it and prevents a total program crash.
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'unhandled' && (
                    <div className="w-full max-w-lg flex flex-col items-center gap-8">
                        <div className="w-full bg-slate-900 border border-slate-700 p-6 rounded-t-lg font-mono text-sm shadow-xl relative pb-8">

                            <div className={`absolute left-2 transition-all duration-300 text-green-500 font-bold ${step === 0 ? 'top-6' : step === 1 ? 'top-12' : 'top-18'}`}>
                                {step > 0 && step < 3 && '▶'}
                            </div>

                            <div>
                                <span className="text-blue-300">print</span>(<span className="text-green-400">"Starting..."</span>)
                            </div>
                            <div className={step === 1 ? 'bg-slate-800 rounded px-2' : 'px-2'}>
                                x = <span className="text-orange-400">10</span> / <span className="text-orange-400">0</span>
                            </div>

                            {/* Error Flash */}
                            <div className={`absolute right-8 top-10 transition-all duration-300 ${step === 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <div className="bg-red-900 border border-red-500 text-red-200 px-3 py-1 rounded shadow-lg z-20 animate-bounce">
                                    ZeroDivisionError
                                </div>
                            </div>

                            <div className="text-slate-500 line-through px-2">
                                <span className="text-blue-300">print</span>(<span className="text-green-400">"Done!"</span>)
                            </div>
                        </div>

                        {/* Fake Terminal Stack Trace */}
                        <div className={`w-full bg-black border border-slate-800 p-4 rounded-b-lg font-mono text-xs overflow-hidden transition-all duration-500 ${step >= 3 ? 'h-32 opacity-100' : 'h-0 opacity-0 border-none p-0'}`}>
                            <div className="text-red-500 mb-1">Traceback (most recent call last):</div>
                            <div className="text-red-400 mb-1">  File "main.py", line 2, in &lt;module&gt;</div>
                            <div className="text-slate-300 mb-1">    x = 10 / 0</div>
                            <div className="text-red-500 font-bold">ZeroDivisionError: division by zero</div>
                            <div className="text-red-600 mt-2">Process finished with exit code 1</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExceptionsVisualizer;
