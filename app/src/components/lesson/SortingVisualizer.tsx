"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

type AlgorithmType = "Bubble Sort" | "Selection Sort" | "Insertion Sort" | "Quick Sort" | "Merge Sort";

interface ArrayElement {
    value: number;
    state: "default" | "comparing" | "swapping" | "sorted";
}

const ARRAY_SIZE = 15;
const MIN_VALUE = 10;
const MAX_VALUE = 100;
const DURATION_MS = 200;

export function SortingVisualizer() {
    const [array, setArray] = useState<ArrayElement[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("Bubble Sort");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    // Use refs to store the generator so we can step through it
    const generatorRef = useRef<Generator<ArrayElement[], void, unknown> | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize array on mount
    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        // Stop any running animations
        pause();
        generatorRef.current = null;

        const newArray: ArrayElement[] = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            newArray.push({
                value: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
                state: "default"
            });
        }
        setArray(newArray);
        setIsSorted(false);
    };

    // --- SORTING GENERATORS ---
    // Using generators allows us to easily pause, play, and step through the algorithm
    // each yield returns the entire new array state.

    function* bubbleSortGenerator(initialArray: ArrayElement[]): Generator<ArrayElement[], void, unknown> {
        let arr = [...initialArray];
        let n = arr.length;
        let sortedCount = 0;

        for (let i = 0; i < n; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                // Mark as comparing
                arr = arr.map((item, idx) => ({
                    ...item,
                    state: idx === j || idx === j + 1 ? "comparing" : (idx >= n - sortedCount ? "sorted" : "default")
                }));
                yield arr;

                if (arr[j].value > arr[j + 1].value) {
                    // Mark as swapping
                    arr = arr.map((item, idx) => ({
                        ...item,
                        state: idx === j || idx === j + 1 ? "swapping" : (idx >= n - sortedCount ? "sorted" : "default")
                    }));
                    yield arr;

                    // Execute swap
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // Mark the last element of this pass as sorted
            sortedCount++;
            arr = arr.map((item, idx) => ({
                ...item,
                state: idx >= n - sortedCount ? "sorted" : "default"
            }));
            yield arr;

            if (!swapped) break;
        }

        // Final pass to mark everything sorted
        arr = arr.map(item => ({ ...item, state: "sorted" }));
        yield arr;
    }

    function* selectionSortGenerator(initialArray: ArrayElement[]): Generator<ArrayElement[], void, unknown> {
        let arr = [...initialArray];
        let n = arr.length;

        for (let i = 0; i < n; i++) {
            let minIdx = i;

            for (let j = i + 1; j < n; j++) {
                // Visualize comparison
                arr = arr.map((item, idx) => ({
                    ...item,
                    state: idx < i ? "sorted" : (idx === minIdx || idx === j ? "comparing" : "default")
                }));
                yield arr;

                if (arr[j].value < arr[minIdx].value) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                // Visualize swap
                arr = arr.map((item, idx) => ({
                    ...item,
                    state: idx < i ? "sorted" : (idx === i || idx === minIdx ? "swapping" : "default")
                }));
                yield arr;

                let temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }

            // Mark ith element as sorted
            arr = arr.map((item, idx) => ({
                ...item,
                state: idx <= i ? "sorted" : "default"
            }));
            yield arr;
        }

        arr = arr.map(item => ({ ...item, state: "sorted" }));
        yield arr;
    }

    function* insertionSortGenerator(initialArray: ArrayElement[]): Generator<ArrayElement[], void, unknown> {
        let arr = [...initialArray];
        let n = arr.length;

        // First element is trivially sorted
        arr[0].state = "sorted";
        yield arr;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            // Highlight the element we are trying to place
            arr[i].state = "comparing";
            yield arr;

            while (j >= 0 && arr[j].value > key.value) {
                // Show comparison/shift
                arr[j].state = "swapping";
                arr[j + 1].state = "swapping";
                yield arr;

                arr[j + 1] = arr[j];

                // Return shifted down element to sorted state
                arr[j + 1].state = "sorted";
                j = j - 1;
            }
            arr[j + 1] = key;

            // Mark everything up to i as sorted
            arr = arr.map((item, idx) => ({
                ...item,
                state: idx <= i ? "sorted" : "default"
            }));
            yield arr;
        }

        arr = arr.map(item => ({ ...item, state: "sorted" }));
        yield arr;
    }

    function* quickSortGenerator(initialArray: ArrayElement[]): Generator<ArrayElement[], void, unknown> {
        let arr = initialArray.map(x => ({ ...x }));
        let n = arr.length;

        // Helper function for the generator to yield states
        function* partition(low: number, high: number): Generator<ArrayElement[], number, unknown> {
            let pivot = arr[high].value;
            // Mark pivot
            arr[high].state = "comparing";
            yield [...arr];

            let i = low - 1;

            for (let j = low; j <= high - 1; j++) {
                // Highlight current element being compared to pivot
                arr[j].state = "comparing";
                yield [...arr];

                if (arr[j].value < pivot) {
                    i++;
                    // Highlight swap
                    arr[i].state = "swapping";
                    arr[j].state = "swapping";
                    yield [...arr];

                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;

                    // Return to default
                    arr[i].state = "default";
                    arr[j].state = "default";
                } else {
                    arr[j].state = "default";
                }
            }

            // Swap pivot into correct place
            arr[i + 1].state = "swapping";
            arr[high].state = "swapping";
            yield [...arr];

            let temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;

            // Pivot is now in its final sorted position
            arr[i + 1].state = "sorted";
            arr[high].state = "default"; // The old pivot location is now just a normal element
            yield [...arr];

            return i + 1;
        }

        function* quickSort(low: number, high: number): Generator<ArrayElement[], void, unknown> {
            if (low < high) {
                let pi: number = yield* partition(low, high);
                yield* quickSort(low, pi - 1);
                yield* quickSort(pi + 1, high);
            } else if (low === high) {
                // Single element is sorted
                arr[low].state = "sorted";
                yield [...arr];
            }
        }

        yield* quickSort(0, n - 1);
        arr = arr.map(item => ({ ...item, state: "sorted" }));
        yield arr;
    }

    function* mergeSortGenerator(initialArray: ArrayElement[]): Generator<ArrayElement[], void, unknown> {
        let arr = initialArray.map(x => ({ ...x }));
        let n = arr.length;

        function* merge(l: number, m: number, r: number): Generator<ArrayElement[], void, unknown> {
            let n1 = m - l + 1;
            let n2 = r - m;

            let L = new Array(n1);
            let R = new Array(n2);

            for (let i = 0; i < n1; i++) L[i] = { ...arr[l + i] };
            for (let j = 0; j < n2; j++) R[j] = { ...arr[m + 1 + j] };

            let i = 0;
            let j = 0;
            let k = l;

            while (i < n1 && j < n2) {
                if (L[i].value <= R[j].value) {
                    arr[k] = { ...L[i] };
                    i++;
                } else {
                    arr[k] = { ...R[j] };
                    j++;
                }

                // Highlight the write
                arr[k].state = "swapping";
                yield [...arr];

                // If this is the final merge (0 to n-1), mark it sorted. Otherwise default.
                arr[k].state = (l === 0 && r === n - 1) ? "sorted" : "default";
                k++;
            }

            while (i < n1) {
                arr[k] = { ...L[i] };
                arr[k].state = "swapping";
                yield [...arr];
                arr[k].state = (l === 0 && r === n - 1) ? "sorted" : "default";
                i++;
                k++;
            }

            while (j < n2) {
                arr[k] = { ...R[j] };
                arr[k].state = "swapping";
                yield [...arr];
                arr[k].state = (l === 0 && r === n - 1) ? "sorted" : "default";
                j++;
                k++;
            }
        }

        function* mergeSort(l: number, r: number): Generator<ArrayElement[], void, unknown> {
            if (l >= r) {
                return;
            }
            let m = l + Math.floor((r - l) / 2);
            yield* mergeSort(l, m);
            yield* mergeSort(m + 1, r);
            yield* merge(l, m, r);
        }

        yield* mergeSort(0, n - 1);
        arr = arr.map(item => ({ ...item, state: "sorted" }));
        yield arr;
    }


    const stepForward = () => {
        if (!generatorRef.current) {
            // Initialize generator if it doesn't exist
            if (algorithm === "Bubble Sort") generatorRef.current = bubbleSortGenerator(array);
            else if (algorithm === "Selection Sort") generatorRef.current = selectionSortGenerator(array);
            else if (algorithm === "Insertion Sort") generatorRef.current = insertionSortGenerator(array);
            else if (algorithm === "Quick Sort") generatorRef.current = quickSortGenerator(array);
            else if (algorithm === "Merge Sort") generatorRef.current = mergeSortGenerator(array);
        }

        if (generatorRef.current) {
            const { value, done } = generatorRef.current.next();
            if (value) {
                setArray(value);
            }
            if (done) {
                setIsSorted(true);
                pause();
                generatorRef.current = null;
            }
        }
    };

    const play = () => {
        if (isSorted) return;
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Auto-play effect
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                stepForward();
            }, DURATION_MS);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, algorithm]);

    // Helpers for rendering
    const getColorClass = (state: ArrayElement['state']) => {
        switch (state) {
            case "comparing": return "bg-yellow-400 dark:bg-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.5)]";
            case "swapping": return "bg-red-500 dark:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
            case "sorted": return "bg-green-500 dark:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]";
            default: return "bg-primary/80 dark:bg-primary/60";
        }
    };

    return (
        <div className="my-8 rounded-xl border border-border/50 bg-card p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent m-0">
                        Sorting Visualizer
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Watch how different algorithms operate element-by-element.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={algorithm}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType);
                            resetArray(); // Reset automatically changes algo
                        }}
                        className="bg-zinc-100 dark:bg-zinc-800 border border-border/50 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isPlaying}
                    >
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Selection Sort">Selection Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value="Merge Sort">Merge Sort (O(n log n))</option>
                        <option value="Quick Sort">Quick Sort (O(n log n))</option>
                    </select>

                    <button
                        onClick={resetArray}
                        className="p-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
                        title="Generate New Array"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex items-end justify-center h-64 gap-1 md:gap-2 mb-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-border/50">
                {array.map((item, idx) => (
                    <div
                        key={idx}
                        className={`w-full max-w-[40px] rounded-t-sm md:rounded-t-md transition-all duration-200 flex items-start justify-center pt-2 ${getColorClass(item.state)}`}
                        style={{ height: `${(item.value / MAX_VALUE) * 100}%` }}
                    >
                        <span className="text-[10px] md:text-xs font-mono font-bold text-white drop-shadow-md rotate-[-90deg] md:rotate-0 mt-2 md:mt-0">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Controls & Legend */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={isPlaying ? pause : play}
                        disabled={isSorted}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                        onClick={() => { pause(); stepForward(); }}
                        disabled={isPlaying || isSorted}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border/50 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        <StepForward className="w-4 h-4" />
                        Step
                    </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground bg-zinc-50 dark:bg-zinc-900/50 py-1.5 px-3 rounded-full border border-border/50">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-yellow-400 dark:bg-yellow-500"></div>
                        <span>Comparing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-red-500 dark:bg-red-500"></div>
                        <span>Swapping</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                        <span>Sorted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

