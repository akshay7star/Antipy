import { Category } from '../types';

export const builtinFunctions: Category = {
    id: 'built-in-functions',
    name: 'Built-in Functions',
    description: 'Python\'s built-in functions available without any imports',
    icon: 'Cpu',
    entries: [
        {
            id: 'print',
            name: 'print()',
            signature: 'print(*objects, sep=" ", end="\\n", ...)',
            description: 'Outputs text or variables to the console. It converts each argument to a string, separates them with spaces (by default), and adds a newline at the end. Essential for debugging and displaying results.',
            example: 'print("Hello", "World")          # Hello World\nprint("A", "B", sep="-")         # A-B\nprint("Loading...", end="")      # No newline',
            edgeCases: ['print() with no args outputs a blank line.', 'None is printed as the string "None".'],
            complexity: 'O(n) - proportional to output size',
            tags: ['output', 'console', 'debug']
        },
        {
            id: 'len',
            name: 'len()',
            signature: 'len(s) -> int',
            description: 'Returns the count of items in a container (like a string, list, or dictionary). For strings, it counts characters; for lists/dicts, it counts elements.',
            example: 'print(len("Python"))       # 6\nprint(len([10, 20, 30]))   # 3\nprint(len({"a": 1}))       # 1',
            edgeCases: ['Raises TypeError if the object has no length (like an integer or boolean).'],
            complexity: 'O(1) - constant time for built-in types',
            tags: ['length', 'count', 'size']
        },
        {
            id: 'type',
            name: 'type()',
            signature: 'type(object) -> type',
            description: 'Reveals the data type of any object. Very useful for debugging when you are unsure what kind of data you are working with.',
            example: 'print(type(42))        # <class \'int\'>\nprint(type("hi"))      # <class \'str\'>\nif type(x) is int: ... # Type check',
            edgeCases: ['Recommended to use isinstance() for type checking to support inheritance.'],
            tags: ['type', 'debug', 'introspection']
        },
        {
            id: 'range',
            name: 'range()',
            signature: 'range(start, stop, step)',
            description: 'Generates a sequence of numbers, commonly used in for-loops. It mimics a list of numbers but is memory efficient because it generates them one by one.',
            example: 'for i in range(3):      # 0, 1, 2\n    print(i)\n\n# Start at 2, stop before 10, step by 2\nlist(range(2, 10, 2))   # [2, 4, 6, 8]',
            edgeCases: ['range(stop) excludes the stop value.', 'Step cannot be 0.'],
            complexity: 'O(1) - creation is instant',
            tags: ['sequence', 'loop', 'iteration']
        },
        {
            id: 'enumerate',
            name: 'enumerate()',
            signature: 'enumerate(iterable, start=0)',
            description: 'Adds a counter to an iterable, allowing you to loop over items and have their index at the same time. Cleaner than using range(len(list)).',
            example: 'colors = ["red", "blue"]\nfor i, color in enumerate(colors):\n    print(f"{i}: {color}")\n# 0: red\n# 1: blue',
            edgeCases: ['Returns an iterator, not a list (wrap in list() to see all at once).'],
            tags: ['loop', 'index', 'iteration']
        },
        {
            id: 'zip',
            name: 'zip()',
            signature: 'zip(*iterables)',
            description: 'Pairs up elements from multiple lists (or other iterables) into tuples. Useful for iterating over two lists in parallel.',
            example: 'names = ["Alice", "Bob"]\nages = [25, 30]\n\nfor name, age in zip(names, ages):\n    print(f"{name} is {age}")',
            edgeCases: ['Stops at the length of the shortest list.', 'Use zip(..., strict=True) to raise error if lengths mismatch.'],
            tags: ['combine', 'parallel', 'iteration']
        },
        {
            id: 'map',
            name: 'map()',
            signature: 'map(func, iterable)',
            description: 'Applies a given function to every item in a list (or iterable). Often replaced by list comprehensions in modern Python, but still useful.',
            example: 'nums = [1, 2, 3]\nsquared = map(lambda x: x**2, nums)\nprint(list(squared))  # [1, 4, 9]',
            edgeCases: ['Returns an iterator (lazy). Must convert to list/tuple to verify values immediately.'],
            tags: ['functional', 'transform', 'apply']
        },
        {
            id: 'filter',
            name: 'filter()',
            signature: 'filter(func, iterable)',
            description: 'Keeps only the items from a list where the function returns True. Removes everything else.',
            example: 'nums = [1, 2, 3, 4]\nevens = filter(lambda x: x % 2 == 0, nums)\nprint(list(evens))  # [2, 4]',
            edgeCases: ['If function is None, removes all "falsy" values (0, empty strings, None).'],
            tags: ['functional', 'filter', 'search']
        },
        {
            id: 'sorted',
            name: 'sorted()',
            signature: 'sorted(iterable, key=None, reverse=False)',
            description: 'Returns a new sorted list from any iterable. Unlike .sort(), it does not modify the original list.',
            example: 'nums = [3, 1, 4, 2]\nprint(sorted(nums))       # [1, 2, 3, 4]\nprint(sorted(nums, reverse=True)) # [4, 3, 2, 1]',
            edgeCases: ['Creates a copy (O(n) memory).', 'Sort is stable (preserves order of equal elements).'],
            complexity: 'O(n log n)',
            tags: ['sort', 'order', 'list']
        },
        {
            id: 'input',
            name: 'input()',
            signature: 'input(prompt) -> str',
            description: 'Pauses the program and waits for the user to type something. Always returns the result as a string.',
            example: 'name = input("Who are you? ")\nprint(f"Hello {name}")\n\n# Convert to number explicitly\nage = int(input("Age? "))',
            edgeCases: ['Always returns a string. Entering "5" gives string "5", not integer 5.'],
            tags: ['io', 'user', 'console']
        },
        {
            id: 'int',
            name: 'int()',
            signature: 'int(x) -> int',
            description: 'Converts a number or string into an integer (whole number). Truncates decimal points.',
            example: 'print(int("10"))    # 10\nprint(int(3.99))    # 3 (truncates)\nprint(int("A", 16)) # 10 (hex conversion)',
            edgeCases: ['Raises ValueError for invalid strings (e.g. int("hello")).'],
            tags: ['convert', 'type', 'number']
        },
        {
            id: 'str',
            name: 'str()',
            signature: 'str(object) -> str',
            description: 'Converts any object into a string representation, making it suitable for printing or string concatenation.',
            example: 'print("Age: " + str(25))   # "Age: 25"\nprint(str([1, 2]))         # "[1, 2]"',
            edgeCases: [],
            tags: ['convert', 'type', 'string']
        },
        {
            id: 'sum',
            name: 'sum()',
            signature: 'sum(iterable, start=0)',
            description: 'Calculates the sum of all elements in a list or numbers.',
            example: 'print(sum([1, 2, 3]))      # 6\nprint(sum([10, 20], 5))    # 35 (starts at 5)',
            edgeCases: ['Cannot sum strings (use "".join() instead).'],
            complexity: 'O(n)',
            tags: ['math', 'add', 'total']
        },
        {
            id: 'abs',
            name: 'abs()',
            signature: 'abs(x) -> num',
            description: 'Returns the absolute value of a number (makes negative numbers positive).',
            example: 'print(abs(-5))    # 5\nprint(abs(3.14))  # 3.14',
            edgeCases: [],
            tags: ['math', 'numbers']
        },
        {
            id: 'round',
            name: 'round()',
            signature: 'round(number, ndigits=None)',
            description: 'Rounds a number to the nearest integer or specified decimal precision.',
            example: 'print(round(3.14159, 2))  # 3.14\nprint(round(1.5))       # 2',
            edgeCases: ['Python rounds to nearest even number for .5 cases (e.g., round(2.5) -> 2).'],
            tags: ['math', 'numbers']
        },
        {
            id: 'min',
            name: 'min()',
            signature: 'min(iterable)',
            description: 'Finds the smallest item in a list or a set of arguments.',
            example: 'print(min([5, 1, 10]))   # 1\nprint(min(1, 2, 3))      # 1',
            edgeCases: ['Raises ValueError on empty sequence.'],
            tags: ['math', 'search']
        },
        {
            id: 'max',
            name: 'max()',
            signature: 'max(iterable)',
            description: 'Finds the largest item in a list or a set of arguments.',
            example: 'print(max([5, 1, 10]))   # 10',
            edgeCases: ['Raises ValueError on empty sequence.'],
            tags: ['math', 'search']
        }
    ]
};
