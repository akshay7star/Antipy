'use client';

import React, { useState, useEffect } from 'react';

// A simple static binary tree structure
const treeNodes = [
    { id: 1, val: "A", x: 50, y: 15, left: 2, right: 3 },
    { id: 2, val: "B", x: 25, y: 40, left: 4, right: 5 },
    { id: 3, val: "C", x: 75, y: 40, left: 6, right: 7 },
    { id: 4, val: "D", x: 12.5, y: 70, left: null, right: null },
    { id: 5, val: "E", x: 37.5, y: 70, left: null, right: null },
    { id: 6, val: "F", x: 62.5, y: 70, left: null, right: null },
    { id: 7, val: "G", x: 87.5, y: 70, left: null, right: null }
];

const bfsOrder = [1, 2, 3, 4, 5, 6, 7];
const dfsPreOrder = [1, 2, 4, 5, 3, 6, 7]; // Root, Left, Right

const TreeVisualizer: React.FC = () => {
    const [mode, setMode] = useState<'bfs' | 'dfs'>('bfs');
    const [visited, setVisited] = useState<number[]>([]);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queueOrStack, setQueueOrStack] = useState<number[]>([]); // To show the data structure

    const reset = () => {
        setVisited([]);
        setActiveNode(null);
        setIsPlaying(false);
        setQueueOrStack([]);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPlaying) {
            timer = setInterval(() => {
                const targetOrder = mode === 'bfs' ? bfsOrder : dfsPreOrder;
                const nextIdx = visited.length;

                if (nextIdx < targetOrder.length) {
                    const nextNodeId = targetOrder[nextIdx];
                    setActiveNode(nextNodeId);
                    setVisited(prev => [...prev, nextNodeId]);

                    // Update data structure visualization (simplified pseudo-queue/stack for UI)
                    if (mode === 'bfs') {
                        // Queue behavior (simplified)
                        if (nextIdx === 0) setQueueOrStack([1]);
                        else if (nextIdx === 1) setQueueOrStack([2, 3]);
                        else if (nextIdx === 2) setQueueOrStack([3, 4, 5]);
                        else if (nextIdx === 3) setQueueOrStack([4, 5, 6, 7]);
                        else setQueueOrStack(prev => prev.slice(1));
                    } else {
                        // Stack behavior (simplified)
                        if (nextIdx === 0) setQueueOrStack([1]);
                        else if (nextIdx === 1) setQueueOrStack([3, 2]); // push right then left
                        else if (nextIdx === 2) setQueueOrStack([3, 5, 4]);
                        else if (nextIdx === 3) setQueueOrStack([3, 5]);
                        else if (nextIdx === 4) setQueueOrStack([3]);
                        else if (nextIdx === 5) setQueueOrStack([7, 6]);
                        else if (nextIdx === 6) setQueueOrStack([7]);
                    }

                } else {
                    setActiveNode(null);
                    setIsPlaying(false);
                    setQueueOrStack([]);
                }
            }, 800);
        }

        return () => clearInterval(timer);
    }, [isPlaying, visited, mode]);

    const handlePlay = () => {
        if (visited.length >= 7) {
            reset();
            setTimeout(() => setIsPlaying(true), 100);
        } else {
            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => { setMode('bfs'); reset(); }}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'bfs' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                    >
                        Breadth-First (BFS)
                    </button>
                    <button
                        onClick={() => { setMode('dfs'); reset(); }}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'dfs' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background border border-transparent hover:border-divider text-foreground/70'}`}
                    >
                        Depth-First (DFS)
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handlePlay}
                        disabled={isPlaying}
                        className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium text-sm transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        {visited.length >= 7 ? 'Restart' : 'Play Traversal'}
                    </button>
                </div>
            </div>

            <div className="p-6 bg-dot-pattern flex flex-col items-center overflow-x-auto">

                {/* Information Header */}
                <div className="w-full max-w-2xl flex justify-between items-end mb-6">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">
                            {mode === 'bfs' ? 'Level-Order Traversal (BFS)' : 'Pre-Order Traversal (DFS)'}
                        </h3>
                        <p className="text-sm text-slate-500 font-mono mt-1 h-5">
                            {mode === 'bfs'
                                ? 'Explores level by level using a Queue.'
                                : 'Explores as far down a branch as possible using a Stack.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl items-start justify-center">

                    {/* SVG Tree Representation */}
                    <div className="relative w-full max-w-sm aspect-square bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl p-4 overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">

                            {/* Draw Edges first so they are behind nodes */}
                            {treeNodes.map(node => {
                                const leftChild = node.left ? treeNodes.find(n => n.id === node.left) : null;
                                const rightChild = node.right ? treeNodes.find(n => n.id === node.right) : null;

                                return (
                                    <g key={`edges-${node.id}`}>
                                        {leftChild && (
                                            <line
                                                x1={node.x} y1={node.y}
                                                x2={leftChild.x} y2={leftChild.y}
                                                stroke={visited.includes(leftChild.id) ? '#10b981' : '#334155'}
                                                strokeWidth="1.5"
                                                className="transition-colors duration-500"
                                            />
                                        )}
                                        {rightChild && (
                                            <line
                                                x1={node.x} y1={node.y}
                                                x2={rightChild.x} y2={rightChild.y}
                                                stroke={visited.includes(rightChild.id) ? '#10b981' : '#334155'}
                                                strokeWidth="1.5"
                                                className="transition-colors duration-500"
                                            />
                                        )}
                                    </g>
                                );
                            })}

                            {/* Draw Nodes */}
                            {treeNodes.map(node => {
                                const isVisited = visited.includes(node.id);
                                const isActive = activeNode === node.id;

                                return (
                                    <g key={`node-${node.id}`} className="transition-all duration-300">
                                        <circle
                                            cx={node.x} cy={node.y} r="6"
                                            fill={isActive ? '#fcd34d' : (isVisited ? '#10b981' : '#1e293b')}
                                            stroke={isActive ? '#fbbf24' : (isVisited ? '#059669' : '#475569')}
                                            strokeWidth="1.5"
                                            className="transition-colors duration-300"
                                        />
                                        {isActive && (
                                            <circle
                                                cx={node.x} cy={node.y} r="9"
                                                fill="none" stroke="#fcd34d" strokeWidth="1"
                                                className="animate-ping"
                                            />
                                        )}
                                        <text
                                            x={node.x} y={node.y + 1.5}
                                            textAnchor="middle" alignmentBaseline="middle"
                                            fontSize="5" fontWeight="bold" fontFamily="monospace"
                                            fill={isActive ? '#92400e' : (isVisited ? '#ffffff' : '#94a3b8')}
                                            className="transition-colors duration-300 pointer-events-none"
                                        >
                                            {node.val}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Status Panels */}
                    <div className="flex flex-col gap-6 flex-1 w-full min-w-[250px]">

                        {/* Result Array */}
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">Result Array</h4>
                            <div className="flex gap-1 flex-wrap h-10">
                                {visited.map((id, i) => {
                                    const nodeValue = treeNodes.find(n => n.id === id)?.val;
                                    return (
                                        <div key={i} className="w-8 h-8 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded flex items-center justify-center font-mono font-bold animate-in zoom-in duration-300 shadow-sm">
                                            {nodeValue}
                                        </div>
                                    );
                                })}
                                {visited.length === 0 && (
                                    <div className="text-slate-400 font-mono text-sm italic py-1">[]</div>
                                )}
                            </div>
                        </div>

                        {/* Data Structure Simulation (Queue/Stack) */}
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex-1">
                            <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">
                                {mode === 'bfs' ? 'Queue (FIFO)' : 'Stack (LIFO)'}
                            </h4>
                            <div className="w-full flex justify-start items-center p-3 h-20 bg-slate-50 border-2 border-slate-300 rounded overflow-hidden">
                                {queueOrStack.map((id, i) => {
                                    const nodeValue = treeNodes.find(n => n.id === id)?.val;
                                    return (
                                        <div key={`${i}-${id}`} className={`w-10 h-10 flex-shrink-0 flex items-center justify-center font-mono font-bold text-white shadow rounded transform transition-transform 
                                            ${mode === 'bfs' ? 'bg-blue-500 ml-2' : 'bg-pink-500 -ml-4 first:ml-0 z-10'}
                                        `} style={{ zIndex: 10 - i }}>
                                            {nodeValue}
                                        </div>
                                    );
                                })}
                                {queueOrStack.length === 0 && (
                                    <div className="text-slate-400 font-mono text-sm w-full text-center italic">Empty</div>
                                )}
                            </div>

                            <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-700 text-xs font-mono text-slate-300">
                                {mode === 'bfs' ? (
                                    <>
                                        <div className="text-blue-400 font-bold mb-1">def bfs(root):</div>
                                        <div className="pl-2">queue = [root]</div>
                                        <div className="pl-2">while queue:</div>
                                        <div className="pl-4">node = queue.pop(0)</div>
                                        <div className="pl-4 text-emerald-400"># Visit node</div>
                                        <div className="pl-4">queue.append(node.left)</div>
                                        <div className="pl-4">queue.append(node.right)</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-pink-400 font-bold mb-1">def dfs_preorder(node):</div>
                                        <div className="pl-2">if not node: return</div>
                                        <div className="pl-2 text-emerald-400"># Visit node</div>
                                        <div className="pl-2">dfs_preorder(node.left)</div>
                                        <div className="pl-2">dfs_preorder(node.right)</div>
                                        <div className="mt-1 text-slate-500 italic"># Recursion uses the call stack</div>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default TreeVisualizer;
