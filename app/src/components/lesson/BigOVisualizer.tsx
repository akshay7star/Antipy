'use client';

import React, { useState } from 'react';

type BigOType = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n^2)' | 'O(2^n)';

interface BigOData {
    name: BigOType;
    color: string;
    description: string;
    example: string;
    calc: (n: number) => number;
}

const complexities: Record<BigOType, BigOData> = {
    'O(1)': {
        name: 'O(1)', color: '#10b981',
        description: 'Constant Time. Execution time does not depend on data size.',
        example: 'Array lookup, Dict lookup',
        calc: () => 10
    },
    'O(log n)': {
        name: 'O(log n)', color: '#06b6d4',
        description: 'Logarithmic Time. Usually halves the dataset each step.',
        example: 'Binary Search',
        calc: (n) => Math.log2(n || 1) * 15 + 10
    },
    'O(n)': {
        name: 'O(n)', color: '#3b82f6',
        description: 'Linear Time. Execution time scales directly with data size.',
        example: 'Single Loop, Searching un-sorted array',
        calc: (n) => (n / 10) * 15 + 10
    },
    'O(n log n)': {
        name: 'O(n log n)', color: '#eab308',
        description: 'Linearithmic Time. Usually divide-and-conquer algorithms.',
        example: 'Merge Sort, Quick Sort (avg)',
        calc: (n) => ((n / 10) * Math.log2(n || 1)) * 3 + 10
    },
    'O(n^2)': {
        name: 'O(n^2)', color: '#f97316',
        description: 'Quadratic Time. Nested loops. Gets very slow very fast.',
        example: 'Bubble Sort, Selection Sort',
        calc: (n) => Math.pow(n / 10, 2) * 2 + 10
    },
    'O(2^n)': {
        name: 'O(2^n)', color: '#ef4444',
        description: 'Exponential Time. Computes all subsets/combinations.',
        example: 'Recursive Fibonacci',
        calc: (n) => Math.pow(2, (n / 20)) + 10
    }
};

const BigOVisualizer: React.FC = () => {
    const [selected, setSelected] = useState<BigOType[]>(['O(n)']);
    const [elements, setElements] = useState(50);

    // SVG graph configuration
    const width = 600;
    const height = 300;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const generatePath = (complexity: BigOData) => {
        let points = [];
        for (let x = 0; x <= 100; x += 5) {
            // Map x (0-100) to graph width
            const plotX = padding + (x / 100) * graphWidth;

            // Calculate y based on complexity formula
            let yVal = complexity.calc(x);

            // Cap y to prevent drawing out of bounds (cap at 100 value = graphHeight)
            const cappedY = Math.min(yVal, 100);

            // Map y to graph height (inverted because SVG 0,0 is top-left)
            const plotY = height - padding - (cappedY / 100) * graphHeight;

            points.push(`${plotX},${plotY}`);
        }
        return `M ${points.join(' L ')}`;
    };

    const toggleComplexity = (c: BigOType) => {
        setSelected(prev =>
            prev.includes(c)
                ? prev.filter(x => x !== c)
                : [...prev, c]
        );
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col md:flex-row gap-6">

                <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-3 text-foreground/80">Select Complexities to Compare</h3>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(complexities) as BigOType[]).map(c => {
                            const isSelected = selected.includes(c);
                            const data = complexities[c];
                            return (
                                <button
                                    key={c}
                                    onClick={() => toggleComplexity(c)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${isSelected ? 'shadow-sm text-white' : 'bg-background hover:bg-background-alt border border-divider text-foreground/60'}`}
                                    style={{
                                        backgroundColor: isSelected ? data.color : undefined,
                                        borderColor: isSelected ? data.color : undefined
                                    }}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full md:w-64 bg-background rounded-lg border border-divider p-3">
                    <div className="flex justify-between items-center mb-1 text-sm font-medium">
                        <span>Input Size (N):</span>
                        <span className="font-mono text-primary font-bold">{elements}</span>
                    </div>
                    <input
                        type="range"
                        min="1" max="100"
                        value={elements}
                        onChange={(e) => setElements(parseInt(e.target.value))}
                        className="w-full accent-primary"
                    />
                </div>
            </div>

            <div >

                {/* SVG Graph */}
                <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl p-4 shadow-xl relative overflow-hidden">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-lg">
                        {/* Grid lines */}
                        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#334155" strokeWidth="2" />
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="2" />

                        {/* Labels */}
                        <text x={padding - 10} y={padding + 10} fill="#64748b" fontSize="12" textAnchor="end" fontFamily="monospace">Time / Ops</text>
                        <text x={width - padding} y={height - padding + 20} fill="#64748b" fontSize="12" textAnchor="middle" fontFamily="monospace">Input Size (N)</text>
                        <text x={padding} y={height - padding + 20} fill="#64748b" fontSize="12" textAnchor="middle" fontFamily="monospace">0</text>

                        {/* Dynamic Grid lines mapping to Input Size */}
                        <line x1={padding + (elements / 100) * graphWidth} y1={padding} x2={padding + (elements / 100) * graphWidth} y2={height - padding} stroke="#475569" strokeWidth="1" strokeDasharray="5,5" />

                        {/* Paths */}
                        {(Object.keys(complexities) as BigOType[]).map(c => {
                            if (!selected.includes(c)) return null;
                            const data = complexities[c];
                            return (
                                <path
                                    key={c}
                                    d={generatePath(data)}
                                    fill="none"
                                    stroke={data.color}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    className="drop-shadow-sm transition-all duration-300 ease-in-out"
                                />
                            );
                        })}

                        {/* Current Value Dots */}
                        {(Object.keys(complexities) as BigOType[]).map(c => {
                            if (!selected.includes(c)) return null;
                            const data = complexities[c];
                            const plotX = padding + (elements / 100) * graphWidth;
                            const yVal = data.calc(elements);
                            if (yVal > 100) return null; // Dot went offscreen

                            const plotY = height - padding - (yVal / 100) * graphHeight;

                            return (
                                <g key={`dot-${c}`}>
                                    <circle cx={plotX} cy={plotY} r="5" fill={data.color} />
                                    <circle cx={plotX} cy={plotY} r="10" fill="none" stroke={data.color} className="animate-ping" opacity="0.5" />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Hover info / Details Box below graph */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {selected.map(c => {
                            const data = complexities[c];
                            const ops = Math.floor(data.calc(elements));
                            const danger = ops > 90;

                            return (
                                <div key={c} className="bg-slate-800 border-l-4 rounded p-2 text-sm shadow animate-in fade-in" style={{ borderLeftColor: data.color }}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-mono font-bold text-slate-200">{c}</span>
                                        <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${danger ? 'bg-red-900/50 text-red-300' : 'bg-slate-900 text-slate-400'}`}>
                                            {danger ? '> MAX ops' : `${ops} ops`}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400 truncate">{data.example}</div>
                                </div>
                            );
                        })}
                        {selected.length === 0 && (
                            <div className="col-span-full text-center text-slate-500 py-4 text-sm font-mono italic">
                                Select complexities to view their curves
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BigOVisualizer;
