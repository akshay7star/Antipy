const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/aksha/OneDrive/Desktop/Learning/Project/Anti learning platform/app/src/components/lesson';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Visualizer.tsx'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let modified = false;

    // 1. Fix bg-dot-pattern containers
    // We want to remove `overflow-hidden` if it's there, and add `overflow-x-auto` if it's not.
    const dotRegex = /className="([^"]*bg-dot-pattern[^"]*)"/g;
    content = content.replace(dotRegex, (match, classes) => {
        let newClasses = classes.replace(/\boverflow-hidden\b/g, '');
        if (!newClasses.includes('overflow-x-auto')) {
            newClasses += ' overflow-x-auto';
        }
        newClasses = newClasses.replace(/\s+/g, ' ').trim();
        if (newClasses !== classes) {
            modified = true;
        }
        return `className="${newClasses}"`;
    });

    // 2. OOPVisualizer specific fixes
    if (file === 'OOPVisualizer.tsx') {
        const heapRegex = /className="([^"]*w-full flex justify-center gap-8 relative h-32[^"]*)"/;
        if (heapRegex.test(content)) {
            content = content.replace(heapRegex, (match, classes) => {
                modified = true;
                return `className="${classes.replace('gap-8', 'gap-4 md:gap-8 flex-wrap h-auto min-h-[8rem]')}"`;
            });
        }

        const instanceRegex = /className="([^"]*w-full flex justify-end pr-12 relative[^"]*)"/;
        if (instanceRegex.test(content)) {
            content = content.replace(instanceRegex, (match, classes) => {
                modified = true;
                return `className="${classes.replace('justify-end pr-12', 'justify-center md:justify-end md:pr-12 md:right-32 right-auto')}"`;
            });
        }

        const arrowRegex = /className="absolute -top-12 right-32/g;
        if (arrowRegex.test(content)) {
            content = content.replace(arrowRegex, () => {
                modified = true;
                return `className="absolute -top-12 md:right-32 right-1/2 -mr-8`;
            });
        }
    }

    // 3. SortingVisualizer specific fixes
    if (file === 'SortingVisualizer.tsx') {
        const barsRegex = /className="([^"]*flex-1 flex items-end justify-center h-64 w-full[^"]*)"/;
        if (barsRegex.test(content)) {
            content = content.replace(barsRegex, (match, classes) => {
                if (!classes.includes('overflow-x-auto')) {
                    modified = true;
                    return `className="${classes.replace('justify-center', 'justify-start sm:justify-center overflow-x-auto')}"`;
                }
                return match;
            });
        }
    }

    if (modified) {
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`Updated ${file}`);
    }
});
