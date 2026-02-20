'use client';

import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
    return (
        <div className="h-full min-h-[200px] w-full rounded-md overflow-hidden border">
            <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                onChange={onChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 10 },
                    lineNumbers: "on",
                    roundedSelection: true,
                }}
                loading={<div className="flex items-center justify-center h-full text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Editor...</div>}
            />
        </div>
    );
}
