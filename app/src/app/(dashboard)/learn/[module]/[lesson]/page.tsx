import { getModules } from '@/lib/curriculum';
import { notFound } from 'next/navigation';
import { CompileMDX } from '@/components/lesson/CompileMDX';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    params: Promise<{
        module: string;
        lesson: string;
    }>
}

export default async function LessonPage(props: Props) {
    const params = await props.params;
    const modules = await getModules();
    const currentModule = modules.find(m => m.id === params.module);

    if (!currentModule) return notFound();

    const lesson = currentModule.lessons.find(l => l.slug.replace('.mdx', '') === params.lesson);
    if (!lesson) return notFound();

    // Read MDX Content
    const filePath = path.join(process.cwd(), 'src/content/curriculum', currentModule.dirName, `${params.lesson}.mdx`);
    let source = '';
    try {
        const rawSource = await fs.readFile(filePath, 'utf-8');
        // Strip frontmatter (content between --- and --- at start of file)
        source = rawSource.replace(/^---[\s\S]*?---\s*/, '');
    } catch {
        return notFound();
    }

    // Determine Prev/Next Links
    const currentModuleIndex = modules.findIndex(m => m.id === params.module);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.slug.replace('.mdx', '') === params.lesson);

    let prevLink = null;
    let nextLink = null;

    if (currentLessonIndex > 0) {
        prevLink = `/learn/${params.module}/${currentModule.lessons[currentLessonIndex - 1].slug}`;
    } else if (currentModuleIndex > 0) {
        const prevMod = modules[currentModuleIndex - 1];
        if (prevMod.lessons.length > 0) {
            prevLink = `/learn/${prevMod.id}/${prevMod.lessons[prevMod.lessons.length - 1].slug}`;
        }
    }

    if (currentLessonIndex < currentModule.lessons.length - 1) {
        nextLink = `/learn/${params.module}/${currentModule.lessons[currentLessonIndex + 1].slug}`;
    } else if (currentModuleIndex < modules.length - 1) {
        const nextMod = modules[currentModuleIndex + 1];
        if (nextMod.lessons.length > 0) {
            nextLink = `/learn/${nextMod.id}/${nextMod.lessons[0].slug}`;
        }
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Top Bar */}
            <header className="border-b px-6 py-4 flex items-center justify-between bg-card shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/learn" className="text-muted-foreground hover:text-foreground">
                        ← Back
                    </Link>
                    <h1 className="font-semibold text-lg max-w-md truncate">{lesson.title}</h1>
                </div>
                <div className="flex items-center gap-2">
                    {prevLink && (
                        <Link href={prevLink} className="p-2 border rounded hover:bg-secondary">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    )}
                    {nextLink && (
                        <Link href={nextLink} className="p-2 border rounded hover:bg-secondary">
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-6 py-10">
                    <article className="prose prose-slate dark:prose-invert max-w-none">
                        <CompileMDX source={source} />
                    </article>
                </div>
            </div>
        </div>
    );
}

// Generate static params if we wanted static export, but simplistic for now
export async function generateStaticParams() {
    const modules = await getModules();
    const params = [];
    for (const m of modules) {
        for (const l of m.lessons) {
            params.push({ module: m.id, lesson: l.slug.replace('.mdx', '') });
        }
    }
    return params;
}
