---
description: Automatically research, write, and format new interactive Python lessons and quizzes in MDX.
---

# Content Generation Agent Workflow

This workflow is designed to automatically expand the AntiPy curriculum. Given a topic, this agent will generate a comprehensive MDX lesson containing explanations, interactive code examples, and standard inline quizzes.

## Prerequisites
- A clear python topic to teach (e.g., "List Comprehensions", "Decorators", "Asyncio").

## Steps

1. **Understand Curriculum Context**
   Review existing lessons (e.g., `app/src/content/curriculum/01-basics/01-variables.mdx`) and the `quizzes.json` structure to understand the required tone, formatting, and complexity level.

2. **Draft the Lesson Content**
   Write the educational content in Markdown. 
   - Start with a clear `# title` and `description`.
   - Use simple, engaging language.
   - Break down complex concepts into digestible sections.

3. **Create Interactive Code Blocks**
   Embed `<InteractiveCode>` components to demonstrate the concepts.
   Ensure all code examples are fully functional Python 3 code.
   *Example:*
   ```tsx
   <InteractiveCode
       initialCode='print("Hello World")'
   />
   ```

4. **Generate Quizzes**
   Create at least 3-5 `<InlineQuiz>` components spaced throughout or at the end of the lesson.
   Ensure the options are accurately formatted as strings within an array to prevent parsing errors.
   *Example:*
   ```tsx
   <InlineQuiz
       question="What does this code do?"
       options={["A", "B", "C", "D"]}
       correctAnswer="A"
       explanation="Because X does Y."
   />
   ```

5. **File Creation**
   Determine the appropriate module path (e.g., `app/src/content/curriculum/06-advanced/`).
   Create the `.mdx` file using `write_to_file`.

6. **Validate and Test**
   Run `npm run dev` and navigate to the newly created lesson URL using the `browser_subagent` to visually verify that the text renders correctly, the code runs, and the quizzes function as expected.

7. **Report Status**
   Notify the user that the lesson has been created, tested, and is ready for review.
