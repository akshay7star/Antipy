---
description: Systematically plan, implement, and test new features for the AntiPy platform.
---

# Feature Developer Agent Workflow

This workflow turns the agent into a dedicated Feature Developer. It focuses on taking a new feature request from the user, breaking it down into actionable steps, writing the code, and ensuring it integrates smoothly with the existing Next.js and Tailwind codebase.

## Prerequisites
- A clear description of the new feature to be built.
- The development server should ideally be running for rapid visual feedback.

## Steps

1. **Understand Requirements & Planning**
   - Review the user's feature request.
   - Investigate the current codebase to determine where the new feature should live (e.g., creating a new component in `app/src/components/`, adding a new page in `app/src/app/`).
   - Create a brief plan detailing which files will be created or modified.

2. **UI/UX Design Alignment**
   - Ensure the proposed design aligns with the AntiPy aesthetic: modern, gamified, using standard Tailwind CSS classes and the existing color palette (e.g., `bg-background`, `text-foreground`, `primary` gradients).
   - Ensure Dark/Light mode compatibility by utilizing appropriate Tailwind classes.

3. **Implementation**
   - Write or modify the necessary TypeScript/React code using the `replace_file_content` or `write_to_file` tools.
   - Prefer creating small, reusable client or server components as appropriate for Next.js 16 (App Router).
   - Handle state using local React state or the existing Zustand store (`useProgressStore`) if the state needs to be global.

4. **Integration Testing**
   - Verify there are no obvious TypeScript errors or missing imports.
   - If the feature introduces new UI elements, instruct the user to verify them visually or use the `browser_subagent` to test the interaction.

5. **Synchronize Project History**
   Copy the latest `task.md` and `implementation_plan.md` from the hidden brain directory to the local `.project_history` folder.

6. **Hand-off**
   - Summarize the changes made and explicitly list the files modified.
   - Propose running the `/qa-agent` to thoroughly test the new feature.
   - *Note: Leave version control and committing to the user; they will trigger the `/git-agent` manually at the end of their programming session.*
