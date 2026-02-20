'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Code, Home, Settings, Trophy, Menu, Library } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProgressStore } from '@/lib/store';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Learn', href: '/learn', icon: BookOpen },
    { label: 'Practice', href: '/practice', icon: Code },
    { label: 'Methods', href: '/methods', icon: Library },
    { label: 'Projects', href: '/projects', icon: Trophy },
    { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { streak, points } = useProgressStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <aside className={cn("flex flex-col h-full bg-card border-r w-64", className)}>
            <div className="p-6 border-b flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    AntiPy
                </h1>
                <ThemeToggle />
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Stats</p>
                        <span className="text-xs font-mono text-primary font-bold">{mounted ? points : 0} XP</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden border border-border">
                            {/* Simple visualization: 20% per day of streak up to 5 days */}
                            <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${Math.min((mounted ? streak : 0) * 20, 100)}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-orange-500 whitespace-nowrap">{mounted ? streak : 0} 🔥</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
