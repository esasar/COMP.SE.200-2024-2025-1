import toNumber from '../src/toNumber.js';

describe('When given integer', () => {
    test('should handle adding 1 to MAX_SAFE_INTEGER correctly', () => {
        const maxSafeInteger = Number.MAX_SAFE_INTEGER;
        const result = toNumber(maxSafeInteger + 1);
        expect(result).toBeGreaterThan(maxSafeInteger); // the result should be atleast a little bit bigger
        expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER + 1); // The result should not grow more than 1
        expect(result).not.toBeNaN();
      });
    test('returns the number itself for maximum positive Integer', () => {
        expect(toNumber(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    });
    test('returns the number itself for minimum positive Integer', () => {
        expect(toNumber(1)).toBe(1);
    });
    test('returns the number itself for 0', () => {
        expect(toNumber(0)).toBe(0);
    });
    test('returns the number itself for minimum negative Integer', () => {
        expect(toNumber(-1)).toBe(-1);
    });
    test('returns the number itself for maximum negative Integer', () => {
        expect(toNumber(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
    });
    test('should handle substracting 1 from maximum negative integer correctly', () => {
        const minSafeInteger = Number.MIN_SAFE_INTEGER;
        const result = toNumber(minSafeInteger -1);
        expect(result).toBeLessThan(minSafeInteger); // the result should be atleast a little bit less
        expect(result).toBeGreaterThanOrEqual(minSafeInteger - 1); // The result should not decrease more than 1
        expect(result).not.toBeNaN();
      });
});

describe('When given float', () => {
    test('returns the number itself for maximum positive float', () => {
        expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    });
    test('returns the number itself for a valid float', () => {
        expect(toNumber(3.2)).toBe(3.2);
    });
    test('returns the number itself for minimum positive float', () => {
        expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    })
    test('returns the number itself for maximum 0.0', () => {
        expect(toNumber(0.0)).toBe(0.0);
    });
    test('returns the number itself for -0.0', () => {
        expect(toNumber(-0.0)).toBe(-0.0);
    });
    test('returns the number itself for minimum negative float', () => {
        expect(toNumber(-Number.MIN_VALUE)).toBe(-Number.MIN_VALUE);
    });
    test('returns the number itself for a valid negative float', () => {
        expect(toNumber(-3.2)).toBe(-3.2);
    });
    test('returns the number itself for maximum negative float', () => {
        expect(toNumber(-Number.MAX_VALUE)).toBe(-Number.MAX_VALUE);
    });
    test('returns the number for maximum negative float - 1', () => {
        expect(toNumber(-Number.MAX_VALUE - 1)).toBe(-Number.MAX_VALUE - 1);
    });
});

describe('When given general strings', () => {
    test('returns number for numeric strings', () => {
        expect(toNumber("32")).toBe(32);
    });
    test('returns number for numeric strings with leading plus sign', () => {
        expect(toNumber("+3.2")).toBe(3.2);
    });
    test('returns number for numeric strings with leading minus sign', () => {
        expect(toNumber("-32")).toBe(-32);
    });
    test('returns valid number for numeric strings with leading zeros', () => {
        expect(toNumber("00123.23")).toBe(123.23);
    });
    test('returns valid number for numeric float strings with trailing zeros', () => {
        expect(toNumber("3.200")).toBe(3.2);
    });
    test('returns number for numeric strings with exponential notation', () => {
        expect(toNumber("1.23e03")).toBe(1230);
    });
    test('returns number for numeric strings with whitespace', () => {
        expect(toNumber("  3.2 ")).toBe(3.2);
    });
    test('returns NaN for non-numeric strings', () => {
        expect(toNumber("invalid")).toBeNaN();
    });
});

describe('When given binary strings', () => {
    test('returns number for valid binary strings', () => {
        expect(toNumber("0b0")).toBe(0);
        expect(toNumber("0b1")).toBe(1);
    });

    test('returns NaN for invalid binary strings', () => {
        expect(toNumber("-0b2")).toBeNaN();
        expect(toNumber("0b10102")).toBeNaN();
        expect(toNumber("0b")).toBeNaN();
    });
});

describe('When given octal strings', () => {
    test('returns number for valid octal strings', () => {
        expect(toNumber("0o0")).toBe(0);
        expect(toNumber("0o7")).toBe(7);
        expect(toNumber("0o10")).toBe(8);
    });

    test('returns NaN for invalid octal strings', () => {
        expect(toNumber("0o8")).toBeNaN();
        expect(toNumber("-0o1238")).toBeNaN();
    });
});

describe('When given hexadecimal strings', () => {
    test('returns number for valid hexadecimal strings', () => {
        expect(toNumber("0x0")).toBe(0);
        expect(toNumber("0xabcdef")).toBe(11259375);
    });

    test('returns NaN for invalid hexadecimal strings', () => {
        expect(toNumber("-0x1")).toBeNaN();
        expect(toNumber("0xG1")).toBeNaN();
        expect(toNumber("0x")).toBeNaN();
    });
});

describe('When given edge case types types', () => {
    test('returns NaN for symbols', () => {
        expect(toNumber(Symbol("test"))).toBeNaN();
    });
    test('returns NaN for functions', () => {
        expect(toNumber(() => 13)).toBeNaN();
    });

    test('returns NaN for arrays', () => {
        expect(toNumber([12, 14])).toBeNaN();
    });

    test('returns NaN for undefined', () => {
        expect(toNumber(undefined)).toBeNaN();
    });

    test('returns 0 for null', () => {
        expect(toNumber(null)).toBe(0);
    });
    test('returns 1 for true', () => {
        expect(toNumber(true)).toBe(1);
    });
    test('returns 0 for false', () => {
        expect(toNumber(false)).toBe(0);
    });
    test('returns NaN for NaN', () => {
        expect(toNumber(NaN)).toBeNaN();
    });
    test('returns NaN for functions', () => {
        expect(toNumber(() => 13)).toBeNaN();
    });
    test('returns infinity for Infinity', () => {
        expect(toNumber(Infinity)).toBe(Infinity);
    });
    test('returns negative infinity for -Infinity', () => {
        expect(toNumber(-Infinity)).toBe(-Infinity);
    });
    test('returns NaN for empty input', () => {
        expect(toNumber()).toBeNaN();
    });
});

describe('When given objects', () => {
    describe('When object does not have a custom valueOf method', () => {
        test('returns number when new object has a toString method, which returns a number', () => {
            expect(toNumber({ toString: () => 13 })).toBe(13);
        });
        test('returns number when new object has a toString method, which returns a numeric string', () => {
            expect(toNumber({ toString: () => "13" })).toBe(13);
        });
    });

    describe('When object has a custom valueOf method, which returns a number', () => {
        test('returns number when valueOf returns maximum positive integer', () => {
            expect(toNumber({ valueOf: () => Number.MAX_SAFE_INTEGER })).toBe(Number.MAX_SAFE_INTEGER);
        });
        test('returns number when valueOf returns minimum positive integer', () => {
            expect(toNumber({ valueOf: () => 1 })).toBe(1);
        });
        test('returns when valueOf returns maximum negative integer', () => {
            expect(toNumber({ valueOf: () => Number.MIN_SAFE_INTEGER })).toBe(Number.MIN_SAFE_INTEGER);
        });
        test('returns number when valueOf returns minimum negative integer', () => {
            expect(toNumber({ valueOf: () => -1 })).toBe(-1);
        });
        test('returns number when valueOf returns 0', () => {
            expect(toNumber({ valueOf: () => 0 })).toBe(0);
        });
        test('returns number when valueOf returns -0', () => {
            expect(toNumber({ valueOf: () => -0 })).toBe(-0);
        });
        test('returns number when valueOf returns maximum positive float', () => {
            expect(toNumber({ valueOf: () => Number.MAX_VALUE })).toBe(Number.MAX_VALUE);
        });
        test('returns number when valueOf returns a valid float', () => {
            expect(toNumber({ valueOf: () => 3.2 })).toBe(3.2);
        });
        test('returns number when valueOf returns minimum positive float', () => {
            expect(toNumber({ valueOf: () => Number.MIN_VALUE })).toBe(Number.MIN_VALUE);
        });
        test('returns number when valueOf returns 0.0', () => {
            expect(toNumber({ valueOf: () => 0.0 })).toBe(0.0);
        });
        test('returns number when valueOf returns -0.0', () => {
            expect(toNumber({ valueOf: () => -0.0 })).toBe(-0.0);
        });
        test('returns number when valueOf returns minimum negative float', () => {
            expect(toNumber({ valueOf: () => -Number.MIN_VALUE })).toBe(-Number.MIN_VALUE);
        });
        test('returns number when valueOf returns a valid negative float', () => {
            expect(toNumber({ valueOf: () => -3.2 })).toBe(-3.2);
        });
        test('returns number when valueOf returns maximum negative float', () => {
            expect(toNumber({ valueOf: () => -Number.MAX_VALUE })).toBe(-Number.MAX_VALUE);
        });
        test('returns infinity when valueOf returns Infinity', () => {
            expect(toNumber({ valueOf: () => Infinity })).toBe(Infinity);
        });
        test('returns negative infinity when valueOf returns -Infinity', () => {
            expect(toNumber({ valueOf: () => -Infinity })).toBe(-Infinity);
        })
    });
    
    describe('When object has custom valueOf method, which returns a string', () => {
        test('returns number when valueOf returns a positive numeric string', () => {
            expect(toNumber({ valueOf: () => "123" })).toBe(123);
        });
        test('returns number when valueOf returns a negative numeric string', () => {
            expect(toNumber({ valueOf: () => "-123" })).toBe(-123);
        });
        test('returns number when valueOf returns zero as string', () => {
            expect(toNumber({ valueOf: () => "0" })).toBe(0);
        });
        test('returns number when valueOf returns a valid numeric string with whitespace and leading zeros', () => {
            expect(toNumber({ valueOf: () => "  00123  " })).toBe(123);
        });
        test('returns number when valueOf returns a valid numeric string with leading plus sign', () => {
            expect(toNumber({ valueOf: () => "+123" })).toBe(123);
        });
        test('returns number when valueOf returns a 1.23e03', () => {
            expect(toNumber({ valueOf: () => "1.23e03" })).toBe(1230);
        });
        test('returns number when valueOf returns a -1.11e-03', () => {
            expect(toNumber({ valueOf: () => "-1.11e-03" })).toBe(-0.00111);
        });
    });

    describe('When object has a custom valueOf method, which returns neither number nor string', () => {
        test('returns NaN when valueOf returns NaN', () => {
            expect(toNumber({ valueOf: () => NaN })).toBeNaN();
        });
        test('returns 0 when valueOf returns null', () => {
            expect(toNumber({ valueOf: () => null })).toBe(0);
        });
        test('returns NaN when valueOf returns undefined', () => {
            expect(toNumber({ valueOf: () => undefined })).toBeNaN();
        });
        test('returns NaN when valueOf returns an object', () => {
            expect(toNumber({ valueOf: () => ({ value: 13 }) })).toBeNaN();
        });
        test('returns NaN when valueOf returns an array', () => {
            expect(toNumber({ valueOf: () => [12, 14] })).toBeNaN();
        });
        test('returns NaN when valueOf returns a function', () => {
            expect(toNumber({ valueOf: () => () => 13 })).toBeNaN();
        });
        test('returns 1 when valueOf returns a true', () => {
            expect(toNumber({ valueOf: () => true })).toBe(1);
        });
        test('returns 0 when valueOf returns a false', () => {
            expect(toNumber({ valueOf: () => false })).toBe(0);
        });
    });

    describe('When object has a custom valueOf method, which returns a new object,', () => {
        test('returns number, when new object has a toString method, which returns a number', () => {
            expect(toNumber({ valueOf: () => ({ toString: () => 13 }) })).toBe(13);
        });
        test('returns number, when new object has a toString method, which returns a numeric string', () => {
            expect(toNumber({ valueOf: () => ({ toString: () => "13" }) })).toBe(13);
        });
        test('returns NaN, when new object has a toString method, which returns non numeric string', () => {
            expect(toNumber({ valueOf: () => ({ toString: () => "invalid" }) })).toBeNaN();
        });
        test('returns NaN, when new object has a toString method, which returns an array', () => {
            expect(toNumber({ valueOf: () => ({ toString: () => [12, 14] }) })).toBeNaN();
        });
        test('returns NaN, when new object has a toString method, which returns an object', () => {
            expect(toNumber({ valueOf: () => ({ toString: () => ({ value: 13 }) }) })).toBeNaN();
        });
        test('returns NaN, when new object does not have a custom toString method', () => {
            expect(toNumber({ valueOf: () => ({value: 13 }) })).toBeNaN();
        });
    });

    describe('When object has a custom valueOf property, but it\'s not a function', () => {
        test('Return NaN, when valueOf is a number', () => {
            expect(toNumber({ valueOf: 13 })).toBeNaN();
        });
        test('Returns NaN, when valueOf is a string', () => {
            expect(toNumber({ valueOf: "invalid" })).toBeNaN();
        });
        test('Returns NaN, when valueOf is an array', () => {
            expect(toNumber({ valueOf: [12, 14] })).toBeNaN();
        });
        test('Returns NaN, when valueOf is an object', () => {
            expect(toNumber({ valueOf: ({ value: 13 }) })).toBeNaN();
        });
        test('Returns NaN, when valueOf is a boolean', () => {
            expect(toNumber({ valueOf: true })).toBeNaN();
        });
        test('Returns NaN, when valueOf is a undefined', () => {
            expect(toNumber({ valueOf: undefined })).toBeNaN();
        });
    });
});

