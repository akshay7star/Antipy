'use client';

import React, { useState } from 'react';

const DecoratorsVisualizer: React.FC = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));
    const reset = () => setStep(0);

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex justify-between items-center gap-4">
                <div className="font-mono text-sm text-slate-700 font-medium px-2">How Decorators Work</div>
                <div className="flex gap-2">
                    <button
                        onClick={prevStep} disabled={step === 0}
                        className="px-3 py-1.5 rounded-md text-sm bg-slate-200 hover:bg-slate-300 disabled:opacity-50 transition-colors"
                    >
                        &larr; Prev
                    </button>
                    <button
                        onClick={nextStep} disabled={step === 4}
                        className="px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm disabled:opacity-50 transition-colors"
                    >
                        Next &rarr;
                    </button>
                    <button
                        onClick={reset} disabled={step === 0}
                        className="px-3 py-1.5 rounded-md text-sm border border-divider hover:bg-background-alt disabled:opacity-50 transition-colors ml-2"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="p-8 bg-dot-pattern flex flex-col md:flex-row gap-8 items-center justify-center min-h-[400px] overflow-x-auto">

                {/* Code Panel */}
                <div className="w-full md:w-1/2 bg-slate-900 border border-slate-700 rounded-lg p-6 font-mono text-sm text-slate-300 shadow-xl self-stretch flex flex-col justify-center relative overflow-hidden">

                    <div className={`transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className="text-blue-400">def <span className="text-yellow-200">uppercase_decorator</span>(func):</div>
                        <div className="pl-4 text-blue-400">def <span className="text-yellow-200">wrapper</span>():</div>

                        <div className={`pl-8 transition-colors duration-300 ${step === 3 ? 'bg-indigo-900/50 text-white font-bold' : ''}`}>
                            original_result = func()
                        </div>

                        <div className={`pl-8 transition-colors duration-300 ${step === 4 ? 'bg-indigo-900/50 text-white font-bold' : ''}`}>
                            modified_result = original_result.upper()
                        </div>

                        <div className={`pl-8 transition-colors duration-300 ${step === 4 ? 'bg-indigo-900/50 text-green-300 font-bold' : 'text-green-300'}`}>
                            return modified_result
                        </div>

                        <div className="pl-4 text-green-300 mt-1">return wrapper</div>
                    </div>

                    <div className="my-4 border-t border-slate-700 w-full relative"></div>

                    <div>
                        <div className={`text-pink-400 transition-opacity duration-300 ${step >= 2 ? 'opacity-100 bg-pink-900/30 font-bold inline-block px-1 -mx-1 rounded' : 'opacity-0'}`}>
                            @uppercase_decorator
                        </div>
                        <div className="text-blue-400">def <span className="text-yellow-200">greet</span>():</div>
                        <div className={`pl-4 transition-colors duration-300 ${step === 3 ? 'text-white font-bold' : 'text-green-300'}`}>return <span className="text-green-200">"hello world"</span></div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700 w-full">
                        <div className={`transition-opacity duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                            <span className="text-slate-500">&gt;&gt;&gt;</span> print(greet())
                        </div>
                        {step === 4 && (
                            <div className="text-white mt-1 font-bold animate-in fade-in slide-in-from-bottom-2 duration-300">
                                HELLO WORLD
                            </div>
                        )}
                    </div>
                </div>

                {/* Visual Panel */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 items-center border border-slate-200 bg-white rounded-xl p-8 shadow-inner min-h-[350px]">

                    {/* The Wrapper Box (Decorator) */}
                    <div className={`relative w-full max-w-sm border-2 rounded-xl p-6 transition-all duration-500 flex flex-col items-center ${step >= 1 ? 'border-pink-500 bg-pink-50 shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'border-dashed border-slate-300 bg-slate-50 opacity-50'}`}>
                        <div className={`absolute -top-3 px-2 text-xs font-mono font-bold transition-colors ${step >= 1 ? 'text-pink-600 bg-pink-100' : 'text-slate-400 bg-slate-100'}`}>
                            uppercase_decorator(wrapper)
                        </div>

                        {/* The Original Function Box */}
                        <div className={`w-full max-w-xs border-2 border-blue-400 bg-blue-50 rounded-lg p-4 my-2 text-center transition-all duration-500 relative z-10 ${step >= 2 ? 'shadow-md translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="text-sm font-mono font-bold text-blue-700">greet()</div>

                            {step >= 3 && (
                                <div className="mt-2 bg-white border border-blue-200 px-3 py-1 rounded shadow-sm text-sm font-mono text-slate-600 animate-in zoom-in duration-300">
                                    "hello world"
                                </div>
                            )}
                        </div>

                        {/* The Modification Step */}
                        {step >= 4 && (
                            <div className="w-full flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-500 relative z-0">
                                <div className="h-4 w-px bg-pink-500 my-1"></div>
                                <div className="text-[10px] text-pink-600 font-mono font-bold uppercase tracking-widest mb-1">.upper()</div>
                                <div className="bg-slate-900 border-2 border-slate-700 px-4 py-2 rounded shadow-lg text-green-400 font-mono font-bold">
                                    "HELLO WORLD"
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Explanatory Text */}
                    <div className="mt-4 text-center h-16 flex items-center justify-center">
                        <p className="text-sm text-slate-600 font-medium">
                            {step === 0 && "1. Let's trace a function decorator."}
                            {step === 1 && "2. A decorator is just a function that takes a function and returns a new 'wrapper' function."}
                            {step === 2 && "3. Using @ syntax wraps 'greet' inside the decorator's 'wrapper'."}
                            {step === 3 && "4. Calling greet() actually calls wrapper(). It first executes the original greet()."}
                            {step === 4 && "5. Then the wrapper modifies the result before returning it to the caller!"}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DecoratorsVisualizer;
