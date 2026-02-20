'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        primaryColor: '#7c3aed',
        primaryTextColor: '#f5f3ff',
        primaryBorderColor: '#6d28d9',
        lineColor: '#a78bfa',
        secondaryColor: '#1e1b4b',
        secondaryTextColor: '#e0e7ff',
        tertiaryColor: '#312e81',
        tertiaryTextColor: '#c7d2fe',
        mainBkg: '#1e1b4b',
        nodeBorder: '#6d28d9',
        clusterBkg: '#312e81',
        titleColor: '#f5f3ff',
        edgeLabelBackground: '#1e1b4b',
    }
});

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (containerRef.current && chart) {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

            mermaid.render(id, chart).then(({ svg }: { svg: string }) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;

                    // Fix SVG sizing — ensure it fills the container well
                    const svgEl = containerRef.current.querySelector('svg');
                    if (svgEl) {
                        svgEl.style.maxWidth = '100%';
                        svgEl.style.minHeight = '120px';
                        svgEl.style.height = 'auto';
                        svgEl.removeAttribute('height');
                    }
                }
                setError(null);
            }).catch((err: Error) => {
                console.error('Mermaid render error:', err);
                setError(err.message);
            });
        }
    }, [chart]);

    if (error) {
        return (
            <div className="my-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                Failed to render diagram: {error}
            </div>
        );
    }

    return (
        <div className="my-6 w-full overflow-x-auto flex justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-6 shadow-lg">
            <div
                ref={containerRef}
                className="mermaid-container"
                style={{ minWidth: '280px', minHeight: '120px' }}
            />
        </div>
    );
}
