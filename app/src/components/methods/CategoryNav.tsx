'use client';

import { cn } from '@/lib/utils';
import { allCategories, getTotalEntryCount } from '@/lib/method-index';
import {
    Calculator, Hash, ToggleRight, GitBranch, FunctionSquare, Boxes,
    ShieldAlert, Repeat, Layers, FolderOpen, AlignLeft, Zap, Key,
    Globe, Server, Rocket, Search, FileJson, BarChart3, Database,
    Cloud, Plug, BookOpen, Code
} from 'lucide-react';

// Map category icon names to actual icon components
const iconMap: Record<string, React.ElementType> = {
    BookOpen, Code, Calculator, Hash, ToggleRight, GitBranch,
    FunctionSquare, Boxes, ShieldAlert, Repeat, Layers, FolderOpen,
    AlignLeft, Zap, Key, Globe, Server, Rocket, Search, FileJson,
    BarChart3, Database, Cloud, Plug,
};

interface CategoryNavProps {
    activeCategoryId?: string;
    onCategorySelect: (categoryId: string) => void;
    className?: string;
}

export function CategoryNav({ activeCategoryId, onCategorySelect, className }: CategoryNavProps) {
    const totalEntries = getTotalEntryCount();

    // Group categories for visual organization
    const groups = [
        { label: 'Core Python', ids: ['built-in-functions', 'string-methods', 'list-methods', 'tuple-methods', 'dict-methods', 'set-methods', 'operators', 'number-methods', 'boolean-operations'] },
        { label: 'Control & Functions', ids: ['control-flow', 'functions-scope'] },
        { label: 'OOP & Patterns', ids: ['oop', 'error-handling', 'comprehensions-generators', 'decorators'] },
        { label: 'I/O & Formatting', ids: ['file-io', 'string-formatting'] },
        { label: 'Advanced', ids: ['async-concurrency', 'python-keywords', 'regex', 'data-serialization'] },
        { label: 'Web Frameworks', ids: ['flask', 'django', 'fastapi'] },
        { label: 'Data & Cloud', ids: ['data-science', 'databases', 'serverless-cloud', 'api-development'] },
    ];

    return (
        <nav className={cn("flex flex-col h-full", className)}>
            {/* Header */}
            <div className="p-4 border-b border-border/60">
                <h2 className="text-lg font-bold text-foreground tracking-tight">Categories</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {allCategories.length} categories • {totalEntries} entries
                </p>
            </div>

            {/* Category list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {groups.map((group) => (
                    <div key={group.label}>
                        <p className="px-3 py-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                            {group.label}
                        </p>
                        <div className="mt-1 space-y-0.5">
                            {group.ids.map((id) => {
                                const category = allCategories.find((c) => c.id === id);
                                if (!category) return null;
                                const Icon = iconMap[category.icon] || Code;
                                const isActive = activeCategoryId === id;

                                return (
                                    <button
                                        key={id}
                                        onClick={() => onCategorySelect(id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer",
                                            isActive
                                                ? "bg-primary/10 text-primary font-semibold shadow-sm"
                                                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "w-4 h-4 shrink-0",
                                            isActive ? "text-primary" : "text-muted-foreground/60"
                                        )} />
                                        <span className="text-sm truncate flex-1">{category.name}</span>
                                        <span className={cn(
                                            "text-[10px] font-mono font-bold shrink-0 px-1.5 py-0.5 rounded-md",
                                            isActive
                                                ? "bg-primary/20 text-primary"
                                                : "bg-secondary text-muted-foreground/50"
                                        )}>
                                            {category.entries.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}
