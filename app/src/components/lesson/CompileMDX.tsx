import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { InteractiveCode } from '@/components/lesson/InteractiveCode';
import { MethodUnit } from '@/components/methods/MethodUnit';
import { MermaidDiagram } from '@/components/lesson/MermaidDiagram';
import { InlineQuiz } from '@/components/lesson/InlineQuiz';

const components = {
    'interactive-code': InteractiveCode as any,
    'InteractiveCode': InteractiveCode as any,
    MethodUnit: MethodUnit as any,
    MermaidDiagram: MermaidDiagram as any,
    InlineQuiz: InlineQuiz as any,
};

/**
 * Preprocesses MDX source to prevent Python code inside <interactive-code> blocks
 * from being parsed as MDX/JSX. Issues:
 * 
 * 1. Python `import`/`from` at line start → parsed as JS module imports
 * 2. Python `{}`  → parsed as JSX expressions  
 * 3. Other Python syntax (`<`, `>`) may confuse JSX parser
 * 
 * Strategy: Find <interactive-code> or <InteractiveCode> blocks. Extract the 
 * code content from children and pass it as a safe `code` prop using backtick
 * template literals. Handles multi-line JSX tags with complex attributes.
 */
function escapeCodeBlocks(source: string): string {
    // We need a more robust approach than regex for tags with complex JSX attributes.
    // Find all opening tags and their matching closing tags.
    const tagPattern = /<(interactive-code|InteractiveCode|MermaidDiagram)\b/g;
    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = tagPattern.exec(source)) !== null) {
        const tagStart = match.index;
        const tagName = match[1];

        // Find the end of the opening tag — need to handle nested {}, `` and strings
        let i = tagStart + match[0].length;
        let depth = 0;
        let inBacktick = false;
        let selfClosing = false;

        while (i < source.length) {
            const ch = source[i];
            if (inBacktick) {
                if (ch === '\\') { i += 2; continue; }
                if (ch === '`') inBacktick = false;
            } else {
                if (ch === '`') inBacktick = true;
                else if (ch === '{') depth++;
                else if (ch === '}') depth--;
                else if (ch === '/' && source[i + 1] === '>' && depth === 0) {
                    selfClosing = true;
                    i += 2;
                    break;
                } else if (ch === '>' && depth === 0) {
                    i++;
                    break;
                }
            }
            i++;
        }

        if (selfClosing) {
            // Self-closing tag — no children to process
            result += source.slice(lastIndex, i);
            lastIndex = i;
            continue;
        }

        const openTagEnd = i;
        const attrs = source.slice(tagStart + match[0].length, openTagEnd - 1);

        // Find the closing tag
        const closeTag = `</${tagName}>`;
        const closeIndex = source.indexOf(closeTag, openTagEnd);
        if (closeIndex === -1) {
            // No closing tag found, skip
            result += source.slice(lastIndex, openTagEnd);
            lastIndex = openTagEnd;
            continue;
        }

        const childContent = source.slice(openTagEnd, closeIndex);

        // Escape backticks and ${} in the content for template literal safety
        const escaped = childContent
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$\{/g, '\\${');

        // Determine the correct prop name and component name based on tag
        const isMermaid = tagName === 'MermaidDiagram';
        const propName = isMermaid ? 'chart' : 'code';
        const componentName = isMermaid ? 'MermaidDiagram' : 'InteractiveCode';

        // Reconstruct as <Component ... prop={`...`} />
        result += source.slice(lastIndex, tagStart);
        result += `<${componentName}${attrs} ${propName}={\`${escaped}\`} />`;
        lastIndex = closeIndex + closeTag.length;
    }

    result += source.slice(lastIndex);
    return result;
}

export function CompileMDX({ source }: { source: string }) {
    const processed = escapeCodeBlocks(source);
    return (
        <MDXRemote
            source={processed}
            components={components}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
            }}
        />
    );
}
