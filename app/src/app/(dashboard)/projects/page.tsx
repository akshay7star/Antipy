import { Rocket, Construction } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Capstone Projects</h1>
            <p className="text-muted-foreground max-w-md mb-6">
                Build real-world Python projects — from CLI tools to web scrapers.
                Launching soon!
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                <Construction className="w-4 h-4" />
                Under Construction
            </div>
        </div>
    );
}
