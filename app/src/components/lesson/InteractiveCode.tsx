'use client';

import { useState } from 'react';
import { usePyodide } from '@/components/editor/PyodideProvider';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/lib/store';

interface InteractiveCodeProps {
    children?: React.ReactNode;
    code?: string;
    testCode?: string;
    lessonId?: string;
}

export function InteractiveCode({ children, code: codeProp, testCode, lessonId }: InteractiveCodeProps) {
    // Prefer `code` prop (set by CompileMDX preprocessor), fallback to children
    const rawCode = codeProp ?? (typeof children === 'string' ? children : '');
    // Strip zero-width spaces that may have been inserted by older MDX escaping
    const initialCode = rawCode.trim().replace(/\u200B/g, '');
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { pyodide, isLoading: isPyodideLoading } = usePyodide();
    const completeLesson = useProgressStore(state => state.completeLesson);

    const handleRun = async () => {
        if (!pyodide || isPyodideLoading) return;

        setOutput([]);
        setIsRunning(true);
        setStatus('idle');

        let hasError = false;
        let testPassed = false;
        let validationError = "";

        // Reset output handlers to capture current run
        const handleOutput = (msg: string) => {
            if (msg.includes("__TEST_PASS__")) {
                testPassed = true;
            } else if (msg.includes("__TEST_FAIL__:")) {
                validationError = msg.split("__TEST_FAIL__:")[1].trim();
            } else {
                if (!msg.includes("__TEST_FAIL__") && !msg.includes("__TEST_PASS__")) {
                    setOutput(prev => [...prev, msg]);
                }
            }
        };

        const handleError = (msg: string) => {
            setOutput(prev => [...prev, `Error: ${msg}`]);
            hasError = true;
        };

        pyodide.setStdout({ batched: (msg) => handleOutput(msg + "\n") });
        pyodide.setStderr({ batched: (msg) => handleError(msg + "\n") });

        // Combine code if testing
        let codeToRun = code;

        // CLEANUP: Clear user variables from previous runs to avoid state pollution
        const cleanupCode = `
_keep = {'__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', '_pyodide_core'}
for _k in [k for k in list(globals().keys()) if k not in _keep]:
    try:
        del globals()[_k]
    except KeyError:
        pass
`;
        codeToRun = `${cleanupCode}\n${code}`;

        if (testCode) {
            const safeTestCode = `
try:
${testCode.split('\n').map(line => '    ' + line).join('\n')}
    print("__TEST_PASS__")
except AssertionError as e:
    print(f"__TEST_FAIL__:{e}")
except NameError as e:
    print(f"__TEST_FAIL__:Variable missing! {e}. Make sure you keep the starter variables.")
except Exception as e:
    print(f"__TEST_FAIL__:{e}")
`;
            codeToRun = `${codeToRun}\n\n${safeTestCode}`;
        }

        try {
            // Use runPythonAsync directly to ensure single context
            await pyodide.runPythonAsync(codeToRun);
        } catch (err: any) {
            // Error usually caught by stderr handler, but just in case
            if (!hasError) {
                setOutput(prev => [...prev, `Error: ${err}`]);
                hasError = true;
            }
        }

        if (testCode && !hasError) {
            if (testPassed) {
                setOutput(prev => [...prev, '\n✅ Correct! Well done.']);
                setStatus('success');
                if (lessonId) completeLesson(lessonId);
            } else if (validationError) {
                setOutput(prev => [...prev, `\n❌ Validation Failed: ${validationError}`]);
                setStatus('error');
            } else {
                if (!hasError) setStatus('idle');
            }
        }

        setIsRunning(false);
    };

    const handleReset = () => {
        setCode(initialCode);
        setOutput([]);
        setStatus('idle');
    };

    return (
        <div className={cn(
            "my-8 border rounded-xl overflow-hidden shadow-sm bg-card flex flex-col md:flex-row h-[500px] md:h-[400px] transition-colors",
            status === 'success' && "border-green-500 ring-1 ring-green-500",
            status === 'error' && "border-red-500"
        )}>
            {/* Editor Side */}
            <div className="flex-1 flex flex-col border-r border-border min-w-0">
                <div className="bg-muted/30 px-4 py-2 border-b flex justify-between items-center shrink-0 h-10 md:h-12">
                    <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", status === 'error' ? "bg-red-500" : (status === 'success' ? "bg-green-500" : "bg-yellow-500"))}></div>
                        main.py
                        {testCode && (
                            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                Challenge
                            </span>
                        )}
                    </span>
                    <div className="flex items-center gap-1">
                        <button onClick={handleReset} className="p-1.5 hover:bg-secondary rounded text-muted-foreground transition-colors" title="Reset Code">
                            <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <CodeEditor code={code} onChange={(val) => setCode(val || '')} />
                </div>
            </div>

            {/* Output Side */}
            <div className="flex-1 md:w-[40%] flex flex-col bg-slate-950 min-w-0">
                <div className="bg-slate-900 border-b border-white/10 px-4 py-2 flex justify-between items-center shrink-0 h-10 md:h-12">
                    <span className="text-xs font-mono font-medium text-slate-400">Terminal</span>
                    <button
                        onClick={handleRun}
                        disabled={isRunning || isPyodideLoading}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all",
                            isRunning
                                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                    >
                        {isRunning ? (
                            <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play className="w-3 h-3 fill-current" />
                                Run
                            </>
                        )}
                    </button>
                </div>
                <div className="flex-1 p-4 font-mono text-xs overflow-auto text-slate-300">
                    {output.length === 0 ? (
                        <span className="text-slate-600 italic">Output will appear here...</span>
                    ) : (
                        output.map((line, i) => (
                            <div key={i} className={cn("whitespace-pre-wrap", line.startsWith('Error') || line.includes('Failed') || line.includes('❌') ? "text-red-400" : (line.includes('Correct') || line.includes('✅') ? "text-green-400" : ""))}>
                                {line}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
