'use client';

import React, { useState, useEffect } from 'react';

const DPVisualizer: React.FC = () => {
    const [mode, setMode] = useState<'memo' | 'tab'>('memo');

    // Memo State
    const [fibN, setFibN] = useState(5);
    const [memo, setMemo] = useState<Record<number, number>>({});
    const [callStack, setCallStack] = useState<number[]>([]);
    const [activeCall, setActiveCall] = useState<number | null>(null);
    const [isPlayingMemo, setIsPlayingMemo] = useState(false);

    // Tabulation State
    const [tabArr, setTabArr] = useState<number[]>([0, 1]);
    const [tabIndex, setTabIndex] = useState(2);
    const [isPlayingTab, setIsPlayingTab] = useState(false);

    // Hardcoded animation sequence for Fibonacci(5) Memoization
    // [node, action: 'call'|'return'|'memo', value(if return/memo)]
    const memoSteps = [
        { node: 5, action: 'call' },
        { node: 4, action: 'call' },
        { node: 3, action: 'call' },
        { node: 2, action: 'call' },
        { node: 1, action: 'call' },
        { node: 1, action: 'return', val: 1 },
        { node: 0, action: 'call' },
        { node: 0, action: 'return', val: 0 },
        { node: 2, action: 'memo', val: 1 },
        { node: 2, action: 'return', val: 1 },
        { node: 1, action: 'call' }, // from 3
        { node: 1, action: 'return', val: 1 },
        { node: 3, action: 'memo', val: 2 },
        { node: 3, action: 'return', val: 2 },
        { node: 2, action: 'call' }, // from 4
        { node: 2, action: 'memo_hit', val: 1 }, // found in memo!
        { node: 4, action: 'memo', val: 3 },
        { node: 4, action: 'return', val: 3 },
        { node: 3, action: 'call' }, // from 5
        { node: 3, action: 'memo_hit', val: 2 }, // found in memo!
        { node: 5, action: 'memo', val: 5 },
        { node: 5, action: 'return', val: 5 },
    ];

    const [memoStepIdx, setMemoStepIdx] = useState(0);

    const resetMemo = () => {
        setMemo({});
        setCallStack([]);
        setActiveCall(null);
        setMemoStepIdx(0);
        setIsPlayingMemo(false);
    };

    const resetTab = () => {
        setTabArr([0, 1]);
        setTabIndex(2);
        setIsPlayingTab(false);
    };

    // Memoization Animation
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlayingMemo && mode === 'memo') {
            timer = setInterval(() => {
                if (memoStepIdx < memoSteps.length) {
                    const step = memoSteps[memoStepIdx];

                    if (step.action === 'call') {
                        setCallStack(prev => [...prev, step.node]);
                        setActiveCall(step.node);
                    } else if (step.action === 'return' || step.action === 'memo_hit') {
                        setCallStack(prev => prev.slice(0, -1));
                        setActiveCall(callStack.length > 1 ? callStack[callStack.length - 2] : null);
                        if (step.action === 'memo_hit') {
                            // blink the memo entry maybe? handled by CSS
                        }
                    } else if (step.action === 'memo') {
                        setMemo(prev => ({ ...prev, [step.node]: step.val! }));
                    }

                    setMemoStepIdx(idx => idx + 1);
                } else {
                    setIsPlayingMemo(false);
                }
            }, 800);
        }
        return () => clearInterval(timer);
    }, [isPlayingMemo, mode, memoStepIdx, callStack]);

    // Tabulation Animation
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlayingTab && mode === 'tab') {
            timer = setInterval(() => {
                if (tabIndex <= fibN) {
                    const nextVal = tabArr[tabIndex - 1] + tabArr[tabIndex - 2];
                    setTabArr(prev => [...prev, nextVal]);
                    setTabIndex(idx => idx + 1);
                } else {
                    setIsPlayingTab(false);
                }
            }, 800);
        }
        return () => clearInterval(timer);
    }, [isPlayingTab, mode, tabIndex, tabArr, fibN]);

    const handlePlayMemo = () => {
        if (memoStepIdx >= memoSteps.length) resetMemo();
        setTimeout(() => setIsPlayingMemo(true), 100);
    };

    const handlePlayTab = () => {
        if (tabIndex > fibN) resetTab();
        setTimeout(() => setIsPlayingTab(true), 100);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex gap-2">
                <button
                    onClick={() => { setMode('memo'); resetMemo(); setIsPlayingTab(false); }}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'memo' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                >
                    Top-Down (Memoization)
                </button>
                <button
                    onClick={() => { setMode('tab'); resetTab(); setIsPlayingMemo(false); }}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'tab' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                >
                    Bottom-Up (Tabulation)
                </button>
            </div>

            <div className="p-8 bg-dot-pattern flex items-center justify-center min-h-[450px] overflow-x-auto">

                {mode === 'memo' ? (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-6 animate-in fade-in duration-300">
                        <div className="text-center mb-2">
                            <h3 className="font-bold text-xl text-indigo-700">Fibonacci(5)</h3>
                            <p className="text-sm text-slate-500 font-mono">Store results of expensive function calls to avoid recalculation.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 w-full items-start justify-center">

                            {/* Call Stack */}
                            <div className="flex-1 max-w-[200px] flex flex-col items-center">
                                <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">Call Stack</h4>
                                <div className="w-full h-64 border-x-4 border-b-4 border-slate-700 rounded-b-lg p-2 flex flex-col-reverse items-center justify-start bg-slate-50 relative">
                                    {callStack.map((node, i) => (
                                        <div key={i} className={`w-full py-1.5 mb-1 text-center font-mono font-bold text-white rounded shadow-sm text-sm transition-all
                                            ${i === callStack.length - 1 ? 'bg-indigo-600 scale-105 shadow-md' : 'bg-indigo-400 opacity-80'}
                                        `}>
                                            fib({node})
                                        </div>
                                    ))}
                                    {callStack.length === 0 && <span className="text-slate-400 font-mono text-xs italic absolute bottom-4">empty</span>}
                                </div>
                            </div>

                            {/* Memoization Cache */}
                            <div className="flex-1 max-w-[250px] flex flex-col items-center">
                                <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">Memo (Cache) -&gt; Hash Map</h4>
                                <div className="w-full bg-white border-2 border-slate-200 rounded-lg shadow-sm min-h-[200px] p-1 flex flex-col gap-1">
                                    <div className="flex bg-slate-100 p-2 font-mono text-xs font-bold text-slate-500 border-b border-slate-200">
                                        <div className="flex-1 text-center">n</div>
                                        <div className="flex-1 text-center">fib(n)</div>
                                    </div>
                                    {Object.entries(memo).map(([k, v]) => (
                                        <div key={k} className="flex p-2 font-mono text-sm bg-emerald-50 rounded border border-emerald-100 animate-in zoom-in duration-300">
                                            <div className="flex-1 text-center font-bold text-emerald-700 border-r border-emerald-200">{k}</div>
                                            <div className="flex-1 text-center text-emerald-900">{v}</div>
                                        </div>
                                    ))}
                                    {Object.keys(memo).length === 0 && (
                                        <div className="p-8 text-center text-slate-400 font-mono text-xs italic">Cache is empty</div>
                                    )}
                                </div>

                                {/* Status text */}
                                <div className="h-8 mt-4">
                                    {memoStepIdx > 0 && memoStepIdx < memoSteps.length && (
                                        <div className="text-sm font-mono font-bold px-3 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 animate-in fade-in">
                                            {memoSteps[memoStepIdx - 1].action === 'call' && `Calling fib(${memoSteps[memoStepIdx - 1].node})`}
                                            {memoSteps[memoStepIdx - 1].action === 'return' && `Return ${memoSteps[memoStepIdx - 1].val} from fib(${memoSteps[memoStepIdx - 1].node})`}
                                            {memoSteps[memoStepIdx - 1].action === 'memo' && `Cache fib(${memoSteps[memoStepIdx - 1].node}) = ${memoSteps[memoStepIdx - 1].val}`}
                                            {memoSteps[memoStepIdx - 1].action === 'memo_hit' && <span className="text-emerald-600">Cache Hit! skip fib({memoSteps[memoStepIdx - 1].node}) eval</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <button
                            onClick={handlePlayMemo}
                            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow flex items-center gap-2 w-48 justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            {memoStepIdx >= memoSteps.length ? 'Reset & Play' : (isPlayingMemo ? 'Running...' : 'Step / Play')}
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-10 animate-in fade-in duration-300">
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-xl text-teal-700">Fibonacci(5)</h3>
                            <p className="text-sm text-slate-500 font-mono">Solve subproblems iteratively from smallest to largest.</p>
                        </div>

                        <div className="relative w-full max-w-lg p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg flex flex-col items-center">

                            <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-8 uppercase self-start">DP Table (Array)</h4>

                            <div className="flex gap-2 mb-8">
                                {Array.from({ length: 6 }).map((_, i) => {
                                    const hasValue = i < tabArr.length;
                                    const isCurrent = i === tabIndex;
                                    const isDependency = isCurrent && (i === tabIndex - 1 || i === tabIndex - 2);

                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="text-xs text-slate-400 font-mono">dp[{i}]</div>
                                            <div className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-xl rounded border-2 transition-all duration-300
                                                ${hasValue ? 'bg-teal-50 border-teal-500 text-teal-800' : 'bg-slate-50 border-slate-300 text-transparent'}
                                                ${isDependency ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
                                                ${isCurrent && isPlayingTab ? 'bg-amber-100 border-amber-500 text-amber-600 animate-pulse' : ''}
                                            `}>
                                                {hasValue ? tabArr[i] : '?'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Expression Graphic */}
                            <div className="h-12 flex items-center justify-center font-mono text-sm font-bold bg-slate-100 px-6 py-2 rounded-lg border border-slate-300">
                                {tabIndex <= fibN ? (
                                    <>
                                        <span className="text-slate-600">dp[{tabIndex}] = </span>
                                        <span className="text-amber-600 mx-2 text-lg">{tabArr[tabIndex - 1]}</span>
                                        <span className="text-slate-600">+</span>
                                        <span className="text-amber-600 mx-2 text-lg">{tabArr[tabIndex - 2]}</span>
                                        <span className="text-slate-600 ml-4">({tabArr[tabIndex - 1] + tabArr[tabIndex - 2]})</span>
                                    </>
                                ) : (
                                    <span className="text-teal-700 text-lg">Result: dp[5] = {tabArr[5]}</span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handlePlayTab}
                            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium shadow flex items-center gap-2 w-48 justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            {tabIndex > fibN ? 'Reset & Play' : (isPlayingTab ? 'Computing...' : 'Step / Play')}
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default DPVisualizer;
