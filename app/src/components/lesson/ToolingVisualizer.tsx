'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'venv' | 'logging';

interface ToolingVisualizerProps {
    initialMode?: Mode;
}

const ToolingVisualizer: React.FC<ToolingVisualizerProps> = ({ initialMode = 'venv' }) => {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Venv State
    const [venvActive, setVenvActive] = useState(false);
    const [installedPackages, setInstalledPackages] = useState<{ name: string, loc: 'global' | 'venv' }[]>([
        { name: 'requests', loc: 'global' }
    ]);
    const [commandInput, setCommandInput] = useState('');

    const handleInstall = () => {
        if (!commandInput) return;
        setInstalledPackages(prev => [...prev, {
            name: commandInput.toLowerCase(),
            loc: venvActive ? 'venv' : 'global'
        }]);
        setCommandInput('');
    };

    // Logging State
    const [logLevel, setLogLevel] = useState<'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'>('WARNING');
    const [logs, setLogs] = useState<{ lvl: string, msg: string, visible: boolean }[]>([]);

    const levelValues = { DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40, CRITICAL: 50 };

    const handleLog = (lvl: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL', msg: string) => {
        const isVisible = levelValues[lvl] >= levelValues[logLevel];
        setLogs(prev => [...prev, { lvl, msg, visible: isVisible }]);
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner flex-wrap justify-center">
                    <button
                        onClick={() => setMode('venv')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'venv' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Virtual Environments
                    </button>
                    <button
                        onClick={() => setMode('logging')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'logging' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Logging Levels
                    </button>
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col bg-dot-pattern relative overflow-x-auto">
                {mode === 'venv' && (
                    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
                        {/* Terminal */}
                        <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm shadow-xl border border-slate-800">
                            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setVenvActive(!venvActive)}
                                        className={`px-3 py-1 rounded text-xs font-bold ${venvActive ? 'bg-slate-700 text-white' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/40'}`}
                                    >
                                        {venvActive ? 'deactivate' : 'source env/bin/activate'}
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-4 text-emerald-400">
                                    <span>{venvActive ? '(env) user@macbook:~$ pip install' : 'user@macbook:~$ pip install'}</span>
                                    <input 
                                        type="text" 
                                        value={commandInput}
                                        onChange={e => setCommandInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleInstall()}
                                        placeholder="package_name"
                                        className="bg-transparent border-b border-emerald-900 outline-none text-emerald-300 w-32 placeholder-emerald-900 focus:border-emerald-500"
                                    />
                                    <button onClick={handleInstall} className="text-slate-500 hover:text-emerald-400 text-xs">↵</button>
                                </div>
                            </div>
                        </div>

                        {/* File System */}
                        <div className="flex gap-8 justify-center mt-4">
                            {/* Global */}
                            <div className={`p-6 rounded-xl border-2 transition-colors duration-300 w-64 flex flex-col gap-4 ${!venvActive ? 'bg-blue-950/30 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-900/50 border-slate-800'}`}>
                                <h3 className="text-center font-bold text-slate-300 flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Global Python
                                </h3>
                                <div className="flex flex-col gap-2 min-h-32">
                                    <AnimatePresence>
                                        {installedPackages.filter(p => p.loc === 'global').map((p, i) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }} 
                                                animate={{ opacity: 1, y: 0 }} 
                                                key={`global-${i}`}
                                                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-300 font-mono shadow"
                                            >
                                                📦 {p.name}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Venv */}
                            <div className={`p-6 rounded-xl border-2 transition-colors duration-300 w-64 flex flex-col gap-4 ${venvActive ? 'bg-emerald-950/30 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 border-slate-800'}`}>
                                <h3 className="text-center font-bold text-slate-300 flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ./env/ Folder
                                </h3>
                                <div className="flex flex-col gap-2 min-h-32">
                                    <AnimatePresence>
                                        {installedPackages.filter(p => p.loc === 'venv').map((p, i) => (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.8 }} 
                                                animate={{ opacity: 1, scale: 1 }} 
                                                key={`venv-${i}`}
                                                className="bg-emerald-900/40 border border-emerald-700 rounded px-3 py-2 text-sm text-emerald-300 font-mono shadow"
                                            >
                                                📦 {p.name}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {!venvActive && installedPackages.filter(p => p.loc === 'venv').length === 0 && (
                                        <div className="text-center text-xs text-slate-600 italic mt-8">Isolated Environment</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'logging' && (
                    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                        {/* Config */}
                        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center gap-4 w-full text-sm font-mono shadow-xl relative z-10">
                            <span className="text-slate-400">logging.basicConfig(level=logging.</span>
                            <select 
                                value={logLevel}
                                onChange={e => setLogLevel(e.target.value as any)}
                                className="bg-slate-800 border border-slate-600 text-yellow-400 rounded px-2 py-1 outline-none"
                            >
                                <option value="DEBUG">DEBUG</option>
                                <option value="INFO">INFO</option>
                                <option value="WARNING">WARNING</option>
                                <option value="ERROR">ERROR</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                            <span className="text-slate-400">)</span>
                        </div>

                        {/* Split View: Events vs File */}
                        <div className="flex gap-8 w-full justify-center text-sm font-mono">
                            {/* App emitting events */}
                            <div className="flex flex-col gap-3 w-64">
                                <h3 className="text-center text-slate-400 mb-2 border-b border-slate-700 pb-2">Your Code Emits:</h3>
                                <button onClick={() => handleLog('DEBUG', 'Variable x = 5')} className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded border border-slate-700 transition">logger.debug()</button>
                                <button onClick={() => handleLog('INFO', 'User logged in')} className="py-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 rounded border border-blue-800 transition">logger.info()</button>
                                <button onClick={() => handleLog('WARNING', 'Disk space low')} className="py-2 bg-yellow-900/40 hover:bg-yellow-800/60 text-yellow-300 rounded border border-yellow-800 transition">logger.warning()</button>
                                <button onClick={() => handleLog('ERROR', 'DB Connection lost')} className="py-2 bg-orange-900/40 hover:bg-orange-800/60 text-orange-300 rounded border border-orange-800 transition">logger.error()</button>
                                <button onClick={() => handleLog('CRITICAL', 'Server crash!')} className="py-2 bg-red-900/40 hover:bg-red-800/60 text-red-300 rounded border border-red-800 transition">logger.critical()</button>
                            </div>

                            {/* Filter Funnel Graphic */}
                            <div className="flex flex-col justify-center items-center text-slate-600 text-2xl">
                                ➔
                            </div>

                            {/* Log Output */}
                            <div className="bg-slate-950 border border-slate-800 rounded-lg w-96 p-4 flex flex-col text-xs shadow-2xl relative overflow-hidden">
                                <div className="text-slate-500 mb-2 pb-2 border-b border-slate-800 flex justify-between">
                                    <span>app.log</span>
                                    <button onClick={() => setLogs([])} className="hover:text-slate-300">clear</button>
                                </div>
                                <div className="flex flex-col gap-1 overflow-y-auto max-h-[300px]">
                                    {logs.length === 0 && <span className="text-slate-700 italic">Waiting for events...</span>}
                                    <AnimatePresence>
                                        {logs.map((log, i) => (
                                            <motion.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i} 
                                                className={`flex gap-2 p-1 rounded ${log.visible ? 
                                                    (log.lvl === 'CRITICAL' ? 'bg-red-900/30 text-red-400' : 
                                                    log.lvl === 'ERROR' ? 'text-orange-400' : 
                                                    log.lvl === 'WARNING' ? 'text-yellow-400' : 
                                                    log.lvl === 'INFO' ? 'text-blue-400' : 'text-slate-400') 
                                                    : 'text-slate-600 line-through opacity-50'
                                                }`}
                                            >
                                                {!log.visible && <span className="text-red-500 px-1 font-bold">BLOCKED By Filter</span>}
                                                {log.visible && <>
                                                    <span className="opacity-50">12:00:0{i%10}</span>
                                                    <span className="font-bold w-16">{log.lvl}</span>
                                                    <span>{log.msg}</span>
                                                </>}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Explanation Text */}
                        <div className="text-center text-sm text-slate-500 mt-4 max-w-xl">
                            The configurating level acts as a gate. Anything <strong>below</strong> the selected level is ignored. Try setting the level to <code>ERROR</code> and clicking <code>INFO</code>!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolingVisualizer;
