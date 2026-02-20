'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils'; // Put utils in lib
import { ThemeToggle } from '@/components/ThemeToggle';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
                <Link href="/" className="font-bold text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    AntiPy
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button onClick={() => setIsOpen(true)} className="p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
                    <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card border-r shadow-2xl p-0">
                        <div className="flex justify-end p-4">
                            <button onClick={() => setIsOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <Sidebar className="border-none w-full h-[calc(100%-60px)]" />
                    </div>
                </div>
            )}
        </>
    );
}
