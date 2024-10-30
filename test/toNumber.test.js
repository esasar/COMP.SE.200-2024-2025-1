import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
    test('converts string with decimal to number', () => {
        expect(toNumber('4.2')).toBe(4.2);
    });
});