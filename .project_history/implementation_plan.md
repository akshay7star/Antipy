# Implementation Plan: Visual Algorithms (Feature 2)

## Goal Description
The user wants to implement interactive "step-by-step" algorithm visualizers for core developer concepts, specifically Sorting Algorithms and Linked Lists, to enhance the "Active Learning" experience of the AntiPy platform. We will build robust React components that can be embedded directly inside the MDX lessons.

## User Review Required
> [!IMPORTANT]  
> Please review the proposed visualizer features. Are there any specific sorting algorithms you want covered besides Bubble and Merge Sort? Let me know if you want the Linked List visualizer to include Doubly Linked Lists or just Singly Linked Lists for now.

## Proposed Changes

### 1. Interactive Components (The Visualizers)
We will create two new client-side React components in the `app/src/components/lesson/` directory.

#### [NEW] [SortingVisualizer.tsx](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/components/lesson/SortingVisualizer.tsx)
- **Features**: Visual representation of an array as vertical blocks/bars of varying heights.
- **Controls**: "Generate New Array", "Play", "Pause", "Step Forward", and an "Algorithm" dropdown.
- **Algorithms Included**: Bubble Sort, Selection Sort, and Insertion Sort (to start).
- **Animations**: Colors will change to highlight the elements currently being compared or swapped (e.g., Red for compare, Green for sorted).

#### [NEW] [LinkedListVisualizer.tsx](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/components/lesson/LinkedListVisualizer.tsx)
- **Features**: Horizontal visualization of nodes containing values, connected by directed arrows.
- **Controls**: "Append Node", "Prepend Node", "Delete Target", "Reverse List".
- **Visual Pointers**: Animated labels indicating where the `head`, `curr`, and `prev` pointers are currently pointing to help users understand the underlying mechanics of iterating or reversing a list.

### 2. MDX Registration
#### [MODIFY] [CompileMDX.tsx](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/components/lesson/CompileMDX.tsx)
- Import `SortingVisualizer` and `LinkedListVisualizer`.
- Add them to the global `components` registry so they can be written directly inside the `.mdx` content files like `<SortingVisualizer />`.

### 3. Curriculum Content Integration
We will update the curriculum to feature these new visualizers.

#### [NEW] [02-sorting-algorithms.mdx](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/content/curriculum/25-recursion-sorting/02-sorting-algorithms.mdx)
- Create a new lesson dedicated to O(n^2) and O(n log n) sorting algorithms.
- Embed the new `<SortingVisualizer />` at the top of the lesson.

#### [MODIFY] [meta.json](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/content/curriculum/25-recursion-sorting/meta.json)
- Register `02-sorting-algorithms` in the module's metadata so it appears in the sidebar.

#### [MODIFY] [01-visualizing-pointers.mdx](file:///c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti%20learning%20platform/app/src/content/curriculum/26-linked-lists/01-visualizing-pointers.mdx)
- Add a section near the middle of the lesson to embed the newly built `<LinkedListVisualizer />` alongside the text explanations.

### Feature 3: Content Enrichment (OOP Expansion & Deep Dives)
We are massively expanding the Object-Oriented Programming module (08) to be the most comprehensive module in the curriculum.

#### 1. Deeper Conceptual Content
We will add significantly more depth, real-world analogies, edge-case analysis, and "under-the-hood" Python mechanics to all 9 OOP lessons. 

#### 2. Interactive `OOPVisualizer.tsx`
To make these abstract concepts tangible, we will build an interactive visualizer specifically for OOP.
- **Features**: Visual representations of Classes (Blueprints), Objects (Instances in memory), and passing interactions.
- **Concepts Visualized**: 
  - *Instantiation*: Watch objects spawn from class blueprints with memory pointer arrows.
  - *Inheritance & MRO*: Visually trace how Python searches for a method (checking the instance, then the child class, then the parent class).
  - *Polymorphism*: Click "execute method on all" and watch the router dynamically pick the correct overridden behavior.
- **Integration**: The visualizer will be registered in `CompileMDX` and embedded directly into the OOP lessons, allowing students to "play" with the concepts they just read about.

#### [UPDATED] OOP Curriculum Map
- `01-classes.mdx` (Adding OOPVisualizer - Instantiation mode)
- `02-magic-methods.mdx` (Dunder methods, object lifecycle)
- `03-inheritance.mdx` (Adding OOPVisualizer - Inheritance mode)
- `04-polymorphism.mdx` (Adding OOPVisualizer - Polymorphism/Dynamic Dispatch mode)
- `05-encapsulation.mdx` (Public/Private variables, Property Getters/Setters)
- `06-class-static-methods.mdx` (@classmethod, @staticmethod)
- `07-multiple-inheritance.mdx` (Mixins, Method Resolution Order)
- `08-dataclasses.mdx` (@dataclass, the modern way)
- `09-abstract-classes.mdx` (Abstract Base Classes, the `abc` module)

### Feature 4: Global Visualizations (Interactive Curriculum)
We will create and embed interactive React visualizers across ALL modules in the curriculum to ensure every lesson has a fun, interactive graphics component.

#### Completed Visualizers:
- **`VariablesVisualizer.tsx`**: Memory boxes storing values, representing pointers vs primitive types (Module 01).
- **`ControlFlowVisualizer.tsx`**: A flowchart where a token moves dynamically through `if/else` and `for/while` loop branches (Module 02).
- **`FunctionsVisualizer.tsx`**: Visualize the call stack, arguments passing into parameters, and return values popping (Module 03).
- **`DataStructuresVisualizer.tsx`**: Arrays, Maps (Hash tables), Tuples, and Sets visual representations (Module 04).
- **`OOPVisualizer.tsx`**: Instantiation, Inheritance, Polymorphism (Module 08).
- **`SortingVisualizer.tsx`**: Array sorting algorithms (Module 25).
- **`LinkedListVisualizer.tsx`**: Pointer manipulation for Linked Lists (Module 26).

#### Phase 2 Planned Visualizers (Comprehensive Coverage):
- **`StringsVisualizer.tsx`**: Slicing, indexing, and immutability (Module 05).
- **`FileSystemVisualizer.tsx`**: File I/O streams and virtual file system (Module 06).
- **`ExceptionsVisualizer.tsx`**: Try/Except propagation up the call stack (Module 07).
- **`ImportsVisualizer.tsx`**: Namespaces and module importing (Module 09).
- **`GeneratorsVisualizer.tsx`**: Yield execution and state suspension (Module 10).
- **`FunctionalVisualizer.tsx`**: Map, Filter, Reduce applying transforms to collections (Module 11).

#### Phase 3 Planned Visualizers (100% Lesson Coverage Initiative):
The user requested that EVERY single lesson have a custom visual element. We will proceed module by module, lesson by lesson.

**Module 01: Getting Started**
- `01-interpreter.mdx`: Execution Flow (Source -> Bytecode -> VM)
- `02-variables.mdx`: Variables as Pointers (Existing `VariablesVisualizer`)
- `03-data-types.mdx`: Data Types Memory Layout (Int, Float, Str, Bool)
- `04-basic-operators.mdx`: Abstract Syntax Tree (AST) Math Evaluation

**Module 02: Control Flow**
- `01-conditionals.mdx`: If/Elif/Else Branching (Existing `ControlFlowVisualizer`)
- `02-for-loops.mdx`: Iteration over collections
- `03-while-loops.mdx`: Condition checking and infinite loop traps
- `04-match-case.mdx`: Structural Pattern Matching

*(We will continue mapping future modules as we progress through them)*

#### Strategy for Visualizer Injection:
For each module:
1. Identify the core interactive hook.
2. Build the visualizer component.
3. Register it in `CompileMDX.tsx`.
4. Inject it into the corresponding `*.mdx` lesson files.

## Git Agent & README Refinements
Based on user feedback, we will:
1. Proceed with the proposed README structure tailored for learners.
2. Ensure the `/git-agent` incorporates all features: Smart Commits, Changelogs, Pre-push Testing, and Version Bumping.

## Verification Plan
### Automated Tests
- N/A - we will rely on visual inspection via the browser tools run by the `/qa-agent` (fallback to manual if CDP connection errors persist).

### Manual Verification
1. Load `/content/curriculum/08-oop` in browser.
2. Verify sidebar loads 9 distinct lessons.
3. Test all interactive scenarios in the new `OOPVisualizer` (Instantiation, Inheritance, Polymorphism).
4. Verify quizzes register clicks correctly.
