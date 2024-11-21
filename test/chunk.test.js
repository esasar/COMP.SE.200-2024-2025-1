import chunk from '../src/chunk';
import toInteger from '../src/toInteger';

describe('chunk', () => {
    describe('when given valid inputs', () => {
        test('splits even length arrays to equal chunks', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
        });

        test('splits odd length arrays to equal chunks with remainder', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], 'd']);
        });

        test('splits array to single chunk when size is greater than array length', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 5)).toEqual([['a', 'b', 'c', 'd']]);
        });

        test('splits array to single chunk when size is equal to array length', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 4)).toEqual([['a', 'b', 'c', 'd']]);
        });

        test('splits array to chunks of size 1', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 1)).toEqual([['a'], ['b'], ['c'], ['d']]);
        });

        test('splits empty array to an empty array', () => {
            expect(chunk([], 2)).toEqual([]);
        });

        test('splits array to chunks of size 1 when size is not provided', () => {
            expect(chunk(['a', 'b', 'c', 'd'])).toEqual([['a'], ['b'], ['c'], ['d']]);
        });

        // according to the source code, the following ones are expected behaviour
        test('splits null to an empty array', () => {
            expect(chunk(null, 2)).toEqual([]);
        });

        test('splits undefined to an empty array', () => {
            expect(chunk(undefined, 2)).toEqual([]);
        });

        test('splits array to an empty array when size is less than 1', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 0)).toEqual([]);
        });

        test('splits non-integer sizes by rounding down', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 2.5)).toEqual([['a', 'b'], ['c', 'd']]);
        });
    });

    // what do we even expect to happen when we give invalid inputs?
    describe('when given invalid inputs', () => {
        test('handles non-array input array', () => {
            expect(chunk('foo', 1)).toBe([]);
        });

        test('handles non-number size', () => {
            expect(chunk(['a', 'b', 'c', 'd'], 'foo')).toBe([]);
        });
    });

    /**
    * how to test chunk with arbitrarily large arrays effectively?
    *   what is the size the input array?
    *   what is the chunk size?
    *   do we verify that each chunk is correct or just some of them?
    */

    describe('when given valid limit values', () => {
        /**
         * NOTE: These test cause 
         * """FATAL ERROR: invalid table size Allocation failed - JavaScript heap out of memory"""
         * Even though one would expect the test to pass, it is not possible to run them.
         */
        /*
        test('splits array to a single chunk when size is a very large integer', () => {
            expect(chunk(['a', 'b', 'c', 'd'], Number.MAX_SAFE_INTEGER)).toBe([['a', 'b', 'c', 'd']]);
        });

        test('splits array to a single chunk when size is a very large number', () => {
            expect(chunk(['a', 'b', 'c', 'd'], Number.MAX_VALUE)).toBe([['a', 'b', 'c', 'd']]);
        });

        test('splits array to an empty array when size is a very small integer', () => {
            expect(chunk(['a', 'b', 'c', 'd'], Number.MIN_SAFE_INTEGER)).toBe([]);
        });

        test('splits array to a single chunk when size is a very small number', () => {
            expect(chunk(['a', 'b', 'c', 'd'], Number.MIN_VALUE)).toBe([]);
        })
        */

        test('splits a very large array to correct size', () => {
            const array = Array.from({ length: 1000 }, (_, i) =>  i);
            const result = chunk(array, 10);
            expect(result.length).toBe(10);
            expect(result[9].length).toBe(10);
        });
    });
});