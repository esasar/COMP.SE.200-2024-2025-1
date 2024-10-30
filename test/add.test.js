import add from '../src/add';

describe('add', () => {
    test('sums two nubmers together', () => {
        expect(add(2, 2)).toBe(4);
    });
});