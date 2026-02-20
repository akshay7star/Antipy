'use client';

import { MethodEntry } from '@/lib/method-index/types';
import { cn } from '@/lib/utils';
import { Copy, Check, Info } from 'lucide-react';
import { useState } from 'react';

interface MethodCardProps {
    entry: MethodEntry;
    categoryId: string;
}

export function MethodCard({ entry, categoryId }: MethodCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(entry.example);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
            {/* Header: Signature & Tags */}
            <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-3">
                <div className="font-mono text-base font-semibold text-primary">
                    {entry.signature}
                </div>
                <div className="flex flex-wrap gap-2">
                    {entry.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content: Simple Description */}
            <div className="text-sm text-foreground/80 leading-relaxed font-medium">
                {entry.description}
            </div>

            {/* Example Code Block */}
            <div className="relative mt-1 rounded-lg bg-zinc-900 border border-border/50 group-hover:border-border/80 transition-colors overflow-hidden">
                <div className="absolute right-2 top-2 z-10">
                    <button
                        onClick={handleCopy}
                        className="rounded-md p-1.5 bg-zinc-800/80 hover:bg-zinc-700 border border-transparent hover:border-zinc-600 transition-all opacity-0 group-hover:opacity-100"
                        title="Copy example"
                    >
                        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
                    </button>
                </div>
                <div className="p-3 overflow-x-auto">
                    <pre className="font-mono text-xs md:text-sm text-zinc-100 whitespace-pre">
                        <code>{entry.example}</code>
                    </pre>
                </div>
            </div>

            {/* Footer: Edge Cases (if any) - subtly shown */}
            {entry.edgeCases && (
                <div className="mt-1 flex items-start gap-2 text-xs text-muted-foreground bg-amber-500/5 p-2 rounded border border-amber-500/10">
                    <Info className="h-3.5 w-3.5 text-amber-600/70 mt-0.5 shrink-0" />
                    <span className="leading-tight">
                        <span className="font-medium text-amber-700/80 dark:text-amber-500/80">Note: </span>
                        {Array.isArray(entry.edgeCases) ? entry.edgeCases[0] : entry.edgeCases}
                    </span>
                </div>
            )}
        </div>
    );
}
