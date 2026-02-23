'use client';

import React, { useState } from 'react';

type DSMode = 'list' | 'dict' | 'set';

interface DSVisualizerProps {
    initialMode?: DSMode;
}

const DataStructuresVisualizer: React.FC<DSVisualizerProps> = ({ initialMode = 'list' }) => {
    const [mode, setMode] = useState<DSMode>(initialMode);

    // List State
    const [listItems, setListItems] = useState(['apple', 'banana', 'cherry']);
    const [newItem, setNewItem] = useState('');

    // Dict State
    const [dictItems, setDictItems] = useState<{ key: string, value: string }[]>([
        { key: 'name', value: 'Alice' },
        { key: 'age', value: '25' },
    ]);
    const [newKey, setNewKey] = useState('');
    const [newVal, setNewVal] = useState('');

    // Set State
    const [setItems, setSetItems] = useState<string[]>(['red', 'green', 'blue']);
    const [setInputValue, setSetInputValue] = useState('');
    const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

    // List Handlers
    const addToList = () => {
        if (!newItem) return;
        setListItems([...listItems, newItem]);
        setNewItem('');
    };
    const popList = () => {
        setListItems(listItems.slice(0, -1));
    };

    // Dict Handlers
    const addToDict = () => {
        if (!newKey || !newVal) return;
        const exists = dictItems.findIndex(i => i.key === newKey);
        if (exists >= 0) {
            const newDict = [...dictItems];
            newDict[exists].value = newVal;
            setDictItems(newDict);
        } else {
            setDictItems([...dictItems, { key: newKey, value: newVal }]);
        }
        setNewKey('');
        setNewVal('');
    };

    // Set Handlers
    const addToSet = () => {
        if (!setInputValue) return;
        if (setItems.includes(setInputValue)) {
            setShowDuplicateWarning(true);
            setTimeout(() => setShowDuplicateWarning(false), 2000);
        } else {
            setSetItems([...setItems, setInputValue]);
        }
        setSetInputValue('');
    };

    return (
        <div className="w-full bg-card rounded-xl border border-divider overflow-hidden flex flex-col mb-8 shadow-sm">
            <div className="bg-background-alt p-4 border-b border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-background-alt/50 p-1 rounded-lg border border-divider shadow-inner">
                    <button
                        onClick={() => setMode('list')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'list' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Lists [ ]
                    </button>
                    <button
                        onClick={() => setMode('dict')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'dict' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Dictionaries {"{ }"}
                    </button>
                    <button
                        onClick={() => setMode('set')}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${mode === 'set' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-background'}`}
                    >
                        Sets {"{ }"}
                    </button>
                </div>
            </div>

            <div className="p-8 min-h-[350px] flex items-center justify-center bg-dot-pattern relative overflow-x-auto">

                {mode === 'list' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Memory View */}
                        <div className="w-full flex justify-start items-center gap-2 overflow-x-auto pb-4 px-4 scrollbar-thin">
                            <span className="text-2xl font-mono text-purple-400 font-light">[</span>
                            {listItems.map((item, i) => (
                                <div key={i} className="flex flex-col items-center animate-in zoom-in duration-300">
                                    <div className="text-xs font-mono text-slate-500 mb-1">index {i}</div>
                                    <div className="px-4 py-3 bg-slate-800 border-2 border-blue-500/50 text-blue-300 font-mono rounded shadow-lg min-w-[80px] text-center">
                                        "{item}"
                                    </div>
                                    {i < listItems.length - 1 && (
                                        <span className="text-2xl font-mono text-purple-400 font-light ml-4 -mr-2">,</span>
                                    )}
                                </div>
                            ))}
                            <span className="text-2xl font-mono text-purple-400 font-light ml-2">]</span>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-4 p-4 bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">my_list</span>.<span className="text-yellow-300">append</span>(
                                <input
                                    className="w-24 bg-background border border-divider rounded px-2 py-1 text-foreground"
                                    value={newItem}
                                    placeholder="value"
                                    onChange={e => setNewItem(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addToList()}
                                />
                                )
                                <button onClick={addToList} className="ml-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded">Execute</button>
                            </div>
                            <div className="w-px bg-slate-700 mx-2"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">my_list</span>.<span className="text-yellow-300">pop</span>()
                                <button onClick={popList} className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded" disabled={listItems.length === 0}>Execute</button>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'dict' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Memory View */}
                        <div className="w-full flex justify-center gap-4 flex-wrap">
                            {dictItems.map((item, i) => (
                                <div key={i} className="flex items-stretch bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                                    <div className="px-4 py-3 bg-slate-900 border-r border-slate-700 font-mono text-orange-300 text-sm flex items-center justify-center min-w-[100px]">
                                        "{item.key}"
                                    </div>
                                    <div className="px-4 py-3 font-mono text-emerald-400 text-sm flex items-center justify-center min-w-[100px]">
                                        "{item.value}"
                                    </div>
                                </div>
                            ))}
                            {dictItems.length === 0 && (
                                <div className="text-muted-foreground font-mono">Empty Dictionary &#123;&#125;</div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-4 p-4 bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">my_dict</span>[
                                <input
                                    className="w-20 bg-background border border-divider rounded px-1 py-1 text-foreground"
                                    value={newKey}
                                    placeholder="key"
                                    onChange={e => setNewKey(e.target.value)}
                                />
                                ] =
                                <input
                                    className="w-24 bg-background border border-divider rounded px-1 py-1 text-foreground"
                                    value={newVal}
                                    placeholder="value"
                                    onChange={e => setNewVal(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addToDict()}
                                />
                                <button onClick={addToDict} className="ml-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded font-sans text-xs shadow">Assign/Update</button>
                            </div>
                            <div className="text-xs text-slate-500 text-center">In dictionaries, keys must be unique. Updating an existing key overwrites the value.</div>
                        </div>
                    </div>
                )}

                {mode === 'set' && (
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
                        {/* Memory View (Sets are unordered bags) */}
                        <div className="w-64 h-64 border-2 border-dashed border-purple-500/50 rounded-full relative bg-purple-900/10 flex items-center justify-center shadow-inner">
                            <span className="absolute top-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">Unordered Set Engine</span>

                            <div className="flex flex-wrap items-center justify-center gap-3 p-8">
                                {setItems.map((val, i) => (
                                    <div
                                        key={val}
                                        className="px-3 py-1.5 bg-purple-600/30 border border-purple-500 text-purple-200 font-mono text-sm rounded-full animate-in zoom-in spin-in-6 duration-500 drop-shadow-md"
                                        style={{ transform: `rotate(${(i * 45) % 15 - 7}deg)` }}
                                    >
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-4 p-4 bg-slate-900 border border-slate-700 font-mono text-sm rounded-lg shadow-xl relative">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">my_set</span>.<span className="text-yellow-300">add</span>(
                                <input
                                    className="w-24 bg-background border border-divider rounded px-2 py-1 text-foreground"
                                    value={setInputValue}
                                    placeholder="value"
                                    onChange={e => setSetInputValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addToSet()}
                                />
                                )
                                <button onClick={addToSet} className="ml-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded">Execute</button>
                            </div>

                            {showDuplicateWarning && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500/90 text-white px-3 py-1 rounded shadow-lg text-xs font-bold animate-pulse">
                                    Set already contains "{setInputValue}"! Ignored.
                                </div>
                            )}
                            <div className="text-xs text-slate-500 text-center px-4">Sets automatically discard absolute duplicate values. Position is not guaranteed.</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataStructuresVisualizer;
