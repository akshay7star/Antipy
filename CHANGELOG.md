# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.2.0] - 2026-02-24

### Added
- **DSA Visualizers**: 8 brand new components illustrating Trees, Stacks, Queues, Linked Lists, HashMap distribution, Big O Graphs, and Dynamic Programming Execution.
- **100% Visual Coverage**: Built an auto-injection script to guarantee that all 48 Markdown (MDX) lessons contain a corresponding interactive `Visualizer` element.
- **Responsive Animations**: Replaced restrictive overflow bounds with adaptive horizontal scrollbars (`overflow-x-auto`) for all 20+ animation components to ensure they render beautifully on mobile devices.

### Fixed
- Fixed an unescaped JSX character `>` in `DPVisualizer.tsx`.
- Resolved missing `framer-motion` imports and dependencies.
- Adjusted Memory Heap object stacking behavior in `OOPVisualizer` to warp safely on smaller viewports.

## [v0.1.0]

### Added
- Core curriculum (48 lessons spanning 29 modules).
- Interactive Monaco Editor environment mimicking VS Code.
- Client-side MDX Compiler.
- In-browser code testing using Pyodide (WebAssembly).
- Initial visualizers (Control Flow, Variables, etc.).
