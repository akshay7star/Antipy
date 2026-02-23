'use client';

import React, { useState, useEffect } from 'react';

// Simple deterministic hash for visualization
const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit int
    }
    return Math.abs(hash);
};

interface HashEntry {
    key: string;
    value: string;
    hash: number;
    bucket: number;
}

const HashMapVisualizer: React.FC = () => {
    const buckets = 8;
    const [entries, setEntries] = useState<HashEntry[]>([]);
    const [inputKey, setInputKey] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Animation state
    const [animatingStep, setAnimatingStep] = useState(0);
    /* Steps:
        0: idle
        1: hashing (show key -> hash code)
        2: modulo (show hash code % buckets -> bucket array)
        3: placement (move to bucket)
        4: collision? (handling open addressing/chaining visually)
    */
    const [currentAnimEntry, setCurrentAnimEntry] = useState<HashEntry | null>(null);

    const handleInsert = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputKey || animatingStep !== 0) return;

        const hash = hashString(inputKey);
        const bucket = hash % buckets;

        const newEntry: HashEntry = { key: inputKey, value: inputValue || "null", hash, bucket };
        setCurrentAnimEntry(newEntry);
        setAnimatingStep(1);

        setInputKey('');
        setInputValue('');
    };

    const handleClear = () => {
        setEntries([]);
        setAnimatingStep(0);
        setCurrentAnimEntry(null);
    };

    useEffect(() => {
        if (animatingStep === 0 || !currentAnimEntry) return;

        let timer: NodeJS.Timeout;
        if (animatingStep === 1) {
            timer = setTimeout(() => setAnimatingStep(2), 1000); // 1s to show hash
        } else if (animatingStep === 2) {
            timer = setTimeout(() => setAnimatingStep(3), 1000); // 1s to show modulo
        } else if (animatingStep === 3) {
            timer = setTimeout(() => {
                // Determine collision
                const exists = entries.find(e => e.key === currentAnimEntry.key);
                if (exists) {
                    setEntries(prev => prev.map(e => e.key === currentAnimEntry.key ? currentAnimEntry : e));
                } else {
                    setEntries(prev => [...prev, currentAnimEntry]);
                }
                setAnimatingStep(0);
                setCurrentAnimEntry(null);
            }, 800); // 0.8s to place
        }

        return () => clearTimeout(timer);
    }, [animatingStep, currentAnimEntry, entries]);

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider">
                <form onSubmit={handleInsert} className="flex flex-wrap gap-2 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono text-slate-500">Key (String)</label>
                        <input
                            value={inputKey} onChange={e => setInputKey(e.target.value)}
                            placeholder='"apple"' maxLength={12}
                            disabled={animatingStep !== 0}
                            className="px-3 py-1.5 rounded border border-divider bg-background text-sm font-mono w-28 md:w-36 focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-mono text-slate-500">Value (Optional)</label>
                        <input
                            value={inputValue} onChange={e => setInputValue(e.target.value)}
                            placeholder='5' maxLength={12}
                            disabled={animatingStep !== 0}
                            className="px-3 py-1.5 rounded border border-divider bg-background text-sm font-mono w-28 md:w-36 focus:outline-none focus:border-primary"
                        />
                    </div>
                    <button
                        type="submit" disabled={!inputKey || animatingStep !== 0}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded font-medium text-sm transition-colors shadow-sm ml-2 h-9"
                    >
                        Insert / Update
                    </button>
                    <div className="flex-1"></div>
                    <button
                        type="button" onClick={handleClear} disabled={animatingStep !== 0 || entries.length === 0}
                        className="px-4 py-1.5 border border-divider hover:bg-slate-100 disabled:opacity-50 rounded text-sm transition-colors h-9"
                    >
                        Clear Map
                    </button>
                </form>
            </div>

            <div className="p-6 bg-dot-pattern flex flex-col items-center justify-center min-h-[450px] relative overflow-x-auto">

                {/* Animation Overlay Area */}
                <div className="h-32 w-full flex flex-col items-center justify-center relative mb-8">
                    {animatingStep > 0 && currentAnimEntry && (
                        <div className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-300">

                            {/* Step 1: Hashing */}
                            <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl shadow-lg border-2 border-indigo-400 z-10">
                                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 rounded">
                                    "{currentAnimEntry.key}"
                                </span>

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animatingStep === 1 ? 'animate-pulse' : ''}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>

                                <span className="font-mono font-bold text-slate-700">
                                    hash()
                                </span>

                                {animatingStep >= 1 && (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                        <span className="font-mono text-purple-600 font-bold bg-purple-50 px-2 rounded animate-in zoom-in duration-300">
                                            {currentAnimEntry.hash}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Step 2: Modulo */}
                            {animatingStep >= 2 && (
                                <div className="mt-4 flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow border border-purple-200 animate-in slide-in-from-top-2 fade-in">
                                    <span className="font-mono text-xs text-slate-500">bucket index = </span>
                                    <span className="font-mono text-sm font-bold">{currentAnimEntry.hash}</span>
                                    <span className="font-mono text-xs font-bold text-pink-500 bg-pink-50 px-1">% {buckets}</span>
                                    <span className="font-mono text-sm">=</span>
                                    <span className="font-mono text-lg font-bold text-pink-600 drop-shadow">
                                        {currentAnimEntry.bucket}
                                    </span>
                                </div>
                            )}

                        </div>
                    )}

                    {animatingStep === 0 && (
                        <div className="text-slate-400 font-mono text-sm italic">
                            Enter a key-value pair to visualize hashing
                        </div>
                    )}
                </div>

                {/* Buckets Array */}
                <div className="w-full max-w-4xl border-t-4 border-slate-800 pt-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white font-mono text-xs px-3 py-1 rounded-full font-bold shadow-md tracking-widest">
                        MEMORY ARRAY (SIZE {buckets})
                    </div>

                    <div className="flex justify-center gap-1 md:gap-3 flex-wrap">
                        {Array.from({ length: buckets }).map((_, bucketIdx) => {
                            // Find all entries in this bucket (chaining)
                            const bucketEntries = entries.filter(e => e.bucket === bucketIdx);
                            const isTargetBucket = animatingStep === 3 && currentAnimEntry?.bucket === bucketIdx;

                            return (
                                <div key={bucketIdx} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 md:w-16 md:h-16 border-2 rounded-t-lg flex flex-col justify-end pb-1 items-center transition-all duration-300 relative
                                        ${isTargetBucket ? 'border-pink-500 bg-pink-100 shadow-[0_0_15px_rgba(236,72,153,0.5)] transform -translate-y-2' : 'border-slate-300 bg-slate-50'}
                                    `}>
                                        <div className="text-[10px] text-slate-400 font-mono font-bold absolute top-1 left-2">
                                            [{bucketIdx}]
                                        </div>
                                        {bucketEntries.length === 0 && !isTargetBucket ? (
                                            <div className="text-xs font-mono text-slate-300">null</div>
                                        ) : null}

                                        {/* Down Arrow for Chaining */}
                                        {bucketEntries.length > 0 && (
                                            <div className="w-1 h-3 bg-slate-300 mt-4 rounded"></div>
                                        )}
                                    </div>

                                    {/* Chained Entries */}
                                    <div className="flex flex-col gap-2 mt-2 w-full max-w-[100px]">
                                        {bucketEntries.map((entry, i) => (
                                            <div key={`${entry.key}-${i}`} className="bg-indigo-600 flex flex-col rounded shadow-md overflow-hidden animate-in zoom-in duration-300">
                                                <div className="bg-indigo-700 px-2 py-1 text-[10px] text-indigo-100 font-mono truncate border-b border-indigo-500" title={entry.key}>
                                                    k: {entry.key}
                                                </div>
                                                <div className="px-2 py-1 text-xs text-white font-mono font-bold truncate text-center" title={entry.value}>
                                                    {entry.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900 border border-slate-700 p-3 rounded shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
                        <span className="text-xs text-slate-300 font-mono">Linked List Node</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono leading-tight max-w-[150px]">
                        Collisions are handled via chaining (Linked Lists). Multiple keys hash to the same bucket.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HashMapVisualizer;
