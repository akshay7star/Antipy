'use client';

import React, { useState } from 'react';

type Mode = 'normal' | 'generator';

interface GeneratorsVisualizerProps {
    initialMode?: Mode;
}

const GeneratorsVisualizer: React.FC<GeneratorsVisualizerProps> = ({ initialMode = 'generator' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Generator State
    const [genStep, setGenStep] = useState(0);
    /* 
      0: Initial
      1: next() called -> Entering function
      2: Yielding 1
      3: Suspended (Yielded 1)
      4: next() called -> Resuming
      5: Yielding 2
      6: Suspended (Yielded 2)
      7: next() called -> Resuming
      8: Yielding 3
      9: Finished / StopIteration
    */
    const [genOutput, setGenOutput] = useState<number[]>([]);

    // Normal Function State
    const [normStep, setNormStep] = useState(0);
    const [normOutput, setNormOutput] = useState<number[]>([]);

    const handleNextGenerator = async () => {
        if (genStep >= 9) return;

        // Sequence: "Call next()" -> "Enter/Resume" -> "Yield value" -> "Suspend"

        if (genStep === 0) {
            setGenStep(1); // Enter
            await new Promise(r => setTimeout(r, 800));
            setGenStep(2); // Yielding
            await new Promise(r => setTimeout(r, 800));
            setGenOutput([1]);
            setGenStep(3); // Suspended
        } else if (genStep === 3) {
            setGenStep(4); // Resume
            await new Promise(r => setTimeout(r, 800));
            setGenStep(5); // Yielding
            await new Promise(r => setTimeout(r, 800));
            setGenOutput([1, 2]);
            setGenStep(6); // Suspended
        } else if (genStep === 6) {
            setGenStep(7); // Resume
            await new Promise(r => setTimeout(r, 800));
            setGenStep(8); // Yielding
            await new Promise(r => setTimeout(r, 800));
            setGenOutput([1, 2, 3]);
            setGenStep(9); // Finished
        }
    };

    const handleRunNormal = async () => {
        if (normStep !== 0) return;
        setNormStep(1); // Enter
        setNormOutput([]);
        await new Promise(r => setTimeout(r, 800));

        setNormStep(2); // Append 1
        await new Promise(r => setTimeout(r, 800));

        setNormStep(3); // Append 2
        await new Promise(r => setTimeout(r, 800));

        setNormStep(4); // Append 3
        await new Promise(r => setTimeout(r, 800));

        setNormStep(5); // Return all
        setNormOutput([1, 2, 3]);
    };

    const reset = () => {
        setGenStep(0);
        setGenOutput([]);
        setNormStep(0);
        setNormOutput([]);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('normal'); reset(); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'normal' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Normal Function
                    </button>
                    <button
                        onClick={() => { setMode('generator'); reset(); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'generator' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Generator (yield)
                    </button>
                </div>

                {mode === 'normal' ? (
                    <button
                        onClick={handleRunNormal}
                        disabled={normStep !== 0}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                    >
                        {normStep === 0 ? 'get_numbers()' : 'Executing...'}
                    </button>
                ) : (
                    <button
                        onClick={handleNextGenerator}
                        disabled={[1, 2, 4, 5, 7, 8].includes(genStep) || genStep >= 9}
                        className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-mono rounded shadow flex items-center gap-2 disabled:opacity-50"
                    >
                        <span>next(gen)</span>
                        {(genStep === 3 || genStep === 6) && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>}
                    </button>
                )}
            </div>

            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'normal' && (
                    <div className="w-full max-w-3xl flex justify-between gap-8 h-[250px]">

                        {/* Function Box */}
                        <div className={`flex-1 border-2 rounded-lg p-6 relative transition-all duration-300 ${normStep > 0 && normStep < 5 ? 'bg-slate-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-slate-900/50 border-slate-700'}`}>
                            <div className="absolute top-0 right-0 max-w-[200px] text-[10px] text-blue-400 bg-blue-900/20 px-2 py-1 rounded-bl-lg border-b border-l border-blue-500/30">
                                RAM Allocated: <span className="font-bold">{normStep === 0 ? '0MB' : normStep === 5 ? 'Varies' : 'Growing...'}</span>
                            </div>

                            <div className="font-mono text-sm">
                                <span className="text-purple-400">def</span> <span className="text-blue-300">get_numbers</span>():
                                <div className="pl-4 text-slate-400">results = []</div>
                                <div className={`pl-4 transition-colors ${normStep === 2 ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {normStep === 2 && '▶ '}results.append(1)
                                </div>
                                <div className={`pl-4 transition-colors ${normStep === 3 ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {normStep === 3 && '▶ '}results.append(2)
                                </div>
                                <div className={`pl-4 transition-colors ${normStep === 4 ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {normStep === 4 && '▶ '}results.append(3)
                                </div>
                                <div className={`pl-4 transition-colors ${normStep === 5 ? 'text-purple-400 font-bold bg-slate-800' : 'text-purple-400/50'}`}>
                                    {normStep === 5 && '▶ '}return results
                                </div>
                            </div>
                        </div>

                        {/* Caller/Output Box */}
                        <div className="flex-1 border-2 border-slate-700 bg-slate-900 rounded-lg p-6 flex flex-col justify-center items-center relative">
                            <div className="text-xs text-slate-500 font-mono absolute top-2 left-2">main() Output</div>

                            <div className="h-16 flex items-center justify-center font-mono text-xl font-bold">
                                {normStep === 0 ? (
                                    <span className="text-slate-600 italic">Waiting...</span>
                                ) : normStep < 5 ? (
                                    <span className="text-yellow-500 animate-pulse">Running full function...</span>
                                ) : (
                                    <div className="flex gap-2 animate-in slide-in-from-left-8 fade-in">
                                        <span className="text-slate-400">[</span>
                                        <span className="text-blue-400">{normOutput[0]}</span>,
                                        <span className="text-blue-400">{normOutput[1]}</span>,
                                        <span className="text-blue-400">{normOutput[2]}</span>
                                        <span className="text-slate-400">]</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-xs text-center text-slate-400">
                                Normal functions compute <strong className="text-white">everything</strong> at once before returning the entire list.
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'generator' && (
                    <div className="w-full max-w-3xl flex justify-between gap-8 h-[250px]">

                        {/* Generator Box */}
                        <div className={`flex-1 border-2 rounded-lg p-6 relative transition-all duration-300 ${(genStep === 3 || genStep === 6) ? 'bg-slate-900 border-yellow-600 shadow-[0_0_20px_rgba(202,138,4,0.3)]' : (genStep > 0 && genStep < 9) ? 'bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-slate-900/50 border-slate-700'}`}>

                            {(genStep === 3 || genStep === 6) && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg">
                                    STATE SUSPENDED ⏸
                                </div>
                            )}

                            <div className="absolute top-0 right-0 max-w-[200px] text-[10px] text-purple-400 bg-purple-900/20 px-2 py-1 rounded-bl-lg border-b border-l border-purple-500/30">
                                RAM Allocated: <span className="font-bold border-b border-purple-500/50">O(1) Tiny!</span>
                            </div>

                            <div className="font-mono text-sm mt-2">
                                <span className="text-purple-400">def</span> <span className="text-purple-300">yield_numbers</span>():
                                <div className={`pl-4 transition-colors ${(genStep === 1 || genStep === 2) ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {(genStep === 1 || genStep === 2) && <span className="text-green-500 absolute left-6 animate-pulse">▶ </span>}
                                    <span className="text-purple-400">yield</span> <span className="text-green-400">1</span>
                                </div>

                                <div className={`pl-4 transition-colors ${(genStep === 4 || genStep === 5) ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {(genStep === 4 || genStep === 5) && <span className="text-green-500 absolute left-6 animate-pulse">▶ </span>}
                                    <span className="text-purple-400">yield</span> <span className="text-green-400">2</span>
                                </div>

                                <div className={`pl-4 transition-colors ${(genStep === 7 || genStep === 8) ? 'text-white font-bold bg-slate-800' : 'text-slate-500'}`}>
                                    {(genStep === 7 || genStep === 8) && <span className="text-green-500 absolute left-6 animate-pulse">▶ </span>}
                                    <span className="text-purple-400">yield</span> <span className="text-green-400">3</span>
                                </div>
                            </div>
                        </div>

                        {/* Caller/Output Box */}
                        <div className="flex-1 border-2 border-slate-700 bg-slate-900 rounded-lg p-6 flex flex-col justify-center items-center relative gap-4">
                            <div className="text-xs text-slate-500 font-mono absolute top-2 left-2">main() Output Stream</div>

                            <div className="flex gap-4 h-16 items-center">
                                {genStep === 0 && <span className="text-slate-600 italic font-mono">Click next(gen) to pull a value</span>}

                                {genOutput.map((val, i) => (
                                    <div key={i} className={`w-12 h-12 rounded flex items-center justify-center font-mono font-bold text-2xl transition-all duration-300 ${i === genOutput.length - 1 && [3, 6, 9].includes(genStep) ? 'bg-purple-900/80 border-2 border-purple-500 text-purple-300 animate-in zoom-in slide-in-from-left-8' : 'bg-slate-800 border-[1px] border-slate-700 text-slate-400'}`}>
                                        {val}
                                    </div>
                                ))}

                                {genStep >= 9 && (
                                    <div className="text-red-400 text-xs font-mono font-bold ml-2 bg-red-900/20 px-2 py-1 rounded">
                                        StopIteration!
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 text-xs text-center text-slate-400 px-4">
                                Generators compute exactly <strong className="text-white">one value at a time</strong>, saving immense memory.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneratorsVisualizer;
