import { Settings, Construction } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Settings</h1>
            <p className="text-muted-foreground max-w-md mb-6">
                Theme preferences, profile, and notification settings are coming soon.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                <Construction className="w-4 h-4" />
                Under Construction
            </div>
        </div>
    );
}
