'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'instantiation' | 'inheritance' | 'polymorphism';

interface OOPVisualizerProps {
    initialMode?: Mode;
}

const OOPVisualizer: React.FC<OOPVisualizerProps> = ({ initialMode = 'instantiation' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Instantiation State
    const [instances, setInstances] = useState<{ id: string; name: string }[]>([]);

    // Inheritance State
    const [inheritanceStep, setInheritanceStep] = useState(0);
    /* 
      0: Idle
      1: Call dog.speak() -> Look in Instance
      2: Look in Dog class (Not found)
      3: Look in Animal class (Found!)
      4: Execute & Return
    */

    // Polymorphism State
    const [polyStep, setPolyStep] = useState(0);

    const handleInstantiate = () => {
        if (instances.length >= 3) {
            setInstances([]); // reset if too many
        } else {
            const names = ["Buddy", "Max", "Bella", "Charlie"];
            setInstances([...instances, { id: Math.random().toString(), name: names[instances.length] }]);
        }
    };

    const runInheritanceDemo = async () => {
        if (inheritanceStep !== 0) return;
        setInheritanceStep(1);
        await new Promise(r => setTimeout(r, 1200));
        setInheritanceStep(2);
        await new Promise(r => setTimeout(r, 1200));
        setInheritanceStep(3);
        await new Promise(r => setTimeout(r, 1200));
        setInheritanceStep(4);
        await new Promise(r => setTimeout(r, 2000));
        setInheritanceStep(0);
    };

    const runPolyDemo = async () => {
        if (polyStep !== 0) return;
        for (let i = 1; i <= 3; i++) {
            setPolyStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }
        await new Promise(r => setTimeout(r, 1000));
        setPolyStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            {/* Header controls */}
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner">
                    <button
                        onClick={() => { setMode('instantiation'); setInstances([]); setInheritanceStep(0); setPolyStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'instantiation' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Classes & Instances
                    </button>
                    <button
                        onClick={() => { setMode('inheritance'); setInstances([]); setInheritanceStep(0); setPolyStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'inheritance' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        MRO (Inheritance)
                    </button>
                    <button
                        onClick={() => { setMode('polymorphism'); setInstances([]); setInheritanceStep(0); setPolyStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'polymorphism' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Polymorphism
                    </button>
                </div>
            </div>

            {/* Visualizer Canvas */}
            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {/* 1. INSTANTIATION MODE */}
                {mode === 'instantiation' && (
                    <div className="flex flex-col items-center w-full max-w-2xl relative">
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={handleInstantiate} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-all active:scale-95 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Instantiate `Dog()`
                            </button>
                        </div>

                        {/* Class Blueprint */}
                        <div className="w-64 bg-slate-800 dark:bg-slate-900 border-2 border-primary rounded-lg shadow-xl overflow-hidden z-10 mb-12">
                            <div className="bg-primary/20 p-2 border-b border-primary/30 text-center font-mono font-bold text-primary">
                                class Dog:
                            </div>
                            <div className="p-4 font-mono text-sm text-slate-300">
                                <div className="text-secondary-foreground mb-2">def __init__(self, name):</div>
                                <div className="pl-4 text-emerald-400">self.name = name</div>
                                <div className="text-secondary-foreground mt-4 mb-2">def speak(self):</div>
                                <div className="pl-4 text-emerald-400">return "Woof!"</div>
                            </div>
                        </div>

                        {/* Memory Heap (Instances) */}
                        <div className="w-full flex justify-center gap-4 md:gap-8 flex-wrap h-auto min-h-[8rem] relative h-32">
                            <AnimatePresence>
                                {instances.map((inst, i) => (
                                    <motion.div
                                        key={inst.id}
                                        initial={{ opacity: 0, y: -50, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="w-32 bg-background border-2 border-secondary rounded-lg shadow-lg relative flex flex-col items-center"
                                    >
                                        {/* Fake pointer arrow pointing up to class */}
                                        <svg className="absolute -top-12 left-1/2 -ml-3 w-6 h-12 text-secondary/50" viewBox="0 0 24 48" fill="none" stroke="currentColor">
                                            <path d="M12 48 L12 0 M6 8 L12 0 L18 8" strokeWidth="2" />
                                        </svg>

                                        <div className="w-full bg-secondary/30 p-2 border-b border-secondary/30 text-center text-xs font-mono font-bold text-secondary-foreground rounded-t-lg truncate">
                                            &lt;Dog object&gt;
                                        </div>
                                        <div className="p-3 font-mono text-sm text-center">
                                            <span className="text-muted-foreground mr-1">name:</span>
                                            <span className="font-semibold text-emerald-500">"{inst.name}"</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {instances.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm border-2 border-dashed border-divider rounded-xl">
                                    Click "Instantiate" to spawn objects in memory.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. INHERITANCE / MRO MODE */}
                {mode === 'inheritance' && (
                    <div className="flex flex-col items-center w-full max-w-2xl">
                        <div className="w-full flex justify-between items-start relative px-12">

                            {/* Base Class */}
                            <div className={`w-48 border-2 rounded-lg shadow-lg z-10 transition-all duration-300 ${inheritanceStep === 3 ? 'border-green-500 bg-green-500/10 scale-105' : 'border-slate-600 bg-slate-800'}`}>
                                <div className="p-2 border-b border-slate-600 text-center font-mono font-bold">
                                    class Animal
                                </div>
                                <div className="p-4 font-mono text-xs">
                                    <div className={`p-1 rounded transition-colors ${inheritanceStep === 3 ? 'bg-green-500/30' : ''}`}>
                                        def speak(self):<br />
                                        &nbsp;&nbsp;return "..."
                                    </div>
                                </div>
                            </div>

                            {/* Pointer arrow between classes */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 flex justify-center">
                                <svg className={`w-full h-8 transition-colors duration-300 ${inheritanceStep >= 3 ? 'text-green-500' : 'text-slate-500'}`} viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M100 12 L0 12 M10 4 L0 12 L10 20" />
                                </svg>
                                <span className="absolute -top-6 text-xs font-mono text-muted-foreground bg-background px-2">inherits</span>
                            </div>

                            {/* Child Class */}
                            <div className={`w-48 border-2 rounded-lg shadow-lg z-10 transition-all duration-300 ${inheritanceStep === 2 ? 'border-yellow-500 bg-yellow-500/10 scale-105' : 'border-blue-500 bg-blue-900/40'}`}>
                                <div className="p-2 border-b border-blue-500/50 text-center font-mono font-bold text-blue-300">
                                    class Dog
                                </div>
                                <div className="p-4 font-mono text-xs">
                                    <div className="p-1 text-slate-400 italic">
                                        # No speak() method defined here!
                                    </div>
                                    <div className="mt-2">
                                        def fetch(self):<br />
                                        &nbsp;&nbsp;...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Memory Instance */}
                        <div className="mt-16 w-full flex justify-center md:justify-end md:pr-12 md:right-32 right-auto relative">
                            {/* Pointer arrow instance -> class */}
                            <svg className={`absolute -top-12 right-32 w-8 h-12 transition-colors duration-300 ${inheritanceStep >= 2 ? 'text-yellow-500' : 'text-slate-500'}`} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 0 L12 48 M6 8 L12 0 L18 8" />
                            </svg>

                            <div className={`w-48 border-2 rounded-lg shadow-xl transition-all duration-300 ${inheritanceStep === 1 ? 'border-yellow-500 bg-yellow-500/10 scale-105' : 'border-slate-500 bg-background'}`}>
                                <div className="p-2 border-b border-slate-500 text-center font-mono text-sm">
                                    buddy = Dog()
                                </div>
                                <div className="p-4 flex justify-center">
                                    <button
                                        disabled={inheritanceStep !== 0}
                                        onClick={runInheritanceDemo}
                                        className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-slate-700 disabled:text-slate-400 text-primary-foreground font-mono text-sm rounded shadow transition-all"
                                    >
                                        {inheritanceStep === 4 ? '"..."' : 'buddy.speak()'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tooltip / Status text for Inheritance */}
                        <div className="mt-8 h-12 font-mono text-sm text-center max-w-lg">
                            {inheritanceStep === 0 && <span className="text-muted-foreground">Click `buddy.speak()` to trace the Method Resolution Order (MRO).</span>}
                            {inheritanceStep === 1 && <span className="text-yellow-500">1. Does the `buddy` instance have a `.speak` attribute? No.</span>}
                            {inheritanceStep === 2 && <span className="text-yellow-500">2. Does the `Dog` class have a `speak()` method? No.</span>}
                            {inheritanceStep === 3 && <span className="text-green-500 font-bold">3. Does the parent `Animal` class have `speak()`? YES! Found it.</span>}
                            {inheritanceStep === 4 && <span className="text-primary font-bold">4. Executing `Animal.speak(buddy)`.</span>}
                        </div>
                    </div>
                )}

                {/* 3. POLYMORPHISM MODE */}
                {mode === 'polymorphism' && (
                    <div className="flex flex-col items-center w-full max-w-3xl">
                        {/* Invoker */}
                        <div className="w-full flex justify-center mb-16 relative">
                            <div className="bg-slate-800 border-2 border-primary p-4 rounded-xl shadow-xl z-20">
                                <div className="font-mono text-sm mb-3">
                                    <span className="text-purple-400">for</span> <span className="text-white">animal</span> <span className="text-purple-400">in</span> [<span className="text-blue-300">dog</span>, <span className="text-green-300">cat</span>, <span className="text-orange-300">duck</span>]:
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        disabled={polyStep !== 0}
                                        onClick={runPolyDemo}
                                        className="px-6 py-2 bg-primary hover:bg-primary/90 disabled:bg-slate-700 disabled:text-slate-400 text-primary-foreground font-mono text-sm rounded shadow-lg transition-all border border-primary-foreground/20"
                                    >
                                        Execute animal.speak()
                                    </button>
                                </div>
                            </div>

                            {/* Dispatch Arrows */}
                            <svg className="absolute top-16 w-full h-16 pointer-events-none z-10" viewBox="0 0 400 64">
                                <path d="M200 0 C 200 30, 80 30, 80 64" fill="none" stroke="currentColor" className={`transition-all duration-300 ${polyStep === 1 ? 'text-blue-500 stroke-[3px]' : 'text-slate-700 stroke-[1px]'}`} />
                                <path d="M200 0 L 200 64" fill="none" stroke="currentColor" className={`transition-all duration-300 ${polyStep === 2 ? 'text-green-500 stroke-[3px]' : 'text-slate-700 stroke-[1px]'}`} />
                                <path d="M200 0 C 200 30, 320 30, 320 64" fill="none" stroke="currentColor" className={`transition-all duration-300 ${polyStep === 3 ? 'text-orange-500 stroke-[3px]' : 'text-slate-700 stroke-[1px]'}`} />
                            </svg>
                        </div>

                        {/* Receivers */}
                        <div className="w-full flex justify-between px-8">
                            <div className={`w-40 border-2 rounded-lg text-center transition-all duration-300 ${polyStep === 1 ? 'border-blue-500 bg-blue-900/40 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-slate-700 bg-background'}`}>
                                <div className="p-2 border-b border-slate-700 font-mono text-sm text-blue-400">Dog</div>
                                <div className="p-4 font-mono font-bold">
                                    {polyStep === 1 ? '"Woof!"' : '...'}
                                </div>
                            </div>

                            <div className={`w-40 border-2 rounded-lg text-center transition-all duration-300 ${polyStep === 2 ? 'border-green-500 bg-green-900/40 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-slate-700 bg-background'}`}>
                                <div className="p-2 border-b border-slate-700 font-mono text-sm text-green-400">Cat</div>
                                <div className="p-4 font-mono font-bold">
                                    {polyStep === 2 ? '"Meow!"' : '...'}
                                </div>
                            </div>

                            <div className={`w-40 border-2 rounded-lg text-center transition-all duration-300 ${polyStep === 3 ? 'border-orange-500 bg-orange-900/40 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'border-slate-700 bg-background'}`}>
                                <div className="p-2 border-b border-slate-700 font-mono text-sm text-orange-400">Duck</div>
                                <div className="p-4 font-mono font-bold">
                                    {polyStep === 3 ? '"Quack!"' : '...'}
                                </div>
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div className="mt-8 font-mono text-sm text-center text-muted-foreground w-full">
                            Dynamic Dispatch determines the exact class implementation at runtime (Duck Typing).
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OOPVisualizer;
