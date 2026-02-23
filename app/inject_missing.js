const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(__dirname, 'src/content/curriculum');

const mapping = {
    "08-oop/01-classes.mdx": "<OOPVisualizer initialMode=\"instantiation\" />",
    "08-oop/02-magic-methods.mdx": "<OOPVisualizer initialMode=\"instantiation\" />",
    "08-oop/05-encapsulation.mdx": "<OOPVisualizer initialMode=\"instantiation\" />",
    "08-oop/06-class-static-methods.mdx": "<OOPVisualizer initialMode=\"instantiation\" />",
    "08-oop/07-multiple-inheritance.mdx": "<OOPVisualizer initialMode=\"inheritance\" />",
    "08-oop/08-dataclasses.mdx": "<OOPVisualizer initialMode=\"instantiation\" />",
    "08-oop/09-abstract-classes.mdx": "<OOPVisualizer initialMode=\"polymorphism\" />",
    "10-iterators/01-comprehensions.mdx": "<GeneratorsVisualizer />",
    "11-functional/02-lambda.mdx": "<FunctionalVisualizer />",
    "12-stdlib/01-math.mdx": "<StdlibVisualizer />",
    "12-stdlib/02-random.mdx": "<StdlibVisualizer />",
    "12-stdlib/03-datetime.mdx": "<StdlibVisualizer />",
    "13-advanced/01-async.mdx": "<ConcurrencyVisualizer />",
    "13-advanced/01-context-managers.mdx": "<ExceptionsVisualizer />",
    "13-advanced/02-decorators.mdx": "<DecoratorsVisualizer />",
    "13-advanced/02-regex.mdx": "<StringsVisualizer />",
    "14-apis/01-json.mdx": "<DataStructuresVisualizer />",
    "14-apis/02-csv.mdx": "<FileSystemVisualizer />",
    "14-apis/02-requests.mdx": "<ConcurrencyVisualizer />",
    "15-testing/01-unittest.mdx": "<FunctionsVisualizer />",
    "15-testing/02-debugging.mdx": "<FunctionsVisualizer />",
    "16-flask/01-basics.mdx": "<ConcurrencyVisualizer />",
    "17-django/01-basics.mdx": "<OOPVisualizer />",
    "18-fastapi/01-basics.mdx": "<ConcurrencyVisualizer />",
    "19-data-science/01-analysis.mdx": "<DataStructuresVisualizer />",
    "20-databases/01-sql-orm.mdx": "<DataStructuresVisualizer />",
    "21-cloud-serverless/01-deploy.mdx": "<FileSystemVisualizer />",
    "22-algorithmic-thinking/01-time-complexity.mdx": "<BigOVisualizer />",
    "25-recursion-sorting/01-recursion-stack.mdx": "<FunctionsVisualizer />",
    "27-stacks-queues/01-lifo-fifo.mdx": "<StacksQueuesVisualizer />"
};

let injectedCount = 0;

Object.entries(mapping).forEach(([relPath, componentStr]) => {
    const normalizedPath = relPath.replace(/\//g, path.sep);
    const fullPath = path.join(curriculumDir, normalizedPath);

    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Match the first # Header exactly.
        const headerRegex = /#\s+[^\r\n]*\r?\n/;
        const match = headerRegex.exec(content);

        if (match) {
            const insertIndex = match.index + match[0].length;
            const newContent = content.slice(0, insertIndex) + `\n${componentStr}\n` + content.slice(insertIndex);
            fs.writeFileSync(fullPath, newContent);
            console.log(`Successfully injected into ${normalizedPath}`);
            injectedCount++;
        } else {
            console.log(`Could not find header in ${normalizedPath}`);
        }
    } else {
        console.log(`File not found: ${fullPath}`);
    }
});
console.log(`Total injected: ${injectedCount}`);
