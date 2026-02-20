import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/curriculum');

export interface Lesson {
    slug: string;
    title: string;
    description?: string;
    order: number;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    order: number;
    dirName: string;
    lessons: Lesson[];
}

export async function getModules(): Promise<Module[]> {
    const items = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

    // Filter for directories (modules)
    const moduleDirs = items.filter(item => item.isDirectory());

    const modules: Module[] = [];

    for (const dir of moduleDirs) {
        try {
            // Read meta.json
            const metaPath = path.join(CONTENT_DIR, dir.name, 'meta.json');
            const metaContent = await fs.readFile(metaPath, 'utf-8');
            const meta = JSON.parse(metaContent);

            // Get Lessons inside
            const lessonFiles = await fs.readdir(path.join(CONTENT_DIR, dir.name));
            const lessons: Lesson[] = [];

            for (const file of lessonFiles) {
                if (file.endsWith('.mdx')) {
                    // Quick parse for frontmatter (simple regex to avoid heavy deps here)
                    const content = await fs.readFile(path.join(CONTENT_DIR, dir.name, file), 'utf-8');
                    const frontmatterRegex = /---\r?\n([\s\S]*?)\r?\n---/;
                    const match = content.match(frontmatterRegex);

                    let title = file.replace('.mdx', '');
                    let order = 99;
                    let description = "";

                    if (match) {
                        const fm = match[1];
                        const titleMatch = fm.match(/title:\s*"(.*)"/);
                        const orderMatch = fm.match(/order:\s*(\d+)/);
                        const descMatch = fm.match(/description:\s*"(.*)"/);

                        if (titleMatch) title = titleMatch[1];
                        if (orderMatch) order = parseInt(orderMatch[1]);
                        if (descMatch) description = descMatch[1];
                    }

                    lessons.push({
                        slug: file.replace('.mdx', ''),
                        title,
                        description,
                        order
                    });
                }
            }

            lessons.sort((a, b) => a.order - b.order);

            modules.push({
                ...meta,
                dirName: dir.name,
                lessons
            });
        } catch (e) {
            console.error(`Error loading module ${dir.name}:`, e);
        }
    }

    modules.sort((a, b) => a.order - b.order);
    return modules;
}
