import { Category } from './types';
import { builtinFunctions } from './data/builtins';
import { stringMethods } from './data/strings';
import { listMethods } from './data/lists';
import { tupleMethods } from './data/tuples';
import { dictMethods } from './data/dicts';
import { setMethods } from './data/sets';
import { operators } from './data/operators';
import { numberMethods } from './data/numbers';
import { booleanOps } from './data/booleans';
import { controlFlow } from './data/control-flow';
import { functionsScope } from './data/functions';
import { oop } from './data/oop';
import { errorHandling } from './data/errors';
import { comprehensions } from './data/comprehensions';
import { decorators } from './data/decorators';
import { fileIO } from './data/file-io';
import { stringFormatting } from './data/string-formatting';
import { asyncConcurrency } from './data/async';
import { pythonKeywords } from './data/keywords';
import { flask } from './data/flask';
import { django } from './data/django';
import { fastapi } from './data/fastapi';
import { regex } from './data/regex';
import { dataSerialization } from './data/serialization';
import { dataScience } from './data/data-science';
import { databases } from './data/databases';
import { serverlessCloud } from './data/serverless';
import { apiDevelopment } from './data/api-development';

/**
 * All Method Index categories in display order.
 * Total: 28 categories, ~490 entries.
 */
export const allCategories: Category[] = [
    // Core Python
    builtinFunctions,
    stringMethods,
    listMethods,
    tupleMethods,
    dictMethods,
    setMethods,
    operators,
    numberMethods,
    booleanOps,

    // Control & Functions
    controlFlow,
    functionsScope,

    // OOP & Patterns
    oop,
    errorHandling,
    comprehensions,
    decorators,

    // I/O & Formatting
    fileIO,
    stringFormatting,

    // Advanced
    asyncConcurrency,
    pythonKeywords,
    regex,
    dataSerialization,

    // Web Frameworks
    flask,
    django,
    fastapi,

    // Data & Cloud
    dataScience,
    databases,
    serverlessCloud,
    apiDevelopment,
];

/** Get a category by its slug ID */
export function getCategoryById(id: string): Category | undefined {
    return allCategories.find((cat) => cat.id === id);
}

/** Search all entries across all categories */
export function searchEntries(query: string) {
    const q = query.toLowerCase();
    const results: { category: Category; entryIndex: number }[] = [];

    for (const category of allCategories) {
        for (let i = 0; i < category.entries.length; i++) {
            const entry = category.entries[i];
            const match =
                entry.name.toLowerCase().includes(q) ||
                entry.description.toLowerCase().includes(q) ||
                entry.signature.toLowerCase().includes(q) ||
                entry.tags.some((tag) => tag.toLowerCase().includes(q));

            if (match) {
                results.push({ category, entryIndex: i });
            }
        }
    }

    return results;
}

/** Get total entry count across all categories */
export function getTotalEntryCount(): number {
    return allCategories.reduce((sum, cat) => sum + cat.entries.length, 0);
}

// Re-export types
export type { Category, MethodEntry } from './types';
