# 🗺️ AntiPy: The Big Picture Roadmap

This document serves as the "Master Memory" for the AntiPy project. It outlines the vision, completed milestones, and the long-term roadmap to ensure all future development remains aligned with the original mission.

## 🌟 The Vision
AntiPy is designed to be the definitive "Active Learning" platform for Python. Instead of passive video consumption, users maintain streaks by writing real code in an integrated IDE, taking instant-feedback quizzes, and building real-world projects.

---

## 🏗️ Core Architecture (Completed)
- **Frontend**: Next.js 15+ (App Router), Tailwind CSS v4.
- **Runtime**: Pyodide (Python in the browser) for safe, client-side code execution.
- **Styling**: Class-based Dark Mode using `next-themes`.
- **Content Engine**: MDX-driven curriculum with `<InteractiveCode>` and `<InlineQuiz>` components.
- **State**: Zustand for progress tracking, streaks, and XP metadata.

---

## 📍 Where We Are (Current Status)
We have successfully built the core learning flow, a curriculum of 30+ modules, and an automated Git/QA/Content agent system.

---

## 🚀 The Roadmap (Future Phases)

### Phase 3: Content Expansion & Visual Learning
- **Visual Algorithms (In Progress)**: Step-by-step visualizers for Sorting, Linked Lists, Graphs, and Pathfinding.
- **Deep-Dive Graphics**: Integrating Mermaid.js and SVG diagrams into every lesson.
- **Module 30+**: Adding Modern Python Tooling (Pip, Venv, Logging) and specialized frameworks.

### Phase 4: Job-Ready Ecosystem
- **Testing Mastery**: Pytest, fixtures, and parametrized testing.
- **Deployment & DevOps**: Docker basics, CI/CD, and GitHub Actions.
- **Interview Prep**: Dedicated DSA section focusing on common technical interview patterns.

### Phase 5: Specialized Electives
- **Web Automation**: Scraping with BeautifulSoup/Selenium/Playwright.
- **CLI Tools**: Building professional command-line apps with Click/Typer.
- **Design Patterns**: Real-world implementation of Singleton, Factory, and Observer patterns.

### Phase 6: Desktop & Capstone
- **GUI Apps**: Tkinter and Modern UI (CustomTkinter) development.
- **Final Projects**: 8 comprehensive "Capstone" projects that use everything learned in the course.

---

## 🤖 AI Development Notes
- **Local Memory**: Detailed task tracking lives in `task.md` and `.project_history/`.
- **Versioning Policy**: All GitHub commits follow the simple `AntiPy vX.Y` format. Version numbers are bumped in `package.json` before each major push.
- **Ignore Policy**: All AI-specific workflows (`.agents/`) and metadata are excluded from GitHub to maintain a clean, professional profile for the user.
