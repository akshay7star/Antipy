import { Category } from '../types';

export const tupleMethods: Category = {
    id: 'tuple-methods',
    name: 'Tuple Methods & Operations',
    description: 'Methods and operations for Python tuples — immutable ordered sequences',
    icon: 'Parentheses',
    entries: [
        { id: 'tuple-count', name: 'tuple.count()', signature: 'tuple.count(value) -> int', description: 'Returns the number of times a value appears in the tuple.', example: 't = (1, 2, 2, 3, 2)\nprint(t.count(2))  # 3\nprint(t.count(5))  # 0', complexity: 'O(n)', tags: ['count', 'frequency', 'search'] },
        { id: 'tuple-index', name: 'tuple.index()', signature: 'tuple.index(value, start=0, end=len) -> int', description: 'Returns the index of the first occurrence of a value. Raises ValueError if not found.', example: 't = (10, 20, 30, 20)\nprint(t.index(20))     # 1\nprint(t.index(20, 2))  # 3', complexity: 'O(n)', tags: ['search', 'find', 'position'] },
        { id: 'tuple-packing', name: 'Tuple Packing', signature: 't = value1, value2, ...', description: 'Creating a tuple by grouping values together, with or without parentheses.', example: '# With parentheses\nt = (1, 2, 3)\n\n# Without parentheses (packing)\nt = 1, 2, 3\nprint(t)       # (1, 2, 3)\nprint(type(t)) # <class \'tuple\'>', edgeCases: ['Single-element tuple needs trailing comma: t = (1,) not t = (1).', 'Without comma it\'s just parenthesized int.'], tags: ['create', 'packing', 'construct'] },
        { id: 'tuple-immutability', name: 'Tuple Immutability', signature: 'N/A', description: 'Tuples cannot be modified after creation — no append, remove, or item assignment.', example: 't = (1, 2, 3)\n# t[0] = 99  # TypeError: \'tuple\' does not support item assignment\n# t.append(4)  # AttributeError\n\n# BUT: mutable elements inside a tuple CAN be changed\nt = ([1, 2], [3, 4])\nt[0].append(99)\nprint(t)  # ([1, 2, 99], [3, 4])', edgeCases: ['A tuple containing a mutable object (like a list) allows modification of that object!'], tags: ['immutable', 'readonly', 'concept'] },

        { id: 'tuple-slicing', name: 'Tuple Slicing', signature: 'tuple[start:stop:step]', description: 'Extract portions of a tuple using slice notation. Returns a new tuple.', example: 't = (0, 1, 2, 3, 4, 5)\nprint(t[1:4])    # (1, 2, 3)\nprint(t[::2])    # (0, 2, 4)\nprint(t[::-1])   # (5, 4, 3, 2, 1, 0)', tags: ['slicing', 'indexing', 'range'] },
        { id: 'tuple-nested', name: 'Nested Tuples', signature: 'N/A', description: 'Tuples can contain other tuples, creating matrix-like structures.', example: 'matrix = ((1, 2, 3), (4, 5, 6), (7, 8, 9))\nprint(matrix[1][2])  # 6\n\n# Iterate\nfor row in matrix:\n    for val in row:\n        print(val, end=" ")\n# 1 2 3 4 5 6 7 8 9', tags: ['nested', 'matrix', 'structure'] },
    ]
};
