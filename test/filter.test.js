import filter from '../src/filter';

describe('filter', () => {
    /**
    * How to comprehensively test the filter function with 
    *   varied predicate checks
    *   varied arrays
    *   ??
    */
    describe('when given valid inputs', () => {
        test('filters array to only elements passing the predicate check', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, ({ condition }) => condition);
            expect(result).toEqual([{ foo: 'bar', condition: true }]);
        });

        test('filters an array where no elements pass the predicate check to an empty array', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, ({ condition }) => condition === 'hello');
            expect(result).toEqual([]);
        });

        test('filters an empty array to an empty array', () => {
            const result = filter([], () => true);
            expect(result).toEqual([]);
        });

        test('filters array of mixed data types', () => {
            const array = [
                { foo: 'bar', condition: true },
                'foo',
                42,
            ];
            const result = filter(array, (item) => item === 42);
            expect(result).toEqual([42]);
        });

        test('filters an empty array when predicate always returns false', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, () => false);
            expect(result).toEqual([]);
        });

        test('filters original array when predicate always returns true', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, () => true);
            expect(result).toEqual(array);
        });
    });

    /**
    * Invalid inputs
    */
    describe('when given invalid inputs', () => {
        test('handles non-array inputs', () => {
            expect(filter({ foo: 'bar' }, () => true)).toBe([]);
        });

        test('handles null/undefined/NaN input array', () => {
            expect(filter(null, () => true)).toBe([]);
            expect(filter(undefined, () => true)).toBe([]);
            expect(filter(NaN, () => true)).toBe([]);
        });

        test('handles non-function predicate checks', () => {
            expect(fitler(['a', 'b'], 'foo')).toBe([]);
        });
    });

    /**
     * Edge cases
     */
    describe('when given edge cases', () => {
        test('filters an array with special numbers', () => {
            const array = [NaN, Infinity, -Infinity];
            const result = filter(array, (item) => item === Infinity);
            expect(result).toEqual([Infinity]);
        });
    });

    /**
    * What kind of limit values?
    */
    describe('when given valid limit values', () => {
        test('filters a very large array', () => {
            const array = Array.from({ length: 1000 }, (_, i) => i);
            const result = filter(array, (item) => item % 2 === 0);
            expect(result.length).toEqual(500);
        });
    });

});
