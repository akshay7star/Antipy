'use client';

import React, { useState } from 'react';

const FunctionsVisualizer: React.FC = () => {
    const [step, setStep] = useState(0);
    const [parameterName, setParameterName] = useState("Akshay");

    /* Steps:
       0: Idle
       1: Pass argument
       2: Execute body
       3: Return 
       4: Assign result
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        for (let i = 1; i <= 4; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }
        await new Promise(r => setTimeout(r, 1500));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex justify-between items-center">
                <span className="font-mono text-sm font-semibold">Functions: Arguments & Returns</span>
                <div className="flex flex-wrap items-center gap-4">
                    <label className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                        Argument:
                        <input
                            type="text"
                            value={parameterName}
                            onChange={(e) => setParameterName(e.target.value || "User")}
                            disabled={step !== 0}
                            maxLength={12}
                            className="w-24 bg-background border border-divider rounded px-2 py-1 text-foreground"
                        />
                    </label>
                    <button
                        onClick={runSimulation}
                        disabled={step !== 0}
                        className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-mono rounded shadow disabled:opacity-50"
                    >
                        {step === 0 ? 'Call Function' : 'Running...'}
                    </button>
                </div>
            </div>

            <div className="p-8 flex items-center justify-center bg-dot-pattern relative h-[450px] overflow-x-auto">

                {/* Global Scope (The Caller) */}
                <div className="absolute top-8 left-8 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-10">
                    <div className="bg-slate-800 p-2 text-xs font-bold text-slate-400 border-b border-slate-700 tracking-wider">
                        GLOBAL SCOPE
                    </div>
                    <div className="p-4 font-mono text-sm">
                        <div className={`transition-colors duration-300 ${step === 0 || step === 4 ? 'text-white' : 'text-slate-500'}`}>
                            <span className="text-blue-400">result</span> = <span className="text-yellow-300">greet</span>(
                            <span className={`transition-all duration-300 ${step === 1 ? 'text-orange-400 font-bold bg-orange-400/20 px-1 rounded' : 'text-green-400'}`}>"{parameterName}"</span>
                            )
                        </div>
                        <div className="mt-4 text-slate-400">
                            print(result)
                        </div>
                        {step === 4 && (
                            <div className="mt-4 p-2 bg-green-500/20 border border-green-500/50 rounded text-green-400 animate-in fade-in slide-in-from-bottom-2">
                                result holds: "{`Hello, ${parameterName}!`}"
                            </div>
                        )}
                    </div>
                </div>

                {/* The Call Stack Arrow */}
                <svg className={`absolute top-24 left-[340px] w-24 h-8 transition-opacity duration-300 ${step >= 1 && step <= 3 ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 100 24" fill="none" stroke="currentColor">
                    <path d="M0 12 L100 12 M90 4 L100 12 L90 20" strokeWidth="2" className="text-yellow-500" />
                    <text x="50" y="-5" className="text-[10px] fill-yellow-500" textAnchor="middle">calls</text>
                </svg>

                {/* Return Arrow */}
                <svg className={`absolute top-48 left-[340px] w-24 h-8 transition-opacity duration-300 ${step === 3 || step === 4 ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 100 24" fill="none" stroke="currentColor">
                    <path d="M100 12 L0 12 M10 4 L0 12 L10 20" strokeWidth="2" className="text-green-500" />
                    <text x="50" y="-5" className="text-[10px] fill-green-500" textAnchor="middle">returns</text>
                </svg>

                {/* Function Scope (The Callee) */}
                <div className={`absolute top-8 right-8 w-96 bg-slate-900 border-2 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ${step >= 1 && step <= 3 ? 'border-yellow-500 scale-105' : 'border-slate-700 opacity-60'}`}>
                    <div className={`p-2 text-xs font-bold border-b tracking-wider transition-colors ${step >= 1 && step <= 3 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        CALL STACK: greet() FRAME
                    </div>

                    <div className="p-4 font-mono text-sm relative">
                        {/* Parameter binding */}
                        <div className="mb-4 pb-2 border-b border-slate-800">
                            def <span className="text-yellow-300">greet</span>(<span className={`transition-all duration-300 ${step === 1 ? 'text-orange-400 font-bold bg-orange-400/20 px-1 rounded' : 'text-blue-400'}`}>name</span>):
                            {step >= 1 && (
                                <div className="mt-2 text-xs text-slate-400 flex items-center gap-2 animate-in fade-in">
                                    <span className="text-blue-400">name</span>
                                    <span>bound to ➜</span>
                                    <span className="text-green-400">"{parameterName}"</span>
                                </div>
                            )}
                        </div>

                        {/* Body Execution */}
                        <div className={`pl-4 py-2 transition-colors duration-300 ${step === 2 ? 'bg-slate-800 border-l-4 border-yellow-500 rounded-r' : 'border-l-4 border-transparent'}`}>
                            <span className="text-blue-400">message</span> = f"Hello, &#123;<span className="text-blue-400">name</span>&#125;!"
                            {step >= 2 && (
                                <div className="mt-1 text-xs text-slate-400 animate-in fade-in">
                                    <span className="text-blue-400">message</span> = <span className="text-green-400">"Hello, {parameterName}!"</span>
                                </div>
                            )}
                        </div>

                        {/* Returning */}
                        <div className={`pl-4 py-2 mt-2 transition-colors duration-300 ${step === 3 ? 'bg-green-900/30 border-l-4 border-green-500 rounded-r' : 'border-l-4 border-transparent'}`}>
                            <span className="text-purple-400">return</span> <span className="text-blue-400">message</span>
                        </div>
                    </div>
                </div>

                {/* Explanation text */}
                <div className="absolute bottom-8 left-0 right-0 text-center font-mono text-sm">
                    {step === 0 && <span className="text-muted-foreground">Click 'Call Function' to see parameter binding in action.</span>}
                    {step === 1 && <span className="text-orange-400 bg-orange-400/10 px-3 py-1 rounded">1. The argument "{parameterName}" is assigned to the parameter variable `name`.</span>}
                    {step === 2 && <span className="text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">2. Function body executes using its local variables.</span>}
                    {step === 3 && <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded">3. The `return` keyword sends the value back and destroys the function frame.</span>}
                    {step === 4 && <span className="text-blue-400 bg-blue-400/10 px-3 py-1 rounded">4. The returned value is assigned to the `result` variable in the global scope.</span>}
                </div>
            </div>
        </div>
    );
};

export default FunctionsVisualizer;
