'use client';

import React, { useState } from 'react';

type Mode = 'valid' | 'invalid' | 'keywords';

interface KeywordsVisualizerProps {
    initialMode?: Mode;
}

const KeywordsVisualizer: React.FC<KeywordsVisualizerProps> = ({ initialMode = 'valid' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    Valid:
    0: Input
    1: Lexer Scan (Ok)
    2: Variable Created in Memory

    Invalid (Keyword):
    0: Input (class = "Math")
    1: Lexer Scan (Error: 'class' is a Keyword!)
    2: SyntaxError Crash

    Keywords Map (Show Categories):
    Display interactive map of the 35 keywords.
    */

    const runValid = async () => {
        if (step !== 0) return;
        setStep(1);
        await new Promise(r => setTimeout(r, 1500));
        setStep(2);
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    const runInvalid = async () => {
        if (step !== 0) return;
        setStep(1);
        await new Promise(r => setTimeout(r, 1500));
        setStep(2);
        await new Promise(r => setTimeout(r, 2000));
        setStep(0);
    };

    const keywordsList = [
        { word: 'False', type: 'value' }, { word: 'None', type: 'value' }, { word: 'True', type: 'value' },
        { word: 'and', type: 'logic' }, { word: 'or', type: 'logic' }, { word: 'not', type: 'logic' }, { word: 'is', type: 'logic' }, { word: 'in', type: 'logic' },
        { word: 'if', type: 'control' }, { word: 'elif', type: 'control' }, { word: 'else', type: 'control' },
        { word: 'for', type: 'loop' }, { word: 'while', type: 'loop' }, { word: 'break', type: 'loop' }, { word: 'continue', type: 'loop' },
        { word: 'def', type: 'func' }, { word: 'return', type: 'func' }, { word: 'lambda', type: 'func' }, { word: 'yield', type: 'func' },
        { word: 'class', type: 'oop' },
        { word: 'try', type: 'error' }, { word: 'except', type: 'error' }, { word: 'finally', type: 'error' }, { word: 'raise', type: 'error' }, { word: 'assert', type: 'error' },
        { word: 'import', type: 'module' }, { word: 'from', type: 'module' }, { word: 'as', type: 'module' },
        { word: 'global', type: 'scope' }, { word: 'nonlocal', type: 'scope' },
        { word: 'with', type: 'other' }, { word: 'pass', type: 'other' }, { word: 'del', type: 'other' },
        { word: 'async', type: 'async' }, { word: 'await', type: 'async' }
    ];

    const getColor = (type: string) => {
        switch (type) {
            case 'value': return 'bg-orange-900/40 text-orange-300 border-orange-700';
            case 'logic': return 'bg-blue-900/40 text-blue-300 border-blue-700';
            case 'control': return 'bg-purple-900/40 text-purple-300 border-purple-700';
            case 'loop': return 'bg-pink-900/40 text-pink-300 border-pink-700';
            case 'func': return 'bg-yellow-900/40 text-yellow-300 border-yellow-700';
            case 'oop': return 'bg-green-900/40 text-green-300 border-green-700';
            case 'error': return 'bg-red-900/40 text-red-300 border-red-700';
            case 'module': return 'bg-teal-900/40 text-teal-300 border-teal-700';
            default: return 'bg-slate-800 text-slate-300 border-slate-600';
        }
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('valid'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'valid' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Valid Variable Name
                    </button>
                    <button
                        onClick={() => { setMode('invalid'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'invalid' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Keyword Collision
                    </button>
                    <button
                        onClick={() => { setMode('keywords'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'keywords' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        The 35 Keywords
                    </button>
                </div>

                {mode !== 'keywords' && (
                    <button
                        onClick={mode === 'valid' ? runValid : runInvalid}
                        disabled={step !== 0}
                        className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                    >
                        {step === 0 ? 'Run Lexer' : 'Scanning...'}
                    </button>
                )}
            </div>

            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {(mode === 'valid' || mode === 'invalid') && (
                    <div className="w-full max-w-4xl flex justify-between items-center gap-8 relative z-10">

                        {/* 1. Source Code */}
                        <div className="flex-1 bg-slate-900 border border-slate-700 p-6 rounded-lg font-mono text-xl shadow-xl relative min-h-[150px] flex items-center justify-center">
                            <div className="absolute top-2 left-2 text-xs font-bold text-slate-500">Source Code</div>

                            {mode === 'valid' ? (
                                <div>
                                    <span className={`transition-colors duration-300 ${step >= 1 ? 'text-green-400 font-bold bg-green-900/30 px-1 rounded' : 'text-blue-300'}`}>user_name</span>
                                    <span className="text-white mx-2">=</span>
                                    <span className="text-green-400">"Alice"</span>
                                </div>
                            ) : (
                                <div>
                                    <span className={`transition-colors duration-300 ${step >= 1 ? 'text-purple-400 font-bold bg-red-900/50 px-1 rounded border border-red-500' : 'text-blue-300'}`}>class</span>
                                    <span className="text-white mx-2">=</span>
                                    <span className="text-green-400">"Math"</span>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                            )}
                        </div>

                        {/* Scanner Beam / Arrow */}
                        <div className="w-32 flex flex-col items-center justify-center relative h-full">
                            {step === 1 && (
                                <div className="absolute text-2xl animate-[scan_1.5s_ease-in-out]">
                                    {mode === 'valid' ? '🔍' : '🚨'}
                                </div>
                            )}
                            <div className="h-[2px] w-full bg-slate-700 relative mt-4">
                                {step >= 1 && (
                                    <div className={`absolute inset-0 ${mode === 'valid' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`}></div>
                                )}
                            </div>
                            <div className="text-[10px] mt-2 font-mono text-slate-400 uppercase tracking-widest">
                                Python Lexer
                            </div>
                        </div>

                        {/* 2. Memory / Interpreter Result */}
                        <div className={`flex-1 bg-slate-950 border-2 rounded-lg p-6 shadow-xl relative min-h-[150px] flex flex-col justify-center items-center transition-all duration-500
                            ${step === 0 ? 'border-slate-800 opacity-50' : mode === 'valid' ? 'border-green-600 opacity-100 bg-green-950/20' : 'border-red-600 opacity-100 bg-red-950/20'}
                        `}>
                            <div className="absolute top-2 left-2 text-xs font-bold text-slate-500">Interpreter State</div>

                            {step === 0 && <span className="text-slate-600 italic">Waiting for code...</span>}

                            {mode === 'valid' && step >= 1 && (
                                <div className={`text-center transition-all duration-500 ${step === 2 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                                    <div className="text-green-400 font-bold mb-2">✅ Syntax OK</div>
                                    <div className="bg-slate-900 border border-slate-700 rounded p-3 font-mono text-sm inline-block">
                                        <div className="text-blue-300">user_name <span className="text-slate-500">➔</span> <span className="text-green-400 focus:outline outline-green-500">"Alice"</span></div>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">Variable safely stored in memory.</div>
                                </div>
                            )}

                            {mode === 'invalid' && step >= 1 && (
                                <div className={`text-center transition-all duration-500 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                                    <div className="text-red-500 font-bold text-lg mb-2 flex items-center justify-center gap-2">
                                        <span className="text-2xl animate-bounce">💥</span> SyntaxError
                                    </div>
                                    <div className="text-red-400 font-mono text-xs bg-red-950/50 p-2 rounded border border-red-900">
                                        invalid syntax
                                    </div>
                                    <div className="text-xs text-orange-300 mt-3 font-mono mt-4">
                                        'class' is a reserved keyword!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 35 Keywords Map mode */}
                {mode === 'keywords' && (
                    <div className="w-full max-w-4xl animate-in fade-in duration-500">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-white mb-2">The 35 Reserved Words</h3>
                            <p className="text-sm text-slate-400">You cannot name any variable, function, or class using these exact words.</p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {keywordsList.map((kw) => (
                                <div
                                    key={kw.word}
                                    className={`px-3 py-1.5 rounded-md font-mono text-sm border shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-default
                                        ${getColor(kw.type)}
                                    `}
                                    title={`Category: ${kw.type}`}
                                >
                                    {kw.word}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center gap-6 text-xs font-mono text-slate-400">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-orange-900/60 border border-orange-700"></div> Values</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-blue-900/60 border border-blue-700"></div> Logic</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-purple-900/60 border border-purple-700"></div> Control Flow</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-pink-900/60 border border-pink-700"></div> Loops</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-yellow-900/60 border border-yellow-700"></div> Functions</div>
                        </div>
                    </div>
                )}

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { transform: translateY(-30px); opacity: 0; }
                    20% { opacity: 1; }
                    50% { transform: translateY(0px) scale(1.5); }
                    80% { opacity: 1; }
                    100% { transform: translateY(30px); opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default KeywordsVisualizer;
