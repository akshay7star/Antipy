// Method Index — Type Definitions

export interface MethodEntry {
    /** Unique identifier (e.g. "str-upper", "list-append") */
    id: string;
    /** Display name (e.g. "str.upper()", "list.append()") */
    name: string;
    /** Method/function signature (e.g. "str.upper() -> str") */
    signature: string;
    /** Plain-English description */
    description: string;
    /** Interactive Python code example */
    example: string;
    /** Edge cases and gotchas */
    edgeCases?: string[];
    /** Time/space complexity (e.g. "O(n)") */
    complexity?: string;
    /** Related method IDs */
    relatedMethods?: string[];
    /** Tags for search (e.g. ["string", "case", "conversion"]) */
    tags: string[];
}

export interface Category {
    /** Unique slug (e.g. "built-in-functions") */
    id: string;
    /** Display name */
    name: string;
    /** Short description */
    description: string;
    /** Icon name (lucide-react) */
    icon: string;
    /** All entries in this category */
    entries: MethodEntry[];
}
