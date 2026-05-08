---
description: Automated end-to-end development pipeline sequence
---

# Pipeline Agent Workflow

This workflow orchestrates the automated, sequential execution of all specialized development agents to take a feature from implementation plan to production-ready state without requiring manual hand-offs between steps.

When triggered (e.g., via `/pipeline` or `/auto`), you must autonomously execute the following sequence precisely in order:

## Phase 1: Feature Implementation (`/feature-agent`)
1. **Adopt the `/feature-agent` persona.**
2. Read the project Roadmap and `task.md` to identify the current feature target.
3. Systematically plan and write the core React code, UI layout, MDX registration, and infrastructure required for the new feature.
4. *Do not stop or ask for permission to proceed to Phase 2.*

## Phase 2: Content Generation (`/content-agent`)
1. **Adopt the `/content-agent` persona.**
2. Analyze the blank or foundational MDX routing structures created in Phase 1.
3. Automatically research, write, and format detailed textual explanations and deep-dive conceptual topics for the new feature.
4. Inject `<interactive-code>` blocks demonstrating the concepts.
5. Generate 3-5 `<InlineQuiz>` components testing the new material and append them to the lesson.
6. Map and publish the content to the curriculum.
7. *Do not stop or ask for permission to proceed to Phase 3.*

## Phase 3: Bug Resolution (`/bugfix-agent`)
1. **Adopt the `/bugfix-agent` persona.**
2. Load the newly created pages and components in the Next.js dev server.
3. Inspect the terminal for any hydration errors, compilation crashes, or React warnings.
4. If bugs are found, reproduce, debug, and patch them immediately.
5. *Do not stop or ask for permission to proceed to Phase 4.*

## Phase 4: Quality Assurance (`/qa-agent`)
1. **Adopt the `/qa-agent` persona.**
2. Using the browser subagent, navigate to the newly created curriculum lessons.
3. Systematically test that the routing works, the text renders cleanly without MDX escape errors, the interactive code blocks execute Python successfully, and the quizzes evaluate answers correctly.
4. Ensure the UI adheres to the project's premium design standards.

## Phase 5: Handoff & Version Control
1. Conclude the automated pipeline.
2. Present a comprehensive summary to the user detailing what was built, what content was written, what bugs were squashed, and the QA results.
3. **Wait for the user.**
4. *Note: Only run `/git-agent` at the very end of the work day upon explicit user request, never automatically as part of this mid-day pipeline.*
