import filter from '../src/filter';

describe('filter', () => {
    /*
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
            const result = filter(array, ({ condition }) => true);
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
    });

    /*
    * What should we expect when these happen?
    * What kind of edge-cases?
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

    /*
    * What kind of limit values?
    */
    describe('when given valid limit values', () => {

    });

});
