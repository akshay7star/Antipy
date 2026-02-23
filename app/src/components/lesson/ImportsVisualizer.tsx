'use client';

import React, { useState } from 'react';

type Mode = 'import' | 'from' | 'as';

interface ImportsVisualizerProps {
    initialMode?: Mode;
}

const ImportsVisualizer: React.FC<ImportsVisualizerProps> = ({ initialMode = 'import' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    Import (import math):
    0: Idle
    1: 'math' object copied to Global Namespace
    2: math.sqrt() execution

    From (from math import sqrt):
    0: Idle
    1: 'sqrt' copied directly to Global Namespace
    2: sqrt() execution

    As (import pandas as pd):
    0: Idle
    1: 'pandas' copied, mapped to alias 'pd'
    2: pd.DataFrame() execution
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        for (let i = 1; i <= 2; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('import'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'import' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        import math
                    </button>
                    <button
                        onClick={() => { setMode('from'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'from' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        from math import sqrt
                    </button>
                    <button
                        onClick={() => { setMode('as'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'as' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        import pandas as pd
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Execute Code' : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {/* Visualizer Canvas */}
                <div className="w-full max-w-3xl flex justify-between items-start gap-8 z-10">

                    {/* The Python Code / Current File */}
                    <div className="flex-1 bg-slate-900 border border-slate-700 p-6 rounded-lg font-mono text-sm shadow-xl relative min-h-[250px] flex flex-col">
                        <div className="text-xs text-slate-500 font-bold mb-4 border-b border-slate-800 pb-2">main.py (Your Code)</div>

                        {mode === 'import' && (
                            <>
                                <div className={`transition-all duration-300 ${step >= 1 ? 'text-white font-bold' : 'text-slate-600'}`}>
                                    <span className="text-purple-400">import</span> <span className="text-blue-300">math</span>
                                </div>
                                <div className={`mt-4 transition-all duration-300 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                                    result = <span className="text-blue-300 border-b border-dashed border-blue-500 pb-0.5">math.</span><span className="text-yellow-300">sqrt</span>(<span className="text-orange-400">16</span>)
                                </div>
                            </>
                        )}

                        {mode === 'from' && (
                            <>
                                <div className={`transition-all duration-300 ${step >= 1 ? 'text-white font-bold' : 'text-slate-600'}`}>
                                    <span className="text-purple-400">from</span> <span className="text-blue-300">math</span> <span className="text-purple-400">import</span> <span className="text-blue-300">sqrt</span>
                                </div>
                                <div className={`mt-4 transition-all duration-300 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                                    result = <span className="text-yellow-300">sqrt</span>(<span className="text-orange-400">16</span>)
                                </div>
                            </>
                        )}

                        {mode === 'as' && (
                            <>
                                <div className={`transition-all duration-300 ${step >= 1 ? 'text-white font-bold' : 'text-slate-600'}`}>
                                    <span className="text-purple-400">import</span> <span className="text-blue-300">pandas</span> <span className="text-purple-400">as</span> <span className="text-blue-300">pd</span>
                                </div>
                                <div className={`mt-4 transition-all duration-300 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                                    df = <span className="text-blue-300 border-b border-dashed border-blue-500 pb-0.5">pd.</span><span className="text-yellow-300">DataFrame</span>(data)
                                </div>
                            </>
                        )}

                        {/* Local Global Namespace Tracker */}
                        <div className="mt-auto bg-slate-950 border border-slate-800 p-2 rounded text-xs flex flex-col gap-1">
                            <span className="text-slate-500 italic mb-1 border-b border-slate-800 pb-1">Available Names</span>

                            {/* What names are loaded into memory? */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-slate-600">__name__</span>
                                {mode === 'import' && step >= 1 && <span className="text-blue-300 px-1 bg-blue-900/40 rounded animate-in fade-in slide-in-from-right-8 duration-500">math (Object)</span>}
                                {mode === 'from' && step >= 1 && <span className="text-yellow-300 px-1 bg-yellow-900/40 rounded animate-in fade-in slide-in-from-right-8 duration-500">sqrt (Function)</span>}
                                {mode === 'as' && step >= 1 && <span className="text-blue-300 px-1 bg-blue-900/40 rounded animate-in fade-in slide-in-from-right-8 duration-500">pd (Alias to Pandas)</span>}
                            </div>

                            {/* Execution Result */}
                            {step === 2 && (
                                <div className="mt-2 text-green-400 bg-green-900/20 p-1 border border-green-500/50 rounded font-code animate-pulse text-center">
                                    {(mode === 'import' || mode === 'from') ? 'Result: 4.0' : 'Table initialized'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Arrow / Pipe */}
                    <div className="flex-1 flex justify-center items-center relative h-full mb-16">
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-700"></div>

                        {step === 1 && (
                            <div className={`absolute -translate-y-1/2 px-2 py-1 font-bold font-mono text-xs rounded shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-[slideLeft_1s_ease-out_forwards] z-20 whitespace-nowrap
                                ${mode === 'from' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}
                            >
                                {mode === 'import' ? 'Copied object reference 📦' : mode === 'from' ? 'Extracted function 🎣' : 'Copied with alias 🏷️'}
                            </div>
                        )}
                    </div>

                    {/* External Library / Module */}
                    <div className="w-[200px] border-2 border-slate-700 bg-slate-900 rounded-lg p-4 flex flex-col min-h-[250px]">
                        <div className="text-xs text-slate-500 font-bold mb-4 border-b border-slate-800 pb-2 flex items-center gap-1 text-center">
                            External Code
                        </div>

                        {/* Box representing the external module file */}
                        <div className={`border rounded p-3 flex-1 flex flex-col gap-2 font-mono text-xs transition-colors duration-300
                            ${mode === 'as' ? 'border-orange-500/50 bg-orange-950/20' : 'border-emerald-500/50 bg-emerald-950/20'}
                        `}>
                            <div className={`text-center font-bold pb-2 border-b mb-2 ${mode === 'as' ? 'text-orange-400 border-orange-500/30' : 'text-emerald-400 border-emerald-500/30'}`}>
                                {mode === 'as' ? 'pandas/' : 'math.py'}
                            </div>

                            {mode !== 'as' ? (
                                <>
                                    <div className={`px-1 rounded ${mode === 'import' && step >= 1 ? 'bg-blue-900/60' : ''}`}>pi = 3.1415...</div>
                                    <div className={`px-1 rounded ${(mode === 'from') && step >= 1 ? 'bg-yellow-900/60' : mode === 'import' && step >= 1 ? 'bg-blue-900/60' : ''}`}>def sqrt(x):</div>
                                    <div className={`px-1 rounded ${mode === 'import' && step >= 1 ? 'bg-blue-900/60' : ''}`}>def floor(x):</div>
                                    <div className={`px-1 rounded ${mode === 'import' && step >= 1 ? 'bg-blue-900/60' : ''}`}>...</div>
                                </>
                            ) : (
                                <>
                                    <div className={`px-1 rounded ${step >= 1 ? 'bg-blue-900/60' : ''}`}>class DataFrame:</div>
                                    <div className={`px-1 rounded ${step >= 1 ? 'bg-blue-900/60' : ''}`}>class Series:</div>
                                    <div className={`px-1 rounded ${step >= 1 ? 'bg-blue-900/60' : ''}`}>def read_csv():</div>
                                    <div className={`px-1 rounded ${step >= 1 ? 'bg-blue-900/60' : ''}`}>...</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm px-8">
                    {mode === 'import' && step === 0 && <span className="text-slate-400">Basic import: Grabs the entire module object.</span>}
                    {mode === 'import' && step === 1 && <span className="text-blue-400 font-bold bg-blue-900/20 px-2 py-1 rounded">The 'math' object is added to your namespace.</span>}
                    {mode === 'import' && step === 2 && <span className="text-green-400">You must type math.sqrt() — "go into math, find sqrt".</span>}

                    {mode === 'from' && step === 0 && <span className="text-slate-400">From import: Plucks a specific tool out of the toolbox.</span>}
                    {mode === 'from' && step === 1 && <span className="text-yellow-400 font-bold bg-yellow-900/20 px-2 py-1 rounded">Only 'sqrt' is added to your namespace. 'math' is NOT.</span>}
                    {mode === 'from' && step === 2 && <span className="text-green-400">You can use sqrt() directly without the 'math.' prefix!</span>}

                    {mode === 'as' && step === 0 && <span className="text-slate-400">Alias import: Grabs the module but renames it locally.</span>}
                    {mode === 'as' && step === 1 && <span className="text-blue-400 font-bold bg-blue-900/20 px-2 py-1 rounded">Pandas is loaded, but labeled as 'pd' in your memory.</span>}
                    {mode === 'as' && step === 2 && <span className="text-green-400">You can now use pd.DataFrame() — much shorter to type!</span>}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideLeft {
                    0% { right: -50px; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { right: 100%; transform: translateX(50px) translateY(-50%); opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default ImportsVisualizer;
