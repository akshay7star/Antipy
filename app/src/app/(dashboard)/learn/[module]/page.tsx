
import { getModules } from '@/lib/curriculum';
import { redirect, notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        module: string;
    }>
}

export default async function ModulePage(props: Props) {
    const params = await props.params;
    const modules = await getModules();
    const currentModule = modules.find(m => m.id === params.module);

    if (!currentModule) return notFound();

    if (currentModule.lessons.length > 0) {
        redirect(`/learn/${currentModule.id}/${currentModule.lessons[0].slug.replace('.mdx', '')}`);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{currentModule.title}</h1>
            <p className="text-muted-foreground">No lessons available in this module yet.</p>
        </div>
    );
}
