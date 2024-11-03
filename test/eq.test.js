import eq from '../src/eq';

describe('eq', () => {
    /*
    * Is this assertion format more readable than the one used in add.test.js
    * and camelCase.test.js?
    */
    describe('when given valid inputs', () => {
        test('should return true when given two equal primitive values', () => {
            expect(eq('foo', 'foo')).toBe(true);
            expect(eq(1, 1)).toBe(true);
            expect(eq(true, true)).toBe(true);
            expect(eq(null, null)).toBe(true);
            expect(eq(undefined, undefined)).toBe(true);
            expect(eq(NaN, NaN)).toBe(true);
        });

        test('should return true when given two equal objects', () => {
        });

        test('should return false when given two different primitive values', () => {
        });
    });

    /*
    * Limit value analysis:
    * the edge value and one value after the edge value
    * 
    * MAX_SAFE_INTEGER is the largest possible safe integer used in calculations,
    * so I am not sure if it should even work properly with eq. Similarly with
    * the other limit values.
    */
    describe('when given limit values', () => {
        test('should return true when given two equal limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(true);
            expect(eq(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1)).toBe(true);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)).toBe(true);
            expect(eq(Number.MIN_SAFE_INTEGER - 1, Number.MIN_SAFE_INTEGER - 1)).toBe(true);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(true);
            expect(eq(Number.MAX_VALUE + 1.0, Number.MAX_VALUE + 1.0)).toBe(true);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE)).toBe(true);
            expect(eq(Number.MIN_VALUE - 1.0, Number.MIN_VALUE - 1.0)).toBe(true);
        });

        test('should retrun false when given two different limit values', () => {
            expect(eq(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER + 1)).toBe(false);
            expect(eq(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER - 1)).toBe(false);
            expect(eq(Number.MAX_VALUE, Number.MAX_VALUE + 1.0)).toBe(false);
            expect(eq(Number.MIN_VALUE, Number.MIN_VALUE - 1.0)).toBe(false);
        });
    });
});