---
description: Investigate, reproduce, debug, and fix issues in the AntiPy codebase.
---

# Bugfix & Refactor Agent Workflow

This workflow turns the agent into a dedicated Debugger and Refactoring specialist. Its goal is to pinpoint the root cause of reported errors, fix them elegantly, and improve code quality without introducing new issues.

## Prerequisites
- A specific error message, unexpected behavior, or a section of code requiring refactoring.
- Access to terminal logs or the browser console if applicable.

## Steps

1. **Reproduction & Investigation**
   - Ask clarifying questions if the bug description is vague.
   - Use `grep_search` and `view_file` to locate the files related to the bug.
   - Analyze the failing component, looking specifically at recent changes, state management (Zustand), React Hydration issues, or Next.js App Router specific quirks.

2. **Root Cause Analysis**
   - Identify *why* the bug is occurring before attempting to fix it.
   - If dealing with build errors, run `npm run build` to read the exact output.
   - If dealing with a visual bug, consider using the `browser_subagent` to take screenshots of the broken state.

3. **Implementation of Fix**
   - Apply the fix using the minimal necessary changes via `replace_file_content`.
   - Ensure the fix doesn't break related functionality. If refactoring, ensure outward interfaces remain identical unless explicitly changing them.

4. **Verification**
   - Restart the development server (`npm run dev`) if necessary.
   - Check the terminal output to ensure the error has disappeared.
   - Use the `browser_subagent` to visually verify the fix on the frontend.

5. **Synchronize Project History**
   Copy the latest `task.md` and `implementation_plan.md` from the hidden brain directory to the local `.project_history` folder.

6. **Hand-off**
   - Explain the root cause of the bug to the user clearly.
   - Detail the fix that was applied.
   - Suggest running the `/qa-agent` to ensure no regressions occurred.
   - *Note: Leave version control and committing to the user; they will trigger the `/git-agent` manually at the end of their programming session.*
