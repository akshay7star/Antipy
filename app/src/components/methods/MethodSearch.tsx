'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchEntries, allCategories } from '@/lib/method-index';
import type { Category, MethodEntry } from '@/lib/method-index';

interface MethodSearchProps {
    onResultSelect?: (categoryId: string, entryId: string) => void;
    className?: string;
}

export function MethodSearch({ onResultSelect, className }: MethodSearchProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Search results
    const results = useMemo(() => {
        if (query.length < 2) return [];
        return searchEntries(query).slice(0, 15); // Cap at 15 results
    }, [query]);

    const handleClear = useCallback(() => {
        setQuery('');
        inputRef.current?.focus();
    }, []);

    const handleSelect = useCallback((categoryId: string, entryId: string) => {
        onResultSelect?.(categoryId, entryId);
        setQuery('');
        setIsFocused(false);
    }, [onResultSelect]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Keyboard shortcut: Ctrl+K to focus
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                setIsFocused(false);
                inputRef.current?.blur();
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const showResults = isFocused && query.length >= 2;

    return (
        <div ref={containerRef} className={cn("relative w-full max-w-2xl", className)}>
            {/* Search input */}
            <div className={cn(
                "relative flex items-center gap-3 rounded-2xl border transition-all duration-300",
                "bg-card shadow-sm",
                isFocused
                    ? "border-primary/40 shadow-lg shadow-primary/5 ring-2 ring-primary/10"
                    : "border-border/60 hover:border-border"
            )}>
                <Search className={cn(
                    "absolute left-4 w-5 h-5 transition-colors",
                    isFocused ? "text-primary" : "text-muted-foreground/50"
                )} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search methods, keywords, concepts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full bg-transparent py-3.5 pl-12 pr-24 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <div className="absolute right-3 flex items-center gap-2">
                    {query && (
                        <button
                            onClick={handleClear}
                            className="p-1 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-lg bg-secondary/80 border border-border/60 text-[10px] font-mono font-semibold text-muted-foreground">
                        Ctrl K
                    </kbd>
                </div>
            </div>

            {/* Results dropdown */}
            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/10 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                    {results.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                No results found for "<span className="font-semibold text-foreground">{query}</span>"
                            </p>
                            <p className="text-xs text-muted-foreground/60 mt-1">
                                Try searching for method names, descriptions, or tags
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto divide-y divide-border/40">
                            {results.map(({ category, entryIndex }) => {
                                const entry = category.entries[entryIndex];
                                return (
                                    <button
                                        key={`${category.id}-${entry.id}`}
                                        onClick={() => handleSelect(category.id, entry.id)}
                                        className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-start gap-3 cursor-pointer"
                                    >
                                        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <code className="text-[9px] font-mono font-bold text-primary">
                                                {category.name.slice(0, 3).toUpperCase()}
                                            </code>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">
                                                {entry.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                                                {entry.description}
                                            </p>
                                            <p className="text-[10px] text-primary/60 font-medium mt-1">
                                                {category.name}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <div className="px-4 py-2 bg-secondary/30 border-t border-border/40">
                        <p className="text-[10px] text-muted-foreground/60">
                            {results.length} result{results.length !== 1 ? 's' : ''} found • Press <kbd className="font-mono font-semibold">ESC</kbd> to close
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
