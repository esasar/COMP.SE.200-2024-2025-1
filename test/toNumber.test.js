import toNumber from '../src/toNumber.js';

describe('When given binary strings', () => {
    test('converts valid binary strings to number', () => {
        expect(toNumber("0b0")).toBe(0);
        expect(toNumber("0b1")).toBe(1);
    });

    test('returns NaN for invalid binary strings', () => {
        expect(toNumber("0b2")).toBeNaN();
        expect(toNumber("0b10102")).toBeNaN();
        expect(toNumber("0b")).toBeNaN();
    });
});

describe('When given octal strings', () => {
    test('converts valid octal strings to number', () => {
        expect(toNumber("0o0")).toBe(0);
        expect(toNumber("0o7")).toBe(7);
        expect(toNumber("0o10")).toBe(8);
    });

    test('returns NaN for invalid octal strings', () => {
        expect(toNumber("0o8")).toBeNaN();
        expect(toNumber("0o1238")).toBeNaN();
    });
});

describe('When given hexadecimal strings', () => {
    test('converts valid hexadecimal strings to number', () => {
        expect(toNumber("0x0")).toBe(0);
        expect(toNumber("0xabcdef")).toBe(11259375);
    });

    test('returns NaN for invalid hexadecimal strings', () => {
        expect(toNumber("-0x1")).toBeNaN();
        expect(toNumber("0xG1")).toBeNaN();
        expect(toNumber("0x")).toBeNaN();
    });
});

describe('When given objects', () => {
    describe('When object has valueOf method', () => {
        test('converts object to number when valueOf returns maximum positive integer', () => {
            expect(toNumber({ valueOf: () => Number.MAX_SAFE_INTEGER })).toBe(Number.MAX_SAFE_INTEGER);
        });
        test('converts object to number when valueOf returns minimum positive integer', () => {
            expect(toNumber({ valueOf: () => 1 })).toBe(1);
        });
        test('converts object to number when valueOf returns maximum negative integer', () => {
            expect(toNumber({ valueOf: () => Number.MIN_SAFE_INTEGER })).toBe(Number.MIN_SAFE_INTEGER);
        });
        test('converts object to number when valueOf returns minimum negative integer', () => {
            expect(toNumber({ valueOf: () => -1 })).toBe(-1);
        });
        test('converts object to number when valueOf returns 0', () => {
            expect(toNumber({ valueOf: () => 0 })).toBe(0);
        });
        test('converts object to number when valueOf returns -0', () => {
            expect(toNumber({ valueOf: () => -0 })).toBe(0);
        });
        test('converts object to number when valueOf returns maximum positive float', () => {
            expect(toNumber({ valueOf: () => Number.MAX_VALUE })).toBe(Number.MAX_VALUE);
        });
        test('converts object to number when valueOf returns a valid float', () => {
            expect(toNumber({ valueOf: () => 3.2 })).toBe(3.2);
        });
        test('converts object to number when valueOf returns minimum positive float', () => {
            expect(toNumber({ valueOf: () => Number.MIN_VALUE })).toBe(Number.MIN_VALUE);
        });
        test('converts object to number when valueOf returns maximum 0.0', () => {
            expect(toNumber({ valueOf: () => 0.0 })).toBe(0.0);
        });
        test('converts object to number when valueOf returns -0.0', () => {
            expect(toNumber({ valueOf: () => -0.0 })).toBe(0.0);
        });
        test('converts object to number when valueOf returns minimum negative float', () => {
            expect(toNumber({ valueOf: () => -Number.MIN_VALUE })).toBe(-Number.MIN_VALUE);
        });
        test('converts object to number when valueOf returns a valid negative float', () => {
            expect(toNumber({ valueOf: () => -3.2 })).toBe(-3.2);
        });
        test('converts object to number when valueOf returns maximum negative float', () => {
            expect(toNumber({ valueOf: () => -Number.MAX_VALUE })).toBe(-Number.MAX_VALUE);
        });
        test('converts object to infinity when valueOf returns Infinity', () => {
            expect(toNumber({ valueOf: () => Infinity })).toBe(Infinity);
        });
        test('converts object to negative infinity when valueOf returns -Infinity', () => {
            expect(toNumber({ valueOf: () => -Infinity })).toBe(-Infinity);
        });
        test('converts object to NaN when valueOf returns NaN', () => {
            expect(toNumber({ valueOf: () => NaN })).toBeNaN();
        });
        test('converts object to number when valueOf returns a positive numeric string', () => {
            expect(toNumber({ valueOf: () => "123" })).toBe(123);
        });
        test('converts object to number when valueOf returns a negative numeric string', () => {
            expect(toNumber({ valueOf: () => "-123" })).toBe(-123);
        });
        test('converts object to number when valueOf returns zero as string', () => {
            expect(toNumber({ valueOf: () => "0" })).toBe(0);
        });
        test('converts object to number when valueOf returns a valid numeric string with whitespace and leading zeros', () => {
            expect(toNumber({ valueOf: () => "  00123  " })).toBe(123);
        });
        

});
    describe('When object does not have valueOf method', () => {
    });
    test('converts object when valueOf returns a valid numeric string', () => {
        expect(toNumber({ valueOf: () => "123" })).toBe(123);
    });


    test('returns NaN when valueOf returns non-numeric types', () => {
        expect(toNumber({ valueOf: () => "text" })).toBeNaN();
        expect(toNumber({ valueOf: () => [12, 14] })).toBeNaN();
        expect(toNumber({ valueOf: () => ({ value: 13 }) })).toBeNaN();
    });

    // These are wrong, toString is used in the new object, not in the original object
    // Test when 
    test('uses toString with numeric string if valueOf is invalid or missing', () => {
        expect(toNumber({ valueOf: () => ({}), toString: () => "456" })).toBe(456);
        expect(toNumber({ toString: () => "789" })).toBe(789);
    });

    test('returns NaN for non-numeric toString values', () => {
        expect(toNumber({ toString: () => "invalid" })).toBeNaN();
        expect(toNumber({ toString: () => [10, 20] })).toBeNaN();
    });

    test('uses object\'s value property directly if valueOf is missing', () => {
        expect(toNumber({ value: 42 })).toBe(42);
        expect(toNumber({ value: "123" })).toBe(123);
        expect(toNumber({ value: -3.2 })).toBe(-3.2);
    });

    test('handles missing valueOf and/or toString', () => {
        expect(toNumber({})).toBeNaN(); // No valueOf, toString, or value property
        expect(toNumber({ valueOf: () => 250 })).toBe(250); // valid valueOf used
        expect(toNumber({ toString: () => "123" })).toBe(123); // valid toString used
    });

    test('handles edge cases with null and undefined from valueOf/toString', () => {
        expect(toNumber({ valueOf: () => null })).toBe(0); // `+null` is 0
        expect(toNumber({ valueOf: () => undefined })).toBeNaN();
        expect(toNumber({ toString: () => null })).toBe(0); // `+null` is 0
        expect(toNumber({ toString: () => undefined })).toBeNaN();
    });
});


describe('toNumber - Symbols', () => {
    test('returns NaN for all symbol types', () => {
        expect(toNumber(Symbol("test"))).toBeNaN();
        expect(toNumber(Symbol.for("key"))).toBeNaN();
    });
});

describe('toNumber - General String Cases', () => {
    test('converts numeric strings with whitespace', () => {
        expect(toNumber("  3.2 ")).toBe(3.2);
    });

    test('returns NaN for non-numeric strings', () => {
        expect(toNumber("invalid")).toBeNaN();
    });
});

describe('toNumber - Numbers', () => {
    test('converts positive numbers to positive numbers', () => {
        expect(toNumber(3.2)).toBe(3.2);
        expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
        expect(toNumber(Infinity)).toBe(Infinity);
    });

    test('coverts negative numbers to negative numbers', () => {
        expect(toNumber(-3)).toBe(-3);
        expect(toNumber(-Number.MIN_VALUE)).toBe(-5e-324);
        expect(toNumber(-Infinity)).toBe(-Infinity);
    });
});
