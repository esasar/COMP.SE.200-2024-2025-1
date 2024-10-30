import memoize from '../src/memoize';

describe('memoize', () => {
    test('memoizes the result of a function', () => {
        const double = (value) => value * 2;
        const memoized = memoize(double);
        expect(memoized(2)).toBe(4);
    });
});