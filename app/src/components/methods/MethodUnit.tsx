import { MethodEntry } from '@/lib/method-index/types';
import { MethodCard } from '@/components/methods/MethodCard';
import { allCategories, searchEntries } from '@/lib/method-index';
import { cn } from '@/lib/utils';


interface MethodUnitProps {
    id?: string;        // Exact method ID (e.g. "str-upper")
    category?: string;  // Whole category (e.g. "list-methods")
    query?: string;     // Search query (e.g. "sort")
    title?: string;     // Optional override title
    className?: string;
}

export function MethodUnit({ id, category, query, title, className }: MethodUnitProps) {
    let methods: MethodEntry[] = [];

    if (id) {
        // Find specific method across all categories
        for (const cat of allCategories) {
            const found = cat.entries.find(e => e.id === id);
            if (found) {
                methods = [found];
                break;
            }
        }
    } else if (category) {
        const cat = allCategories.find(c => c.id === category);
        if (cat) methods = cat.entries;
    } else if (query) {
        methods = searchEntries(query)
            .slice(0, 5)
            .map(r => r.category.entries[r.entryIndex]);
    }

    if (!methods.length) return null;

    // Resolve category ID for styling access if needed, handling the 'undefined' case for search/id lookups
    const relatedCategoryId = category || (id ? allCategories.find(c => c.entries.some(e => e.id === id))?.id : undefined);

    return (
        <div className={cn("my-8 space-y-4", className)}>
            {title && (
                <h3 className="text-xl font-bold flex items-center gap-2">
                    {title}
                    <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {methods.length} {methods.length === 1 ? 'method' : 'methods'}
                    </span>
                </h3>
            )}

            <div className="grid grid-cols-1 gap-4">
                {methods.map(method => (
                    <MethodCard
                        key={method.id}
                        entry={method}
                        categoryId={relatedCategoryId || 'unknown'}
                    />
                ))}
            </div>
        </div>
    );
}
