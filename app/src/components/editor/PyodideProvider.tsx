'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Define Pyodide types roughly
interface PyodideInterface {
    runPython: (code: string) => any;
    runPythonAsync: (code: string) => Promise<any>;
    loadPackage: (names: string | string[]) => Promise<void>;
    globals: any;
    setStdout: (options: { batched: (msg: string) => void }) => void;
    setStderr: (options: { batched: (msg: string) => void }) => void;
}

interface PyodideContextType {
    pyodide: PyodideInterface | null;
    isLoading: boolean;
    error: string | null;
    runCode: (code: string, onOutput: (text: string) => void, onError: (text: string) => void) => Promise<void>;
}

const PyodideContext = createContext<PyodideContextType>({
    pyodide: null,
    isLoading: true,
    error: null,
    runCode: async () => { },
});

export function usePyodide() {
    return useContext(PyodideContext);
}

export function PyodideProvider({ children }: { children: React.ReactNode }) {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function initPyodide() {
            try {
                // Note: For now we assume a script tag in layout or use next/script, 
                // but importing 'pyodide' npm package usually just gives types or loader.
                // Actually, the best way for client-side is loading the script from CDN 
                // and using window.loadPyodide.

                if (typeof window === 'undefined') return;

                // Check if script is already there
                if (!(window as any).loadPyodide) {
                    const script = document.createElement('script');
                    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
                    script.async = true;
                    document.body.appendChild(script);

                    await new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                    });
                }

                const pyodideInstance = await (window as any).loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                });

                if (mounted) {
                    setPyodide(pyodideInstance);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Failed to load Pyodide", err);
                if (mounted) {
                    setError("Failed to load Python environment.");
                    setIsLoading(false);
                }
            }
        }

        initPyodide();

        return () => {
            mounted = false;
        }
    }, []);

    const runCode = async (code: string, onOutput: (text: string) => void, onError: (text: string) => void) => {
        if (!pyodide) return;

        // Capture output
        pyodide.setStdout({ batched: (msg) => onOutput(msg + "\n") });
        pyodide.setStderr({ batched: (msg) => onError(msg + "\n") });

        try {
            await pyodide.runPythonAsync(code);
        } catch (err: any) {
            onError(err.toString());
        }
    };

    return (
        <PyodideContext.Provider value={{ pyodide, isLoading, error, runCode }}>
            {children}
        </PyodideContext.Provider>
    );
}
