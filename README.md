<div align="center">
  <img src="/app/public/logo.png" alt="AntiPy Logo" width="120" style="border-radius: 20px" onerror="this.style.display='none'"/>
  <h1>🐍 AntiPy</h1>
  <p><b>The interactive Python learning platform that builds your skills and your streak.</b></p>
  <br/>
</div>

## 🚀 Welcome to AntiPy

Learning to code shouldn't mean passively watching 10-hour video tutorials. **You learn to code by coding.** 

AntiPy is an entirely browser-based, gamified learning environment designed to take you from a complete Python beginner to an advanced developer through **active learning**.

### ✨ What makes AntiPy different?

- **🖥️ Built-in Pro Editor**: Write and run code directly in your browser. We use the Monaco Editor (the exact same engine that powers VS Code), giving you syntax highlighting, autocomplete, and a real terminal output.
- **🎨 Interactive Visualizers**: Memory pointers, Call Stacks, and Algorithm behaviors are completely animated. You don't just *read* about how a `list` works in memory; you *see* it.
- **🏆 Gamified Progress**: Earn XP, level up, and maintain your daily streak to stay glued to your learning goals.
- **🧠 Instant Feedback**: Embedded quizzes and interactive coding challenges test your knowledge immediately after you learn a concept.

---

## 🗺️ The Curriculum

AntiPy is structured into carefully paced modules. You'll master:

1. **The Basics**: Variables, Data Types, and the interpreted execution model.
2. **Control Flow**: Navigating the logic tree with `if/else`, `for`, and `while` loops.
3. **Data Structures**: Lists, Dictionaries, Sets, and Tuples.
4. **Functions & Scope**: Def, Parameters, Return values, and the Call Stack.
5. **Object-Oriented Programming (OOP)**: Classes, Inheritance, Polymorphism, and abstract blueprints.
6. **Advanced Data Structures & Algorithms**: Recursion, Sorting, Linked Lists — all fully visualized.
7. *(Coming Soon)* **Modern Engineering**: Virtual Environments, Python Tooling, Web Frameworks (FastAPI/Flask).

---

## ⚡ Quick Start (1-Command Install)

Want to run AntiPy on your local machine instantly? Run a single command in your terminal depending on your Operating System:

### 🍎 macOS & 🐧 Linux (Terminal)
```bash
bash <(curl -s https://raw.githubusercontent.com/akshay7star/Antipy/main/install.sh)
```

### 🪟 Windows (PowerShell)
```powershell
Invoke-Expression (Invoke-WebRequest -Uri "https://raw.githubusercontent.com/akshay7star/Antipy/main/install.ps1" -UseBasicParsing).Content
```

These scripts will automatically:
1. Initialize a clean local environment in a new `antipy-app` folder.
2. Automate full dependency resolution and installation of all required packages.
3. Launch the interactive development server at `http://localhost:3000`.

---

## 🛠 Manual Installation

If you prefer to clone and install manually, ensure you have **Node.js 18+** installed.

```bash
git clone https://github.com/akshay7star/Antipy.git
cd Antipy/app
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to launch the platform!

---

## 🏗 Under the Hood (Tech Stack)

AntiPy is built using modern web development standards:
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + `next-themes` for seamless Dark/Light modes.
- **Editor Integration**: `@monaco-editor/react` (Microsoft's exact VS Code editor)
- **Interactive Markdown**: `next-mdx-remote` allows us to embed React Visualizers directly into our lesson text.

---

## 📅 Changelog & Latest Updates
*   **v0.2.0**: Added 8 robust Data Structures & Algorithms Visualizers, responsive layout fixes, and achieved **100% Interactive Visualizer Coverage** across all 48 lessons!
*   **v0.1.0**: Initial Release - Core curriculum, Monaco Editor, and Light/Dark Mode implemented.
