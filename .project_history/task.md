# Tasks: Interactive Python Learning Platform

- [x] **Plan & Design**
    - [x] Create comprehensive Product Design Document (Sections A-I)
    - [x] Create Technical Implementation Plan for MVP
- [x] **Project Setup (Tech & Implementation)**
    - [x] Initialize repository and project structure
    - [x] Setup Frontend (Next.js + Tailwind v4)
    - [x] Setup Backend (Integrated into Next.js/Pyodide)
    - [x] **Repository Refinement** (Push to GitHub, Author identity fix, Clean history)
- [x] **MVP Phase 1: Core Learning Flow**
    - [x] Implement Mobile-First Responsive Layout
    - [x] Build Course Navigation & Module Structure
    - [x] Develop "Getting Started" Module Content & UI
    - [x] Implement Basic Interactive Code Blocks
    - [x] Populate Curriculum Placeholders (All 15 Modules)
- [x] **MVP Phase 2: Practice & Progress**
    - [x] Develop In-browser Code Editor with Auto-checker
    - [x] Implement User Progress Tracking
    - [x] **Theme & UI Polish** (Dark/Light Mode, MethodCard contrast fixes, Hydration fixes)
- [x] **Cleanup Sprint**
    - [x] Fix Pyodide scope pollution & cleanup crash
    - [x] Fix MDX compilation crashes (imports, curly braces, JSX attrs)
    - [x] Fix hydration error in MethodUnit (removed invalid useMemo)
    - [x] All other cleanup tasks complete

---

## Phase 3: Content Expansion & Features

### Feature 1: Curriculum Expansion (Integration of Method Index) <!-- status: complete -->
- [x] F1-A1: Create method-index data layer (complete)
- [x] F1-A2: Map 28 categories to modules and create new modules 16-21
- [x] F1-A3: Build <MethodUnit /> component and expand all MDX lessons
- [x] F1-A4: Verify curriculum coverage (Methods module restored per user request)
- [x] F1-A5: Standardize method-index data types (edgeCases -> string[])
- [x] F1-A6: Scale Quizzes (10 per lesson) across all 48 lessons (480 total quizzes)

### Feature 2: DSA & Visual Algorithms <!-- status: complete -->
- [x] F2-A1: Create DSA modules (22-29) with "Visual Learning" focus
- [x] F2-A2: Integrate Mermaid/SVG diagrams for Trees, Graphs, Sorting
- [x] F2-A3: Build interactive algorithm visualizers (Step-by-step execution)
- [x] F2-A4: Write deep-dive content for Big O, Arrays, Maps, Recursion

### Feature 3: Content Enrichment & Graphics (The "Anti-Learning" Polish) <!-- status: in-progress -->
- [x] F3-A1: Expand OOP Module (08) with 9 new deep-dive lessons + Graphics (Including Abstract Classes, Overloading, Inheritance Types)
- [ ] F3-A2: Create Module 30: "Modern Python Tooling" (Type Hinting, Pip, Venv, Logging)
- [ ] F3-A3: Expand Framework Modules (Flask/Django/FastAPI) - Add Routing, Templates, Auth lessons
- [ ] F3-A4: Expand DB Module - Add Migrations, Raw SQL vs ORM, Relationships

### Feature 4: Global Visualizations
- [x] Create OOPVisualizer (Instantiation, Inheritance, Polymorphism)
- [x] Create VariablesVisualizer (Pointers and primitive types)
- [x] Create ControlFlowVisualizer (if/elif/else branching paths)
- [x] Create FunctionsVisualizer (Call stack and parameters)
- [x] Create DataStructuresVisualizer (Lists, Dicts, Sets)
- [x] Inject Visualizers into 01-getting-started, 02-control-flow, 03-functions, 04-collections, 08-oop
- [x] Create FunctionalVisualizer (Map, Filter)
- [x] Create StringsVisualizer (Slicing, Methods)
- [x] Create FileSystemVisualizer (File I/O)
- [x] Create ExceptionsVisualizer (Try/Except)
- [x] Create GeneratorsVisualizer (Yield)
- [x] Create ImportsVisualizer (Modules)
- [x] Global Visualizer Responsive Sizing Fix (Replaced tight overflow restrictions with scrollable containers)
- [ ] F3-A5: Global "Visual Upgrade" - Add diagrams to ALL 30 modules

### Feature 5: 100% Visual Lesson Coverage (Module by Module) <!-- status: complete -->
- [x] **Module 01: Getting Started**
  - [x] Create/Update 01-interpreter (Interpreter Flow Visualizer)
  - [x] Create/Update 02-builtins (Variables Pointer Visualizer)
  - [x] Create/Update 03-keywords (Keywords Visualizer)
  - [x] Create/Update 04-basic-operators (AST Evaluation Visualizer)
- [x] **Module 02: Control Flow**
  - [x] Create/Update 01-conditionals (Control Flow Visualizer)
  - [x] Create/Update 02-loops (Loops Visualizer)
  - [x] Create/Update 03-operators (Operators Visualizer)

- [x] **Module 04: Collections (Data Structures)**
  - [x] Create/Update 01-lists (DataStructuresVisualizer - Lists)
  - [x] Create/Update 02-tuples (Tuples Visualizer)
  - [x] Create/Update 03-dictionaries (DataStructuresVisualizer - Dicts)
  - [x] Create/Update 04-sets (DataStructuresVisualizer - Sets)
- [x] **Module 05: Strings**
  - [x] Create/Update 01-methods (Strings Visualizer)
  - [x] Create/Update 02-formatting (Formatting Visualizer)
- [x] **Module 06: File System**
  - [x] Create/Update 01-reading-writing (FileSystemVisualizer)
  - [x] Create/Update 02-paths-directories (FileSystemVisualizer)
- [x] **Module 07: Error Handling**
  - [x] Create/Update 01-exceptions (Exceptions Visualizer)
- [x] **Module 08: Object-Oriented Programming**
  - [x] Create/Update lessons (OOP Visualizer added previously)
- [x] **Module 09: Imports & Modules**
  - [x] Create/Update 01-imports-namespaces (Imports Visualizer)
- [x] **Module 10: Iterators & Generators**
  - [x] Create/Update 01-generators (Generators Visualizer)
- [x] **Module 11: Functional Programming**
  - [x] Create/Update 01-map-filter-reduce (Functional Visualizer)

- [x] **Module 12: Standard Library**
  - [x] Create/Update 01-collections (Stdlib Visualizer)
  - [x] Create/Update 02-math-random (Stdlib Visualizer)
  - [x] Create/Update 03-datetime (Stdlib Visualizer)
  - [x] Create/Update 04-os-sys (Stdlib Visualizer)
- [x] **Module 13: Advanced Concepts**
  - [x] Create/Update 01-async (Concurrency Visualizer)
  - [x] Create/Update 02-decorators (Decorators Visualizer)
  - [x] Create/Update 01-context-managers
  - [x] Create/Update 02-regex
- [x] **Module 14: APIs & Web Data**
  - [x] Create/Update 01-json
  - [x] Create/Update 02-csv
  - [x] Create/Update 02-requests
- [x] **Module 15: Testing Basics**
  - [x] Create/Update 01-unittest
  - [x] Create/Update 02-debugging
- [x] **Module 16 and Beyond: Frameworks**
  - [x] Use interactive-code effectively
- [x] **Algorithms & Data Structures**
  - [x] Create/Update M22 01-time-complexity (BigOVisualizer)
  - [x] Create/Update M23 01-two-pointers (TwoPointersVisualizer)
  - [x] Create/Update M24 01-hash-tables (HashMapVisualizer)
  - [x] Create/Update M25 01-recursion-stack (FunctionsVisualizer)
  - [x] Create/Update M25 02-sorting-algorithms (SortingVisualizer)
  - [x] Create/Update M26 01-visualizing-pointers (LinkedListVisualizer)
  - [x] Create/Update M27 01-lifo-fifo (StacksQueuesVisualizer)
  - [x] Create/Update M28 01-binary-trees (TreeVisualizer)
  - [x] Create/Update M29 01-memoization (DPVisualizer)

### Feature 6: Desktop GUI Apps <!-- status: planning -->
- [ ] F6-A1: Create Module 36: "GUI Basics with Tkinter" (Windows, Widgets, Events)
- [ ] F6-A2: Create Module 37: "Modern Desktop Apps" (CustomTkinter or PyQt6 basics)
- [ ] F6-A3: Build a standalone .exe generator lesson (PyInstaller)

### Feature 7: Capstone Projects <!-- status: not-started -->
- [ ] F7-A1: Create projects-data.ts with all 8 project definitions
- [ ] F7-A2: Build ProjectCard, ProjectStep, StepProgress components
- [ ] F7-A3: Build project dashboard and project pages
- [ ] F7-A4: Test all 8 projects load, steps execute, validation works

### Feature 8: Challenge Types <!-- status: not-started -->
- [ ] F8-A1: Build FixTheBug, FillInBlank, Prediction components
- [ ] F8-A2: Create challenge data (2-3 per type per module)
- [ ] F8-A3: Register in MDX, embed in lessons
- [ ] F8-A4: Test each challenge type end-to-end

### Feature 9: Quiz System <!-- status: complete -->
- [x] F9-A1: Build InlineQuiz component with feedback, XP award, explanation
- [x] F9-A2: Extend store.ts with completedQuizzes tracking
- [x] F9-A3: Register InlineQuiz in CompileMDX, embed 15 quizzes across lessons
- [x] F9-A4: Verify all 15 quiz pages render correctly (15/15 passed)

### Feature 10: Settings <!-- status: not-started -->
- [ ] F10-A1: Create settings-store.ts, install next-themes, ThemeProvider
- [ ] F10-A2: Build full settings page with all 9 options
- [ ] F10-A3: Wire settings to CodeEditor, layout, InteractiveCode
- [ ] F10-A4: Test all settings persist and apply

### Feature 11: Dashboard <!-- status: not-started -->
- [ ] F11-A1: Build ResumeCard, StatsBar, ModuleGrid, RecentActivity, DailyGoal
- [ ] F11-A2: Extend store.ts with activity log, quiz tracking, daily goal
- [ ] F11-A3: Redesign /learn page with dashboard components
- [ ] F11-A4: Test stats, resume nav, progress bars
