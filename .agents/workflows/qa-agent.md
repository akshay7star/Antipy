---
description: Systematically test UI, routing, and interactive components using the browser subagent.
---

# QA Testing Agent Workflow

This workflow turns the agent into an automated Quality Assurance tester. It utilizes the `browser_subagent` to systematically navigate the AntiPy platform, interact with components, and verify functionality before major releases.

## Prerequisites
- The development server must be running (`npm run dev`).
- The application should be in a stable enough state to test.

## Steps

1. **Initialize Testing Environment**
   Verify the local server is running on `http://localhost:3000`. If not, start it.

2. **Core Navigation Testing**
   Deploy a `browser_subagent` to test the main routing:
   - Navigate to the Home Page (`/`).
   - Click the "Learn" link in the sidebar to visit the curriculum dashboard (`/learn`).
   - Click the "Practice" link (`/practice`).
   - Click the "Methods" link (`/methods`).
   *Goal*: Ensure no 404 errors or hydration mismatches occur during client-side or server-side navigation.

3. **Interactive Component Testing**
   Deploy a `browser_subagent` to a specific interactive lesson.
   - **Theme Toggle**: Click the Dark/Light mode toggle in the sidebar and verify the visual change.
   - **Interactive Code Editor**: Locate an `<InteractiveCode>` block, type a deliberate syntax error, click "Run Code", and verify the error output is displayed. Fix the error, run again, and verify the correct output.
   - **Inline Quizzes**: Locate an `<InlineQuiz>`, select an incorrect option, verify the visual feedback (red/incorrect). Select the correct option, verify the success state and explanation visibility.

4. **Visual Regression Check**
   Specifically check known problem areas:
   - Verify code block syntax highlighting readability in both dark and light modes.
   - Ensure the Sidebar navigation is visible and functional on both Desktop and Mobile viewports (by resizing the `browser_subagent` window if necessary).

5. **Report Generation**
   Compile the findings from the `browser_subagent` sessions. 
   If any bugs, visual glitches, or console errors are discovered, document them clearly with reproduction steps and screenshot names.

6. **Fix or Notify**
   If the issues are straight-forward (e.g., a wrong CSS class), fix them immediately. Otherwise, notify the user with the detailed QA report.
