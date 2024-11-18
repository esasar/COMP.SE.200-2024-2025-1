import eq from '../src/eq';

describe('eq', () => {
    /*
    * Is this assertion format more readable than the one used in add.test.js
    * and camelCase.test.js?
    */
    describe('when given valid inputs', () => {
        test('returns true when given two equal primitive values', () => {
            expect(eq('foo', 'foo')).toBe(true);
            expect(eq(1, 1)).toBe(true);
            expect(eq(true, true)).toBe(true);
            expect(eq(null, null)).toBe(true);
            expect(eq(undefined, undefined)).toBe(true);
            expect(eq(NaN, NaN)).toBe(true);
        });

        test('returns false when given two different primitive values', () => {
            expect(eq('foo', 'bar')).toBe(false);
            expect(eq(1, 2)).toBe(false);
            expect(eq(true, false)).toBe(false);
            expect(eq(null, undefined)).toBe(false);
            expect(eq(NaN, null)).toBe(false);
            expect(eq(1, true)).toBe(false);
        });

        test('returns true when given two equal objects', () => {
            const obj1 = { foo: "bar" };
            const obj2 = { foo: "bar" };
            expect(eq(obj1, obj2)).toBe(true);
        });

        test('returns false when given two different objects', () => {
            const obj1 = { foo: true };
            const obj2 = { foo: 1 };
            expect(eq(obj1, obj2)).toBe(false);
        });
    });

    /*
    * Limit value analysis:
    * the edge value and one value after the edge value
    * 
    * MAX_SAFE_INTEGER is the largest possible safe integer used in calculations,
    * so I am not sure if it should even work properly with eq. Similarly with
    * the other limit values.
    * 
    * Edit: Number.MAX_SAFE_INTEGER+1 IS NOT SAFE, so it should not be used in testing.
    * Similarly for MIN_SAFE_INTEGER-1.
    */
    describe('when given limit values', () => {
        test('returns true when given two equal limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(true);
            // expect(eq(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1)).toBe(true);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)).toBe(true);
            // expect(eq(Number.MIN_SAFE_INTEGER - 1, Number.MIN_SAFE_INTEGER - 1)).toBe(true);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(true);
            // expect(eq(Number.MAX_VALUE + 1.0, Number.MAX_VALUE + 1.0)).toBe(true);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE)).toBe(true);
            // expect(eq(Number.MIN_VALUE - 1.0, Number.MIN_VALUE - 1.0)).toBe(true);
        });

        test('returns false when given two different limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1)).toBe(false);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1)).toBe(false);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE - 1.0)).toBe(false);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE + 1.0)).toBe(false);
        });
    });
});