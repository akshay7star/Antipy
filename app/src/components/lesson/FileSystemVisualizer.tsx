'use client';

import React, { useState } from 'react';

type Mode = 'read' | 'write';

interface FileSystemVisualizerProps {
    initialMode?: Mode;
}

const FileSystemVisualizer: React.FC<FileSystemVisualizerProps> = ({ initialMode = 'read' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState(0);

    /* 
    Read Steps:
    0 - Initial (File exists on disk)
    1 - open() creates file object/stream
    2 - .read() transfers data to RAM
    3 - .close() cuts the stream

    Write Steps:
    0 - Initial (Data exists in RAM)
    1 - open('w') creates stream and clears target file
    2 - .write() pushes data across stream
    3 - .close() cuts the stream and saves file
    */

    const runSimulation = async () => {
        if (step !== 0) return;

        for (let i = 1; i <= 3; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }
        await new Promise(r => setTimeout(r, 1500));
        setStep(0);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => { setMode('read'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'read' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Reading (Disk ➔ RAM)
                    </button>
                    <button
                        onClick={() => { setMode('write'); setStep(0); }}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'write' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Writing (RAM ➔ Disk)
                    </button>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={step !== 0}
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-mono rounded shadow disabled:opacity-50"
                >
                    {step === 0 ? 'Run Script' : 'Executing...'}
                </button>
            </div>

            <div className="p-8 min-h-[400px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {/* Code execution side */}
                <div className="absolute left-8 top-8 bg-slate-900 border border-slate-700 p-4 rounded-lg font-mono text-sm shadow-xl z-20">
                    {mode === 'read' && (
                        <>
                            <div className={`transition-colors duration-300 ${step >= 1 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 1 && <span className="absolute -left-4 text-green-500">▶</span>}
                                f = <span className="text-yellow-300">open</span>(<span className="text-green-400">"data.txt"</span>, <span className="text-green-400">"r"</span>)
                            </div>
                            <div className={`transition-colors duration-300 pl-4 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 2 && <span className="absolute -left-4 text-green-500">▶</span>}
                                content = f.<span className="text-yellow-300">read</span>()
                            </div>
                            <div className={`transition-colors duration-300 pl-4 ${step >= 3 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 3 && <span className="absolute -left-4 text-green-500">▶</span>}
                                f.<span className="text-yellow-300">close</span>()
                            </div>
                        </>
                    )}
                    {mode === 'write' && (
                        <>
                            <div className={`transition-colors duration-300 ${step >= 0 ? 'text-white' : 'text-slate-600'}`}>
                                text = <span className="text-green-400">"New Data"</span>
                            </div>
                            <div className={`transition-colors duration-300 ${step >= 1 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 1 && <span className="absolute -left-4 text-green-500">▶</span>}
                                f = <span className="text-yellow-300">open</span>(<span className="text-green-400">"data.txt"</span>, <span className="text-green-400">"w"</span>)
                            </div>
                            <div className={`transition-colors duration-300 pl-4 ${step >= 2 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 2 && <span className="absolute -left-4 text-green-500">▶</span>}
                                f.<span className="text-yellow-300">write</span>(text)
                            </div>
                            <div className={`transition-colors duration-300 pl-4 ${step >= 3 ? 'text-white' : 'text-slate-600'}`}>
                                {step === 3 && <span className="absolute -left-4 text-green-500">▶</span>}
                                f.<span className="text-yellow-300">close</span>()
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full max-w-3xl flex items-center justify-between gap-8 mt-16 px-12">

                    {/* RAM Component */}
                    <div className="flex flex-col items-center flex-1 relative z-10">
                        <div className="text-xs font-mono font-bold text-blue-400 tracking-widest mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            MEMORY (RAM)
                        </div>
                        <div className="w-48 h-48 bg-slate-900 border-2 border-blue-500/50 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col p-4 relative overflow-hidden">
                            {/* File Object / Reference */}
                            <div className={`w-full p-2 mb-2 bg-blue-900/40 border border-blue-500 text-blue-300 font-mono text-xs rounded transition-all duration-300 ${step >= 1 && step < 3 ? 'opacity-100' : 'opacity-0 translate-y-[-10px]'}`}>
                                <span className="font-bold">f = </span> TextIOWrapper
                            </div>

                            {/* Variable Data */}
                            <div className="mt-auto p-3 bg-slate-800 border border-slate-600 rounded text-slate-300 font-mono text-sm self-stretch flex items-center justify-center relative">
                                {mode === 'read' ? (
                                    <>
                                        <div className="absolute top-[-10px] left-2 bg-slate-900 px-1 text-[10px] text-green-400">content</div>
                                        <span className={`transition-all duration-500 ${step >= 2 ? 'opacity-100 text-green-400' : 'opacity-0'}`}>
                                            "Hello, World!"
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute top-[-10px] left-2 bg-slate-900 px-1 text-[10px] text-green-400">text</div>
                                        <span className="text-green-400">"New Data"</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2 text-center max-w-[200px]">Fast, temporary, cleared when program ends</div>
                    </div>

                    {/* Data Stream Pipe */}
                    <div className="flex-1 flex justify-center relative h-32 w-full max-w-[150px]">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 border-y-2 border-dashed border-slate-700 h-8 flex items-center justify-center overflow-hidden bg-slate-900/50 backdrop-blur-sm z-0">

                            {/* Stream Animation */}
                            {(step === 1 || step === 2) && (
                                <div className="absolute left-0 right-0 h-[2px] bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                            )}

                            {/* Moving Data Packets */}
                            {step === 2 && mode === 'read' && (
                                <div className="w-16 h-6 bg-green-500/20 border border-green-500 text-green-400 font-mono text-[10px] flex items-center justify-center absolute -right-16 animate-[slideLeft_1.5s_linear_infinite] rounded shadow-lg">
                                    "Hello..."
                                </div>
                            )}

                            {step === 2 && mode === 'write' && (
                                <div className="w-16 h-6 bg-green-500/20 border border-green-500 text-green-400 font-mono text-[10px] flex items-center justify-center absolute -left-16 animate-[slideRight_1.5s_linear_infinite] rounded shadow-lg">
                                    "New..."
                                </div>
                            )}
                        </div>

                        {/* Stream close indicators */}
                        {step === 3 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl font-bold z-20 animate-in zoom-in spin-in">
                                ✖
                            </div>
                        )}
                    </div>

                    {/* Hard Drive Component */}
                    <div className="flex flex-col items-center flex-1 relative z-10">
                        <div className="text-xs font-mono font-bold text-orange-400 tracking-widest mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 12H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            DISK (SSD/HDD)
                        </div>
                        <div className="w-48 h-48 bg-slate-900 border-2 border-orange-500/50 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.2)] p-4 flex flex-col relative">
                            {/* File System visual */}
                            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs border-b border-slate-700 pb-2">
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM12 18H8v-2h4zm4-4H8v-2h8zm-3-5V3.5L18.5 9z" /></svg>
                                data.txt
                            </div>

                            <div className="flex-1 mt-2 bg-slate-950 border border-slate-700 rounded p-2 text-[10px] font-mono whitespace-pre-wrap overflow-hidden relative">
                                {mode === 'read' ? (
                                    <span className="text-slate-300">Hello, World!</span>
                                ) : (
                                    <span className={`transition-all duration-500 ${step === 0 ? 'text-slate-300' : (step === 1 ? 'opacity-0' : 'opacity-100 text-green-400')}`}>
                                        {step === 0 ? 'Old Data...' : 'New Data'}
                                    </span>
                                )}

                                {/* Lock icon while stream is open */}
                                {step >= 1 && step < 3 && (
                                    <div className="absolute top-1 right-1 text-yellow-500 animate-pulse">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" /></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2 text-center max-w-[200px]">Slow, permanent, survives reboots</div>
                    </div>
                </div>

                {/* Explanation text */}
                <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm px-8">
                    {mode === 'read' && step === 0 && <span className="text-muted-foreground">Reading a file means copying chunks of data from the slow Hard Drive into your fast RAM.</span>}
                    {mode === 'read' && step === 1 && <span className="text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">1. open() asks the OS for permission and sets up a pipeline between RAM and Disk.</span>}
                    {mode === 'read' && step === 2 && <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded">2. .read() copies the actual data bytes across the pipeline into a Python variable.</span>}
                    {mode === 'read' && step === 3 && <span className="text-red-400 bg-red-400/10 px-3 py-1 rounded">3. .close() shuts off the pipeline, freeing up system resources. Always close files!</span>}

                    {mode === 'write' && step === 0 && <span className="text-muted-foreground">Writing a file pushes data from RAM into long-term storage on the Disk.</span>}
                    {mode === 'write' && step === 1 && <span className="text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">1. open('w') creates the pipeline. The 'w' flag INSTANTLY TRUNCATES (wipes) the existing file!</span>}
                    {mode === 'write' && step === 2 && <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded">2. .write() streams your string data from RAM over to the empty file on disk.</span>}
                    {mode === 'write' && step === 3 && <span className="text-red-400 bg-red-400/10 px-3 py-1 rounded">3. .close() properly terminates the stream, sealing the file safely on the disk.</span>}
                </div>

            </div>
            {/* Built-in Keyframes for custom animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideLeft {
                    0% { transform: translateX(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(-150px); opacity: 0; }
                }
                @keyframes slideRight {
                    0% { transform: translateX(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(150px); opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default FileSystemVisualizer;
