import filter from '../src/filter';

describe('filter', () => {
    describe('when given valid inputs', () => {
        /**
         * Note: the JSDoc does not specify what is returned when no elements
         * pass the predicate check. It is assumed, that the function should return
         * an empty array containing an empty array i.e. [[]] as can be inferred 
         * from the source code.
         */
        test('filters array to only elements passing the predicate check', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, ({ condition }) => condition);
            expect(result).toEqual([
                { foo: 'bar', condition: true },
                { foo: 'qux', condition: true },
            ]);
        });

        test('filters an array where no elements pass the predicate check to an empty array containing an empty array', () => {
            const array = [
                { foo: 'bar', condition: true },
                { foo: 'baz', condition: false },
                { foo: 'qux', condition: true },
            ];
            const result = filter(array, ({ condition }) => condition === 'hello');
            expect(result).toEqual([[]]);
        });

        test('filters an empty array to an empty array containing an empty array', () => {
            const result = filter([], () => true);
            expect(result).toEqual([[]]);
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
            expect(result).toEqual([[]]);
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

        /**
         * JSDoc describes that predicate can also return 'truthy' or 'falsy' values.
         */
        test('filters using a predicate that returns non-boolean values', () => {
            const array = [1, 2, 3, 4];
            const result = filter(array, (item) => item % 2);
            expect(result).toEqual([1, 3]);
        });

        test('does not mutate the original array', () => {
            const array = [{ foo: 'bar', condition: true }, { foo: 'baz', condition: false }];
            const result = filter(array, ({ condition }) => condition);
            expect(array).toEqual([{ foo: 'bar', condition: true }, { foo: 'baz', condition: false }]);
        });
    });

    /**
    * Invalid inputs
    */
    describe('when given invalid inputs', () => {
        test('handles non-array inputs', () => {
            expect(filter({ foo: 'bar' }, () => true)).toEqual([[]]);
        });

        test('handles null/undefined/NaN input array', () => {
            expect(filter(null, () => true)).toEqual([[]]);
            expect(filter(undefined, () => true)).toEqual([[]]);
            expect(filter(NaN, () => true)).toEqual([[]]);
        });

        test('throws TypeError with non-function predicate checks', () => {
            expect(() => filter(['a', 'b'], 'foo')).toThrow(TypeError);
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

        test('filters arrays containing null and undefined values', () => {
            const array = [null, undefined, { foo: 'bar' }];
            const result = filter(array, (item) => item && item.foo === 'bar');
            expect(result).toEqual([{ foo: 'bar' }]);
        });

        test('filters deeply nested arrays', () => {
            const array = [[1, 2], [3, 4], [5, 6]];
            const result = filter(array, (item) => item[0] > 3);
            expect(result).toEqual([[5, 6]]);
        });

        test('handles predicate that modifies the array during filtering', () => {
            const array = [1, 2, 3, 4];
            const result = filter(array, (item, index, arr) => {
                if (item === 2) arr.push(5);
                return item % 2 === 0;
            });
            expect(result).toEqual([2, 4]);
        });

        test('filters sparse arrays', () => {
            const array = [1, , 3];
            const result = filter(array, (item) => item === 3);
            expect(result).toEqual([3]);
        });
    });

    /**
     * Limit values
     */
    describe('when given valid limit values', () => {
        test('filters a very large array', () => {
            const array = Array.from({ length: 1000 }, (_, i) => i);
            const result = filter(array, (item) => item % 2 === 0);
            expect(result.length).toEqual(500);
        });
    });
});
