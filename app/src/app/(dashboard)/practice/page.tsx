import Link from 'next/link';
import { Code, ArrowRight, Zap } from 'lucide-react';
import { getModules } from '@/lib/curriculum';

export default async function PracticePage() {
    const modules = await getModules();

    // Collect lessons that have challenges (for now, show all lessons as potential practice)
    const challenges = modules.flatMap(mod =>
        mod.lessons.map(lesson => ({
            moduleId: mod.id,
            moduleTitle: mod.title,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
        }))
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Code className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">Practice</h1>
                </div>
                <p className="text-muted-foreground">
                    Sharpen your Python skills with interactive challenges.
                    <br />
                    <span className="text-sm text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded mt-2 inline-block">
                        🚧 Dedicated Practice Mode Coming Soon (Feature 3 & 4)
                    </span>
                </p>
            </div>

            <div className="grid gap-3">
                {modules.map((mod) => (
                    <div key={mod.id} className="border rounded-xl p-4 bg-card">
                        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            {mod.title}
                        </h2>
                        <div className="grid gap-2">
                            {mod.lessons.map((lesson) => (
                                <Link
                                    key={lesson.slug}
                                    href={`/learn/${mod.id}/${lesson.slug}`}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors group"
                                >
                                    <span className="text-sm font-medium">{lesson.title}</span>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
