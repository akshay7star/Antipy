"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, RotateCcw, Play, ArrowRight, ArrowLeft } from "lucide-react";

interface LLNode {
    id: string;
    value: number;
    next: string | null;
}

interface Pointer {
    name: string;
    targetId: string | null;
    color: string;
}

const DURATION_MS = 800;

export function LinkedListVisualizer() {
    // We store the nodes in an array for easy rendering, but link them logically
    const [nodes, setNodes] = useState<LLNode[]>([]);
    const [headId, setHeadId] = useState<string | null>(null);
    const [pointers, setPointers] = useState<Pointer[]>([
        { name: "head", targetId: null, color: "text-blue-500 tracking-wider" }
    ]);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextIdRef = useRef(1);

    // Initialize with a few nodes
    useEffect(() => {
        resetList();
    }, []);

    const resetList = () => {
        const initialNodes: LLNode[] = [
            { id: "n1", value: 42, next: "n2" },
            { id: "n2", value: 15, next: "n3" },
            { id: "n3", value: 8, next: null }
        ];
        setNodes(initialNodes);
        setHeadId("n1");
        setPointers([
            { name: "head", targetId: "n1", color: "text-blue-500 bg-blue-500/10 border-blue-500/50" }
        ]);
        setIsAnimating(false);
        nextIdRef.current = 4;
    };

    const generateValue = () => Math.floor(Math.random() * 99) + 1;

    const appendNode = () => {
        if (isAnimating) return;
        const newId = `n${nextIdRef.current++}`;
        const newNode: LLNode = { id: newId, value: generateValue(), next: null };

        let currNodes = [...nodes];
        if (!headId) {
            setHeadId(newId);
            currNodes.push(newNode);
            setPointers([{ name: "head", targetId: newId, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" }]);
        } else {
            // Find logical tail and link
            let currId: string | null = headId;
            let lastId = headId;
            while (currId) {
                lastId = currId;
                const node = currNodes.find(n => n.id === currId);
                currId = node?.next || null;
            }

            // Update last node's next
            currNodes = currNodes.map(n => n.id === lastId ? { ...n, next: newId } : n);
            currNodes.push(newNode);
        }
        setNodes(currNodes);
    };

    const prependNode = () => {
        if (isAnimating) return;
        const newId = `n${nextIdRef.current++}`;
        const newNode: LLNode = { id: newId, value: generateValue(), next: headId };

        setNodes([...nodes, newNode]);
        setHeadId(newId);
        setPointers([{ name: "head", targetId: newId, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" }]);
    };

    const deleteTail = () => {
        if (isAnimating || !headId) return;

        let currNodes = [...nodes];
        let currId: string | null = headId;
        let prevId: string | null = null;

        const nodeObj = currNodes.find(n => n.id === currId);
        if (!nodeObj?.next) {
            // Only one node
            setNodes([]);
            setHeadId(null);
            setPointers([{ name: "head", targetId: null, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" }]);
            return;
        }

        while (currId) {
            const nextNode = currNodes.find(n => n.id === currId)?.next;
            if (!nextNode) break; // found tail
            prevId = currId;
            currId = nextNode;
        }

        if (prevId) {
            currNodes = currNodes.map(n => n.id === prevId ? { ...n, next: null } : n);
            currNodes = currNodes.filter(n => n.id !== currId);
            setNodes(currNodes);
        }
    };

    // --- REVERSE ANIMATION GENERATOR ---
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const reverseList = async () => {
        if (isAnimating || !headId) return;
        setIsAnimating(true);

        let prev: string | null = null;
        let curr: string | null = headId;
        let next: string | null = null;
        let currentNodes = [...nodes];

        // Initial setup
        setPointers([
            { name: "head", targetId: headId, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" },
            { name: "prev", targetId: null, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/50" },
            { name: "curr", targetId: curr, color: "text-green-500 bg-green-500/10 border-green-500/50" },
            { name: "next", targetId: null, color: "text-purple-500 bg-purple-500/10 border-purple-500/50" }
        ]);

        await sleep(DURATION_MS);

        while (curr !== null) {
            const currNode = currentNodes.find(n => n.id === curr);
            next = currNode?.next || null;

            setPointers([
                { name: "head", targetId: headId, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" },
                { name: "prev", targetId: prev, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/50" },
                { name: "curr", targetId: curr, color: "text-green-500 bg-green-500/10 border-green-500/50" },
                { name: "next", targetId: next, color: "text-purple-500 bg-purple-500/10 border-purple-500/50" }
            ]);
            await sleep(DURATION_MS);

            // Reverse the link
            currentNodes = currentNodes.map(n => n.id === curr ? { ...n, next: prev } : n);
            setNodes([...currentNodes]);
            await sleep(DURATION_MS);

            // Move pointers forward
            prev = curr;
            curr = next;

            setPointers([
                { name: "head", targetId: headId, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" },
                { name: "prev", targetId: prev, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/50" },
                { name: "curr", targetId: curr, color: "text-green-500 bg-green-500/10 border-green-500/50" },
                { name: "next", targetId: next, color: "text-purple-500 bg-purple-500/10 border-purple-500/50" }
            ]);
            await sleep(DURATION_MS);
        }

        // Finalize
        setHeadId(prev);
        setPointers([
            { name: "head", targetId: prev, color: "text-blue-500 bg-blue-500/10 border-blue-500/50" }
        ]);
        setIsAnimating(false);
    };

    // Helper to get nodes in logical order for rendering
    const getLogicalNodes = () => {
        const ordered: LLNode[] = [];
        let curr = headId;
        const visited = new Set<string>(); // Prevent infinite loops if mangled

        while (curr && !visited.has(curr)) {
            const node = nodes.find(n => n.id === curr);
            if (node) {
                ordered.push(node);
                visited.add(curr);
                curr = node.next;
            } else {
                break;
            }
        }
        return ordered;
    };

    const logicalNodes = getLogicalNodes();

    return (
        <div className="my-8 rounded-xl border border-border/50 bg-card p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent m-0">
                        Linked List Visualizer
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Interact with nodes and visualize pointer manipulation.
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={prependNode}
                        disabled={isAnimating || nodes.length >= 7}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-border/50 rounded-md text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-3.5 h-3.5" /> Prepend
                    </button>
                    <button
                        onClick={appendNode}
                        disabled={isAnimating || nodes.length >= 7}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-border/50 rounded-md text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-3.5 h-3.5" /> Append
                    </button>
                    <button
                        onClick={deleteTail}
                        disabled={isAnimating || nodes.length === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-border/50 rounded-md text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <button
                        onClick={resetList}
                        disabled={isAnimating}
                        className="p-1.5 bg-zinc-100 dark:bg-zinc-800 border border-border/50 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                        title="Reset List"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="relative min-h-[160px] flex items-center mb-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-6 border border-border/50 overflow-x-auto">
                <div className="flex items-center gap-1 mx-auto pb-8 pt-4">
                    {logicalNodes.length === 0 && (
                        <div className="text-muted-foreground italic text-sm">List is empty. Add a node to begin.</div>
                    )}

                    {logicalNodes.map((node, index) => {
                        const activePointers = pointers.filter(p => p.targetId === node.id);
                        const isReversedArrow = isAnimating && node.next && logicalNodes.findIndex(n => n.id === node.next) < index;

                        return (
                            <div key={node.id} className="flex items-center">
                                {/* The Node */}
                                <div className="relative flex flex-col items-center">
                                    {/* Pointers mapping above the node */}
                                    <div className="absolute -top-10 flex flex-col gap-1 items-center">
                                        {activePointers.map(p => (
                                            <span key={p.name} className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${p.color}`}>
                                                {p.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="w-14 h-14 bg-white dark:bg-zinc-800 border-2 border-primary/40 rounded-md shadow-sm flex items-center justify-center font-bold text-lg font-mono z-10">
                                        {node.value}
                                    </div>
                                    <div className="text-[10px] text-zinc-400 mt-1 absolute -bottom-5">
                                        {node.id}
                                    </div>
                                </div>

                                {/* The Link (Arrow) */}
                                {index < logicalNodes.length - 1 && (
                                    <div className="flex flex-col items-center justify-center w-8 md:w-12 text-zinc-400">
                                        {isReversedArrow ? (
                                            <ArrowLeft className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                                        ) : (
                                            <ArrowRight className="w-5 h-5" strokeWidth={2} />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Null Terminator */}
                    {logicalNodes.length > 0 && (
                        <div className="flex items-center">
                            <div className="flex flex-col items-center justify-center w-8 md:w-12 text-zinc-400">
                                <ArrowRight className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="w-12 h-10 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-md flex items-center justify-center text-xs font-mono text-zinc-400">
                                null
                            </div>

                            {/* Pointers targeting null (like end of reverse) */}
                            <div className="relative flex flex-col items-center ml-2">
                                <div className="absolute -top-6 flex flex-col gap-1 items-center whitespace-nowrap">
                                    {pointers.filter(p => p.targetId === null).map(p => (
                                        <span key={p.name} className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${p.color}`}>
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Major Operations */}
            <div className="flex justify-center">
                <button
                    onClick={reverseList}
                    disabled={isAnimating || logicalNodes.length < 2}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    <Play className="w-4 h-4" fill="currentColor" />
                    Animate: Reverse List
                </button>
            </div>
        </div>
    );
}

