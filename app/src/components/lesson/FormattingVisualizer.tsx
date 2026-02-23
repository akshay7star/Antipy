'use client';

import React, { useState } from 'react';

type Mode = 'fstring' | 'format';

interface FormattingVisualizerProps {
    initialMode?: Mode;
}

const FormattingVisualizer: React.FC<FormattingVisualizerProps> = ({ initialMode = 'fstring' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /*
    F-String Mode:
    0: Raw String
    1: Identify Expressions {}
    2: Evaluate Expressions
    3: Interpolate into String

    Format Method Mode:
    0: Raw String 
    1: Identify Placeholders {}
    2: Map Arguments to Placeholders
    3: Interpolate into String
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        for (let i = 1; i <= 3; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1200));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('fstring'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'fstring' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Modern f-strings
                    </button>
                    <button
                        onClick={() => { setMode('format'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'format' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        .format() method
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Format String' : 'Evaluating...'}
                </button>
            </div>

            <div className="p-8 min-h-[350px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'fstring' && (
                    <div className="w-full max-w-2xl flex flex-col gap-8 relative z-10">
                        {/* Variables Memory */}
                        <div className="flex gap-4 justify-center">
                            <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg font-mono text-sm shadow-xl flex items-center gap-2">
                                <span className="text-blue-300">name</span> = <span className="text-green-400">"Alice"</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg font-mono text-sm shadow-xl flex items-center gap-2">
                                <span className="text-blue-300">age</span> = <span className="text-orange-400">30</span>
                            </div>
                        </div>

                        {/* F-String Visualization */}
                        <div className="bg-black border-2 border-slate-700 p-6 rounded-lg font-mono text-xl text-center shadow-xl relative min-h-[120px] flex items-center justify-center transition-all duration-500">
                            <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Code</div>

                            {step === 0 && (
                                <div>
                                    <span className="text-purple-400 font-bold">f</span><span className="text-green-400">"Hello, {'{'}name{'}'}! You are {'{'}age{'}'} years old."</span>
                                </div>
                            )}

                            {step === 1 && (
                                <div>
                                    <span className="text-purple-400 font-bold">f</span><span className="text-green-400">"Hello, </span>
                                    <span className="bg-blue-900/50 border border-blue-500 px-1 rounded text-blue-300 animate-pulse">{'{'}name{'}'}</span>
                                    <span className="text-green-400">! You are </span>
                                    <span className="bg-blue-900/50 border border-blue-500 px-1 rounded text-blue-300 animate-pulse">{'{'}age{'}'}</span>
                                    <span className="text-green-400"> years old."</span>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <span className="text-purple-400 font-bold">f</span><span className="text-green-400">"Hello, </span>
                                    <span className="bg-yellow-900/50 border border-yellow-500 px-1 rounded text-green-400 font-bold">"Alice"</span>
                                    <span className="text-green-400">! You are </span>
                                    <span className="bg-yellow-900/50 border border-yellow-500 px-1 rounded text-orange-400 font-bold">30</span>
                                    <span className="text-green-400"> years old."</span>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate-in zoom-in duration-300 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-green-950/20 px-4 py-2 border border-green-500 rounded">
                                    "Hello, Alice! You are 30 years old."
                                </div>
                            )}
                        </div>

                        {/* Explanation Box */}
                        <div className="h-12 flex items-center justify-center text-sm font-mono text-slate-400 text-center px-4">
                            {step === 0 && "PREFIX the string with 'f' to enable f-string formatting."}
                            {step === 1 && "Python scans the string for curly braces { } containing expressions."}
                            {step === 2 && "The expressions inside the braces are EVALUATED using the current variables."}
                            {step === 3 && "The evaluated values are injected, returning a brand new string."}
                        </div>
                    </div>
                )}

                {mode === 'format' && (
                    <div className="w-full max-w-3xl flex flex-col items-center gap-8 relative z-10">
                        {/* Format String Visualization */}
                        <div className="bg-black border-2 border-slate-700 p-6 rounded-lg font-mono text-center shadow-xl relative min-h-[140px] flex flex-col items-center justify-center transition-all duration-500 w-full">
                            <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold">Code</div>

                            {step === 0 && (
                                <div className="text-lg">
                                    <span className="text-green-400">"Item: {'{}'}, Price: ${'{}'}."</span>.<span className="text-blue-300">format</span>(<span className="text-green-400">"Apple"</span>, <span className="text-orange-400">1.99</span>)
                                </div>
                            )}

                            {step === 1 && (
                                <div className="flex flex-col gap-4 items-center w-full relative">
                                    <div className="text-lg">
                                        <span className="text-green-400">"Item: </span>
                                        <span className="bg-purple-900/50 border border-purple-500 px-2 rounded text-purple-300 animate-pulse">{'{ }'}</span>
                                        <span className="text-green-400">, Price: $</span>
                                        <span className="bg-pink-900/50 border border-pink-500 px-2 rounded text-pink-300 animate-pulse">{'{ }'}</span>
                                        <span className="text-green-400">."</span>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded font-mono text-sm self-end absolute -bottom-16 right-0">
                                        .format(<span className="text-purple-300 uppercase border-b border-purple-500">"Apple"</span>, <span className="text-pink-300 uppercase border-b border-pink-500">1.99</span>)
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="flex flex-col gap-4 items-center w-full relative">
                                    <div className="text-lg">
                                        <span className="text-green-400">"Item: </span>
                                        <span className="bg-yellow-900/50 border border-yellow-500 px-2 rounded text-green-400 font-bold">"Apple"</span>
                                        <span className="text-green-400">, Price: $</span>
                                        <span className="bg-yellow-900/50 border border-yellow-500 px-2 rounded text-orange-400 font-bold">1.99</span>
                                        <span className="text-green-400">."</span>
                                    </div>
                                    {/* Connection Lines (Visual abstraction) */}
                                    <div className="absolute top-full left-[35%] w-0.5 h-10 border-l-2 border-dashed border-purple-500 -mt-2"></div>
                                    <div className="absolute top-full right-[25%] w-0.5 h-10 border-l-2 border-dashed border-pink-500 -mt-2"></div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate-in zoom-in duration-300 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-green-950/20 px-4 py-2 border border-green-500 rounded text-xl">
                                    "Item: Apple, Price: $1.99."
                                </div>
                            )}
                        </div>

                        {/* Explanation Box */}
                        <div className="h-12 flex items-center justify-center text-sm font-mono text-slate-400 text-center px-4">
                            {step === 0 && "The older .format() method acts on a string containing empty braces."}
                            {step === 1 && "Python scans for empty braces {} to act as placeholders."}
                            {step === 2 && "The arguments passed to .format() are mapped to placeholders in order."}
                            {step === 3 && "The final combined string is returned."}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormattingVisualizer;
