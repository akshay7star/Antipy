# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.3.0] - 2026-05-08

### Added
- **Feature 3 Content Enrichment**: Created 16 new Master-Class MDX lessons for Frameworks (Flask, Django, FastAPI), Databases, and Modern Python Tooling (Module 30).
- **Interactive Quizzes**: Added exactly 10 comprehensive, auto-grading `<InlineQuiz>` elements to every single new lesson, injecting 160 new quizzes into the ecosystem.
- **Deepened DSA Curriculum**: Added expanded lessons for Space Complexity, Prefix Sums, Collision Resolution, LRU Caches, Quick/Merge Sort, Fast/Slow Pointers, Monotonic Stacks, and Dijkstra's Algorithm.

### Fixed
- Fixed JSX attribute escaping compilation errors (`Unexpected character \ in attribute name`) across all MDX lessons containing strict string configurations.
- Fixed 500 compilation errors from trailing commas in InlineQuiz attributes.

## [v0.2.0] - 2026-02-24
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
