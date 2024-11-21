import eq from '../src/eq';

describe('eq', () => {
    describe('when given valid inputs', () => {
        test('returns true when given two equal primitive values', () => {
            expect(eq('foo', 'foo')).toBe(true);
            expect(eq(1, 1)).toBe(true);
            expect(eq(true, true)).toBe(true);
            expect(eq(null, null)).toBe(true);
            expect(eq(undefined, undefined)).toBe(true);
            expect(eq(NaN, NaN)).toBe(true);
            expect(eq(-0, +0)).toBe(true);
            expect(eq(+0, -0)).toBe(true);
        });

        test('returns false when given two different primitive values', () => {
            expect(eq('foo', 'bar')).toBe(false);
            expect(eq(1, 2)).toBe(false);
            expect(eq(true, false)).toBe(false);
            expect(eq(null, undefined)).toBe(false);
            expect(eq(NaN, null)).toBe(false);
            expect(eq(1, true)).toBe(false);
        });

        test('return true when given two symbols with same symbol value', () => {
            const sym1 = Symbol('foo');
            const sym2 = sym1;
            expect(eq(sym1, sym2)).toBe(true);
        });

        test('returns false when given two identical symbols with different symbol value', () => {
            const sym1 = Symbol('foo');
            const sym2 = Symbol('foo');
            expect(eq(sym1, sym2)).toBe(false);
        });

        test('returns true when given two objects with same object value', () => {
            const obj1 = { foo: "bar" };
            const obj2 = obj1;
            expect(eq(obj1, obj2)).toBe(true);
        });

        test('returns false when given two identical objects with different object value', () => {
            const obj1 = { foo: "bar" };
            const obj2 = { foo: "bar" };
            expect(eq(obj1, obj2)).toBe(false);
        });
    });

    /*
    * Limit value analysis
    */
    describe('when given limit values', () => {
        test('returns true when given two equal limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(true);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)).toBe(true);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(true);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE)).toBe(true);
        });

        test('returns false when given two different limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1)).toBe(false);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1)).toBe(false);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE - 1.0)).toBe(false);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE + 1.0)).toBe(false);
        });
    });
});