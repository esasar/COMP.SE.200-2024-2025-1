import eq from '../src/eq';

describe('eq', () => {
    test('returns true with identical primitive values', () => {
        expect(eq(1, 1)).toBe(true);
    });
});