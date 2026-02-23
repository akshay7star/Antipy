'use client';

import React, { useState } from 'react';

type Mode = 'map' | 'filter';

interface FunctionalVisualizerProps {
    initialMode?: Mode;
}

const FunctionalVisualizer: React.FC<FunctionalVisualizerProps> = ({ initialMode = 'map' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    const inputDataMap = [1, 2, 3, 4];
    const inputDataFilter = [1, 2, 3, 4, 5, 6];

    const runSimulation = async () => {
        if (step !== 0) return;
        const totalSteps = mode === 'map' ? inputDataMap.length + 1 : inputDataFilter.length + 1;

        for (let i = 1; i <= totalSteps; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1200));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner">
                    <button
                        onClick={() => { setMode('map'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'map' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        map()
                    </button>
                    <button
                        onClick={() => { setMode('filter'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'filter' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        filter()
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? `Run ${mode}()` : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'map' && (
                    <div className="w-full max-w-2xl flex items-center justify-between gap-4">
                        {/* Input Array */}
                        <div className="flex flex-col gap-2 relative">
                            <div className="text-xs font-mono text-slate-500 font-bold tracking-widest text-center mb-2">INPUT: [1, 2, 3, 4]</div>
                            {inputDataMap.map((val, i) => (
                                <div key={`in-${i}`} className={`w-12 h-12 rounded flex items-center justify-center font-mono font-bold text-lg transition-all duration-300 ${step === i + 1 ? 'bg-yellow-500 text-black scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10' : 'bg-slate-800 border-2 border-slate-600 text-slate-300'}`}>
                                    {val}
                                </div>
                            ))}
                        </div>

                        {/* Transform Function */}
                        <div className="flex flex-col items-center justify-center px-8 border-x-2 border-dashed border-slate-700 relative">
                            <div className="text-xs font-mono text-slate-500 mb-2">TRANSFORM FUNCTION</div>
                            <div className="px-4 py-3 bg-purple-900/40 border border-purple-500 text-purple-300 font-mono text-sm rounded-lg shadow-inner">
                                lambda x: x * 2
                            </div>
                            {step > 0 && step <= inputDataMap.length && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-2xl font-bold text-yellow-500 animate-ping">
                                    {inputDataMap[step - 1]} * 2
                                </div>
                            )}
                        </div>

                        {/* Output Array */}
                        <div className="flex flex-col gap-2 mt-auto relative">
                            <div className="text-xs font-mono text-slate-500 font-bold tracking-widest text-center mb-2">OUTPUT</div>
                            {inputDataMap.map((val, i) => (
                                <div key={`out-${i}`} className={`w-12 h-12 rounded border-2 flex items-center justify-center font-mono font-bold text-lg transition-all duration-500 ${step > i ? 'bg-green-900/80 border-green-500 text-green-400 opacity-100 scale-100' : 'bg-transparent border-slate-800 text-transparent opacity-0 scale-50'}`}>
                                    {val * 2}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {mode === 'filter' && (
                    <div className="w-full max-w-2xl flex items-center justify-between gap-4">
                        {/* Input Array */}
                        <div className="flex flex-col gap-2 relative">
                            <div className="text-xs font-mono text-slate-500 font-bold tracking-widest text-center mb-2">INPUT: [1,2,3,4,5,6]</div>
                            {inputDataFilter.map((val, i) => (
                                <div key={`in-${i}`} className={`w-10 h-10 rounded flex items-center justify-center font-mono font-bold transition-all duration-300 ${step === i + 1 ? 'bg-yellow-500 text-black scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10' : 'bg-slate-800 border-2 border-slate-600 text-slate-300'}`}>
                                    {val}
                                </div>
                            ))}
                        </div>

                        {/* Filter Function (Sieve) */}
                        <div className="flex flex-col items-center justify-center px-8 border-x-2 border-dashed border-slate-700 relative">
                            <div className="text-xs font-mono text-slate-500 mb-2">PREDICATE (SIEVE)</div>
                            <div className="px-4 py-3 bg-blue-900/40 border border-blue-500 text-blue-300 font-mono text-sm rounded-lg shadow-inner text-center">
                                lambda x: x % 2 == 0<br />
                                <span className="text-[10px] text-slate-400">(Keep ONLY even numbers)</span>
                            </div>
                            {step > 0 && step <= inputDataFilter.length && (
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10 font-mono font-bold px-3 py-1 rounded shadow-lg animate-in zoom-in ${inputDataFilter[step - 1] % 2 === 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {inputDataFilter[step - 1] % 2 === 0 ? 'True! ✔' : 'False! ✖'}
                                </div>
                            )}
                        </div>

                        {/* Output Array */}
                        <div className="flex flex-col gap-2 justify-start h-full pt-6 relative">
                            <div className="text-xs font-mono text-slate-500 font-bold tracking-widest text-center mb-2 absolute -top-2 left-0 right-0">OUTPUT</div>
                            {inputDataFilter.map((val, i) => {
                                const isEven = val % 2 === 0;
                                // Need to calculate visual position to stack them correctly if missing
                                const passedSoFar = inputDataFilter.slice(0, Math.min(step, inputDataFilter.length)).filter(x => x % 2 === 0);
                                const outIndex = passedSoFar.indexOf(val);

                                return (
                                    <div
                                        key={`out-${i}`}
                                        className={`w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold transition-all duration-500 absolute`}
                                        style={{
                                            top: isEven && step > i ? `${outIndex * 48}px` : '0px',
                                            opacity: isEven && step > i ? 1 : 0,
                                            transform: isEven && step > i ? 'scale(1)' : 'scale(0)',
                                            borderColor: '#22c55e',
                                            backgroundColor: 'rgba(20, 83, 45, 0.8)',
                                            color: '#4ade80'
                                        }}
                                    >
                                        {val}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Status Bar */}
                <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm">
                    {mode === 'map' && step === 0 && <span className="text-muted-foreground">map() applies the function to EVERY item, creating a new collection of the exact same size.</span>}
                    {mode === 'filter' && step === 0 && <span className="text-muted-foreground">filter() tests every item. If True, it passes through. If False, it is discarded.</span>}

                    {step > 0 && mode === 'map' && step <= inputDataMap.length && (
                        <span className="text-yellow-400">Processing element: <span className="font-bold text-white">{inputDataMap[step - 1]}</span></span>
                    )}
                    {step > 0 && mode === 'filter' && step <= inputDataFilter.length && (
                        <span className="text-yellow-400">Testing element: <span className="font-bold text-white">{inputDataFilter[step - 1]}</span></span>
                    )}

                    {((mode === 'map' && step > inputDataMap.length) || (mode === 'filter' && step > inputDataFilter.length)) && (
                        <span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded">Execution Complete! Returns a generator (or list).</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FunctionalVisualizer;
