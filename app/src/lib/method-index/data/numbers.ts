import { Category } from '../types';

export const numberMethods: Category = {
    id: 'number-methods',
    name: 'Number Methods & Operations',
    description: 'Methods on int, float, and complex types, plus the math module essentials',
    icon: 'Hash',
    entries: [
        { id: 'num-int-bit-length', name: 'int.bit_length()', signature: 'int.bit_length() -> int', description: 'Returns the number of bits needed to represent the integer (excluding sign and leading zeros).', example: 'print((10).bit_length())     # 4 (binary: 1010)\nprint((255).bit_length())    # 8\nprint((0).bit_length())      # 0', tags: ['int', 'binary', 'bits'] },
        { id: 'num-int-bit-count', name: 'int.bit_count()', signature: 'int.bit_count() -> int', description: 'Returns the number of 1-bits in the absolute value (popcount). (3.10+)', example: 'print((10).bit_count())   # 2 (binary: 1010)\nprint((255).bit_count())  # 8 (binary: 11111111)', tags: ['int', 'binary', 'popcount'] },
        { id: 'num-int-to-bytes', name: 'int.to_bytes()', signature: 'int.to_bytes(length, byteorder, *, signed=False) -> bytes', description: 'Returns a bytes representation of the integer.', example: 'print((1024).to_bytes(2, "big"))    # b\'\\x04\\x00\'\nprint((255).to_bytes(1, "big"))     # b\'\\xff\'', tags: ['int', 'bytes', 'encode'] },
        { id: 'num-int-from-bytes', name: 'int.from_bytes()', signature: 'int.from_bytes(bytes, byteorder, *, signed=False) -> int', description: 'Creates an integer from a bytes object.', example: 'print(int.from_bytes(b"\\x04\\x00", "big"))  # 1024\nprint(int.from_bytes(b"\\xff", "big"))       # 255', tags: ['int', 'bytes', 'decode'] },
        { id: 'num-float-is-integer', name: 'float.is_integer()', signature: 'float.is_integer() -> bool', description: 'Returns True if the float has no fractional part.', example: 'print((3.0).is_integer())     # True\nprint((3.5).is_integer())     # False\nprint((-2.0).is_integer())    # True', tags: ['float', 'check', 'integer'] },
        { id: 'num-float-hex', name: 'float.hex()', signature: 'float.hex() -> str', description: 'Returns a hexadecimal string representation of the float.', example: 'print((3.14).hex())       # 0x1.91eb851eb851fp+1\nprint((1.0).hex())        # 0x1.0000000000000p+0', tags: ['float', 'hex', 'representation'] },
        { id: 'num-float-fromhex', name: 'float.fromhex()', signature: 'float.fromhex(s) -> float', description: 'Creates a float from a hexadecimal string.', example: 'print(float.fromhex("0x1.0p+0"))    # 1.0\nprint(float.fromhex("0x1.8p+1"))    # 3.0', tags: ['float', 'hex', 'parse'] },
        { id: 'num-complex-ops', name: 'Complex Operations', signature: 'complex.real, complex.imag, complex.conjugate()', description: 'Access real/imaginary parts and compute conjugate of complex numbers.', example: 'c = 3 + 4j\nprint(c.real)        # 3.0\nprint(c.imag)        # 4.0\nprint(c.conjugate()) # (3-4j)\nprint(abs(c))        # 5.0 (magnitude)', tags: ['complex', 'math', 'imaginary'] },
        { id: 'num-math-module', name: 'math Module', signature: 'import math', description: 'Essential math functions: sqrt, floor, ceil, pi, e, log, sin, cos, factorial, gcd.', example: 'import math\nprint(math.sqrt(16))       # 4.0\nprint(math.floor(3.7))     # 3\nprint(math.ceil(3.2))      # 4\nprint(math.pi)             # 3.14159...\nprint(math.factorial(5))   # 120\nprint(math.gcd(12, 8))     # 4\nprint(math.log(100, 10))   # 2.0', tags: ['math', 'module', 'functions'] },
        { id: 'num-rounding', name: 'Rounding Behavior', signature: 'N/A', description: 'Understanding Python\'s rounding rules and float precision issues.', example: '# Banker\'s rounding (round half to even)\nprint(round(0.5))     # 0\nprint(round(1.5))     # 2\nprint(round(2.5))     # 2\n\n# Float precision\nprint(0.1 + 0.2)            # 0.30000000000000004\nprint(0.1 + 0.2 == 0.3)     # False!\n\n# Use Decimal for exact math\nfrom decimal import Decimal\nprint(Decimal("0.1") + Decimal("0.2"))  # 0.3', edgeCases: ['Never compare floats with ==.', 'Use math.isclose() or Decimal for money.'], tags: ['precision', 'rounding', 'decimal', 'gotcha'] },

    ]
};
