import Link from 'next/link';
import { getModules } from '@/lib/curriculum';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic'; // For dev reloads

export default async function LearnPage() {
    const modules = await getModules();

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Learning Path</h1>
                <p className="text-muted-foreground">Your journey from Zero to Hero.</p>
            </div>

            <div className="grid gap-6">
                {modules.map((mod) => (
                    <div key={mod.id} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {mod.order}
                            </span>
                            <h2 className="text-xl font-bold">{mod.title}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pl-0 md:pl-11">
                            {mod.lessons.map((lesson) => (
                                <Link
                                    key={lesson.slug}
                                    href={`/learn/${mod.id}/${lesson.slug.replace('.mdx', '')}`}
                                    className="group block"
                                >
                                    <div className="h-full p-5 rounded-xl border bg-card hover:border-primary/50 transition-all hover:shadow-md relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Lesson {lesson.order}</span>
                                            {/* Status Icon Placeholder */}
                                            {/* <CheckCircle className="w-4 h-4 text-green-500" /> */}
                                        </div>
                                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {lesson.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
