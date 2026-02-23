'use client';

import React, { useState, useEffect } from 'react';

const TwoPointersVisualizer: React.FC = () => {
    const [mode, setMode] = useState<'opposite' | 'sliding'>('opposite');

    // Reverse String State
    const [revStr, setRevStr] = useState("HELLO");
    const revArr = revStr.split('');
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(revArr.length - 1);
    const [isPlayingRev, setIsPlayingRev] = useState(false);

    // Sliding Window State
    const windowArr = [2, 1, 5, 1, 3, 2];
    const k = 3;
    const [winStart, setWinStart] = useState(0);
    const [winEnd, setWinEnd] = useState(k - 1);
    const [maxSum, setMaxSum] = useState(8);
    const [currentSum, setCurrentSum] = useState(8);
    const [isPlayingWin, setIsPlayingWin] = useState(false);

    // Reverse Animation Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlayingRev) {
            timer = setInterval(() => {
                if (left < right) {
                    // Swap
                    const newArr = [...revArr];
                    const temp = newArr[left];
                    newArr[left] = newArr[right];
                    newArr[right] = temp;
                    setRevStr(newArr.join(''));

                    setTimeout(() => {
                        setLeft(l => l + 1);
                        setRight(r => r - 1);
                    }, 500);
                } else {
                    setIsPlayingRev(false);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPlayingRev, left, right, revArr]);

    // Sliding Window Animation Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlayingWin) {
            timer = setInterval(() => {
                if (winEnd < windowArr.length - 1) {
                    const nextEnd = winEnd + 1;
                    const nextStart = winStart + 1;

                    const nextSum = currentSum - windowArr[winStart] + windowArr[nextEnd];

                    setWinStart(nextStart);
                    setWinEnd(nextEnd);
                    setCurrentSum(nextSum);
                    setMaxSum(prev => Math.max(prev, nextSum));
                } else {
                    setIsPlayingWin(false);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPlayingWin, winStart, winEnd, currentSum]);

    const handlePlayReverse = () => {
        if (left >= right) {
            setRevStr("HELLO");
            setLeft(0);
            setRight(4);
            setTimeout(() => setIsPlayingRev(true), 100);
        } else {
            setIsPlayingRev(true);
        }
    };

    const handlePlaySliding = () => {
        if (winEnd >= windowArr.length - 1) {
            setWinStart(0);
            setWinEnd(k - 1);
            setCurrentSum(8);
            setMaxSum(8);
            setTimeout(() => setIsPlayingWin(true), 100);
        } else {
            setIsPlayingWin(true);
        }
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex gap-2">
                <button
                    onClick={() => { setMode('opposite'); setIsPlayingWin(false); }}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'opposite' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                >
                    Opposite Ends (Reverse)
                </button>
                <button
                    onClick={() => { setMode('sliding'); setIsPlayingRev(false); }}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'sliding' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                >
                    Sliding Window (Max Subarray)
                </button>
            </div>

            <div className="p-8 bg-dot-pattern flex flex-col items-center justify-center min-h-[300px] overflow-x-auto">

                {mode === 'opposite' ? (
                    <div className="w-full max-w-lg flex flex-col items-center gap-8 animate-in fade-in duration-300">
                        <div className="text-sm font-mono text-slate-500 mb-2">Reverse a string in-place O(N) time, O(1) space</div>

                        <div className="flex gap-2">
                            {revArr.map((char, i) => {
                                const isTarget = i === left || i === right;
                                const isDone = left >= right && (i <= left && i >= right); // rough heuristic

                                return (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        {/* Top Pointers */}
                                        <div className="h-6">
                                            {i === left && <div className="text-blue-500 font-mono text-xs font-bold animate-bounce mt-1">L &darr;</div>}
                                            {i === right && <div className="text-red-500 font-mono text-xs font-bold animate-bounce mt-1">R &darr;</div>}
                                        </div>

                                        {/* Value Box */}
                                        <div className={`w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded border-2 transition-all duration-300
                                            ${isTarget ? (i === left ? 'border-blue-500 bg-blue-50 text-blue-700 -translate-y-1 shadow-md' : 'border-red-500 bg-red-50 text-red-700 translate-y-1 shadow-md') : 'border-slate-300 bg-white text-slate-800'}
                                            ${left > right ? 'border-green-500 bg-green-50 text-green-700' : ''}
                                        `}>
                                            {char}
                                        </div>

                                        {/* Bottom Index */}
                                        <div className="text-xs text-slate-400 font-mono">{i}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={handlePlayReverse}
                            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            {left >= right ? 'Reset & Play' : (isPlayingRev ? 'Playing...' : 'Step / Play')}
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-xl flex flex-col items-center gap-8 animate-in fade-in duration-300">
                        <div className="text-sm font-mono text-slate-500 mb-2">Find Max Sum of Subarray Size K=3</div>

                        <div className="flex gap-2 relative p-4">
                            {windowArr.map((val, i) => {
                                const inWindow = i >= winStart && i <= winEnd;

                                return (
                                    <div key={i} className="flex flex-col items-center gap-2 z-10">
                                        <div className={`w-12 h-12 flex items-center justify-center text-xl font-bold font-mono rounded transition-all duration-300
                                            ${inWindow ? 'border-2 border-indigo-600 bg-indigo-100 text-indigo-900 shadow-md transform scale-105' : 'border border-slate-300 bg-white text-slate-500'}
                                        `}>
                                            {val}
                                        </div>
                                        <div className="text-xs text-slate-400 font-mono">{i}</div>
                                    </div>
                                );
                            })}

                            {/* Window Highlight Box */}
                            <div
                                className="absolute h-16 bg-indigo-500/10 border-2 border-indigo-400/50 rounded-lg pointer-events-none transition-all duration-500 ease-in-out z-0 top-3"
                                style={{
                                    left: `${winStart * 56 + 12}px`, // 48px width + 8px gap = 56px per item
                                    width: `${k * 56 - 8}px`,
                                }}
                            />
                        </div>

                        <div className="flex justify-around w-full max-w-sm mt-4 p-4 bg-slate-900 rounded-lg shadow-inner font-mono border border-slate-700">
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400 text-xs">Current Sum</span>
                                <span className="text-2xl text-blue-400 font-bold">{currentSum}</span>
                            </div>
                            <div className="w-px bg-slate-700"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400 text-xs">Max So Far</span>
                                <span className="text-2xl text-green-400 font-bold">{maxSum}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaySliding}
                            className="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            {winEnd >= windowArr.length - 1 ? 'Reset & Play' : (isPlayingWin ? 'Sliding...' : 'Slide Window')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwoPointersVisualizer;
