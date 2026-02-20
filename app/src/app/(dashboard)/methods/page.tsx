'use client';

import { useState, useRef, useEffect } from 'react';
import { CategoryNav } from '@/components/methods/CategoryNav';
import { MethodSearch } from '@/components/methods/MethodSearch';
import { MethodUnit } from '@/components/methods/MethodUnit';
import { allCategories } from '@/lib/method-index';
import { BookOpen } from 'lucide-react';

export default function MethodsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('built-in-functions');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const activeCategory = allCategories.find(c => c.id === selectedCategory);

    const handleSearchResult = (categoryId: string, entryId: string) => {
        setSelectedCategory(categoryId);
    };

    // Reset scroll when category changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [selectedCategory]);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r bg-card h-[calc(100vh-4rem)] hidden md:block shrink-0">
                <CategoryNav
                    activeCategoryId={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] min-w-0">

                {/* Fixed Header & Search */}
                <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 shrink-0">
                    <div className="p-6 max-w-4xl mx-auto space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Method Encyclopedia</h1>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                    Comprehensive reference for Python methods, functions, and concepts.
                                </p>
                            </div>
                        </div>

                        <MethodSearch
                            onResultSelect={handleSearchResult}
                            className="w-full max-w-xl"
                        />
                    </div>
                </div>

                {/* Scrollable Content */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto scroll-smooth"
                >
                    <div className="p-6 max-w-4xl mx-auto pb-20">
                        {activeCategory ? (
                            <MethodUnit
                                category={activeCategory.id}
                                title={activeCategory.name}
                                className="mt-0"
                            />
                        ) : (
                            <div className="text-center py-20 text-muted-foreground">
                                Select a category to browse methods
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
