'use client';

import React, { useState } from 'react';

type Mode = 'arithmetic' | 'comparison' | 'logical';

interface OperatorsVisualizerProps {
    initialMode?: Mode;
}

const OperatorsVisualizer: React.FC<OperatorsVisualizerProps> = ({ initialMode = 'arithmetic' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Arithmetic State
    const [arithOp, setArithOp] = useState<'+' | '-' | '*' | '/' | '//' | '%'>('+');
    const [arithA, setArithA] = useState(10);
    const [arithB, setArithB] = useState(3);

    // Comparison State
    const [compOp, setCompOp] = useState<'==' | '!=' | '>' | '<' | '>=' | '<='>('>');
    const [compA, setCompA] = useState(5);
    const [compB, setCompB] = useState(5);

    // Logical State
    const [logicOp, setLogicOp] = useState<'and' | 'or'>('and');
    const [logicA, setLogicA] = useState(true);
    const [logicB, setLogicB] = useState(false);

    const getArithResult = () => {
        switch (arithOp) {
            case '+': return arithA + arithB;
            case '-': return arithA - arithB;
            case '*': return arithA * arithB;
            case '/': return (arithA / arithB).toFixed(2);
            case '//': return Math.floor(arithA / arithB);
            case '%': return arithA % arithB;
        }
    };

    const getCompResult = () => {
        switch (compOp) {
            case '==': return compA === compB;
            case '!=': return compA !== compB;
            case '>': return compA > compB;
            case '<': return compA < compB;
            case '>=': return compA >= compB;
            case '<=': return compA <= compB;
        }
    };

    const getLogicResult = () => {
        if (logicOp === 'and') return logicA && logicB;
        if (logicOp === 'or') return logicA || logicB;
        return false;
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => setMode('arithmetic')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'arithmetic' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Arithmetic
                    </button>
                    <button
                        onClick={() => setMode('comparison')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'comparison' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Comparison
                    </button>
                    <button
                        onClick={() => setMode('logical')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'logical' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Boolean Logic
                    </button>
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'arithmetic' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-slate-400 font-mono text-sm">Math operators return a <strong className="text-blue-400">number</strong>.</div>

                        <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl">
                            {/* Operand A */}
                            <input
                                type="number"
                                value={arithA}
                                onChange={(e) => setArithA(Number(e.target.value) || 0)}
                                className="w-24 bg-slate-800 border-2 border-slate-600 rounded text-center text-3xl font-mono text-blue-400 p-2 focus:border-blue-500 outline-none"
                            />

                            {/* Operator Select */}
                            <select
                                value={arithOp}
                                onChange={(e) => setArithOp(e.target.value as any)}
                                className="bg-purple-900/50 border-2 border-purple-500 text-purple-300 text-3xl font-mono p-2 rounded appearance-none text-center outline-none cursor-pointer hover:bg-purple-900 transition-colors"
                            >
                                <option value="+">+</option>
                                <option value="-">-</option>
                                <option value="*">*</option>
                                <option value="/">/</option>
                                <option value="//">//</option>
                                <option value="%">%</option>
                            </select>

                            {/* Operand B */}
                            <input
                                type="number"
                                value={arithB}
                                onChange={(e) => setArithB(Number(e.target.value) || 0)}
                                className="w-24 bg-slate-800 border-2 border-slate-600 rounded text-center text-3xl font-mono text-blue-400 p-2 focus:border-blue-500 outline-none"
                            />

                            <div className="text-4xl text-slate-500 font-mono">=</div>

                            {/* Result */}
                            <div className="min-w-[100px] bg-green-900/30 border-2 border-green-500 rounded text-center text-4xl font-mono text-green-400 p-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                {getArithResult()}
                            </div>
                        </div>

                        {/* Explainer */}
                        <div className="h-12 flex items-center justify-center text-center">
                            {arithOp === '/' && <span className="bg-blue-900/40 text-blue-300 px-4 py-2 rounded border border-blue-700">True Division: Always returns a float (decimal), even if it divides evenly.</span>}
                            {arithOp === '//' && <span className="bg-purple-900/40 text-purple-300 px-4 py-2 rounded border border-purple-700">Floor Division: Chops off the decimal part, rounding DOWN to the nearest whole integer.</span>}
                            {arithOp === '%' && <span className="bg-orange-900/40 text-orange-300 px-4 py-2 rounded border border-orange-700">Modulo: Returns the REMAINDER of division. (e.g. 10 ÷ 3 = 3 with a remainder of 1).</span>}
                        </div>
                    </div>
                )}

                {mode === 'comparison' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-slate-400 font-mono text-sm">Comparison operators return <strong className="text-yellow-400">True</strong> or <strong className="text-yellow-400">False</strong>.</div>

                        <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl">
                            {/* Operand A */}
                            <input
                                type="number"
                                value={compA}
                                onChange={(e) => setCompA(Number(e.target.value) || 0)}
                                className="w-24 bg-slate-800 border-2 border-slate-600 rounded text-center text-3xl font-mono text-blue-400 p-2 focus:border-blue-500 outline-none"
                            />

                            {/* Operator Select */}
                            <select
                                value={compOp}
                                onChange={(e) => setCompOp(e.target.value as any)}
                                className="bg-yellow-900/50 border-2 border-yellow-500 text-yellow-300 text-3xl font-mono p-2 rounded appearance-none text-center outline-none cursor-pointer hover:bg-yellow-900 transition-colors"
                            >
                                <option value="==">==</option>
                                <option value="!=">!=</option>
                                <option value=">">&gt;</option>
                                <option value="<">&lt;</option>
                                <option value=">=">&gt;=</option>
                                <option value="<=">&lt;=</option>
                            </select>

                            {/* Operand B */}
                            <input
                                type="number"
                                value={compB}
                                onChange={(e) => setCompB(Number(e.target.value) || 0)}
                                className="w-24 bg-slate-800 border-2 border-slate-600 rounded text-center text-3xl font-mono text-blue-400 p-2 focus:border-blue-500 outline-none"
                            />

                            <div className="text-4xl text-slate-500 font-mono">➔</div>

                            {/* Result */}
                            <div className={`min-w-[120px] border-2 rounded text-center text-3xl font-bold font-mono p-2 transition-colors duration-300
                                ${getCompResult() ? 'bg-green-900/40 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-red-900/40 border-red-500 text-red-400'}
                            `}>
                                {getCompResult() ? 'True' : 'False'}
                            </div>
                        </div>

                        <div className="text-sm font-mono text-slate-500 bg-slate-900 p-4 rounded border border-slate-800">
                            if <span className="text-blue-300">{compA}</span> <span className="text-yellow-400">{compOp}</span> <span className="text-blue-300">{compB}</span>:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{getCompResult() ? <span className="text-green-400">print("This code runs!")</span> : <span className="text-slate-600 line-through">print("This code is skipped.")</span>}
                        </div>
                    </div>
                )}

                {mode === 'logical' && (
                    <div className="w-full max-w-3xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                        <div className="text-slate-400 font-mono text-sm">Logical operators combine multiple booleans together.</div>

                        <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl">

                            {/* Logic A */}
                            <button
                                onClick={() => setLogicA(!logicA)}
                                className={`w-32 py-4 rounded text-2xl font-bold font-mono border-2 transition-colors duration-300
                                    ${logicA ? 'bg-green-900/40 border-green-500 text-green-400' : 'bg-red-900/40 border-red-500 text-red-400'}
                                `}
                            >
                                {logicA ? 'True' : 'False'}
                            </button>

                            {/* Operator Select */}
                            <select
                                value={logicOp}
                                onChange={(e) => setLogicOp(e.target.value as any)}
                                className="bg-purple-900/50 border-2 border-purple-500 text-purple-300 text-2xl font-bold font-mono p-2 rounded appearance-none text-center outline-none cursor-pointer hover:bg-purple-900 transition-colors uppercase"
                            >
                                <option value="and">AND</option>
                                <option value="or">OR</option>
                            </select>

                            {/* Logic B */}
                            <button
                                onClick={() => setLogicB(!logicB)}
                                className={`w-32 py-4 rounded text-2xl font-bold font-mono border-2 transition-colors duration-300
                                    ${logicB ? 'bg-green-900/40 border-green-500 text-green-400' : 'bg-red-900/40 border-red-500 text-red-400'}
                                `}
                            >
                                {logicB ? 'True' : 'False'}
                            </button>

                            <div className="text-4xl text-slate-500 font-mono">➔</div>

                            {/* Result */}
                            <div className={`w-32 py-4 rounded text-2xl font-bold font-mono border-2 text-center transition-colors duration-300
                                ${getLogicResult() ? 'bg-green-600 border-green-400 text-white shadow-[0_0_30px_rgba(34,197,94,0.6)]' : 'bg-red-950 border-red-900 text-red-800'}
                            `}>
                                {getLogicResult() ? 'TRUE' : 'FALSE'}
                            </div>
                        </div>

                        {/* Truth Table Explainer */}
                        <div className="flex gap-8 w-full justify-center">
                            {logicOp === 'and' ? (
                                <div className="bg-slate-900 border border-purple-500/50 p-4 rounded text-sm font-mono flex flex-col items-center">
                                    <div className="text-purple-400 font-bold border-b border-slate-700 pb-2 mb-2 w-full text-center">AND Truth Table</div>
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center">
                                        <div className="text-green-500">True</div><div className="text-green-500">True</div><div className="text-green-400 font-bold">True</div>
                                        <div className="text-green-500">True</div><div className="text-red-500">False</div><div className="text-red-500 line-through">False</div>
                                        <div className="text-red-500">False</div><div className="text-green-500">True</div><div className="text-red-500 line-through">False</div>
                                        <div className="text-red-500">False</div><div className="text-red-500">False</div><div className="text-red-500 line-through">False</div>
                                    </div>
                                    <div className="mt-4 text-xs text-slate-400 max-w-[200px] text-center">BOTH sides must be True to pass.</div>
                                </div>
                            ) : (
                                <div className="bg-slate-900 border border-purple-500/50 p-4 rounded text-sm font-mono flex flex-col items-center">
                                    <div className="text-purple-400 font-bold border-b border-slate-700 pb-2 mb-2 w-full text-center">OR Truth Table</div>
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center">
                                        <div className="text-green-500">True</div><div className="text-green-500">True</div><div className="text-green-400 font-bold">True</div>
                                        <div className="text-green-500">True</div><div className="text-red-500">False</div><div className="text-green-400 font-bold">True</div>
                                        <div className="text-red-500">False</div><div className="text-green-500">True</div><div className="text-green-400 font-bold">True</div>
                                        <div className="text-red-500">False</div><div className="text-red-500">False</div><div className="text-red-500 line-through">False</div>
                                    </div>
                                    <div className="mt-4 text-xs text-slate-400 max-w-[200px] text-center">Only ONE side needs to be True to pass.</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OperatorsVisualizer;
