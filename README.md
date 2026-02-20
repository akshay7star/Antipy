<div align="center">
  <h1>🐍 AntiPy</h1>
  <p><b>The interactive Python learning platform that builds your skills and your streak.</b></p>
</div>

---

## 🚀 Why AntiPy?

Stop passively watching videos. Start writing actual code. 

AntiPy is an interactive, gamified learning environment designed to take you from Python beginner to advanced coder through **active learning**. We integrated a powerful, browser-based IDE directly into the curriculum so you can execute code, take quizzes, and get instant feedback—all in one place.

*   **🏆 Gamified Streaks**: Earn XP and maintain your daily streak to stay glued to your learning goals.
*   **💻 Built-in IDE**: A full-featured coding experience powered by Monaco (the engine behind VS Code), customized for Python.
*   **🧠 Comprehensive Curriculum**: Covering everything from basic syntax to advanced concepts like File Handling, Network APIs, and Functional Programming.
*   **🛠 Modern UI**: Built with Next.js, styled with Tailwind v4, and featuring full Light/Dark mode support.

## ⚡ Quick Start (1-Command Install)

Want to try out AntiPy on your local machine instantly? Run a single command in your terminal depending on your Operating System:

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

## 🛠 Manual Installation

If you prefer to clone and install manually:

```bash
git clone https://github.com/akshay7star/Antipy.git
cd Antipy/app
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗 Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS v4 + `next-themes`
*   **Editor**: `@monaco-editor/react`
*   **Content**: MDX (`next-mdx-remote`)
*   **State Management**: Zustand
*   **Icons**: Lucide React

## 📅 Latest Updates
*   **v0.1.0**: Initial Release - Core curriculum, Monaco Editor, and Light/Dark Mode implemented.
