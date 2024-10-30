import filter from '../src/filter';

describe('filter', () => {
    test('filters numbers from strings', () => {
        expect(filter([1, '2', 3, '4'], (value) => typeof value === 'number')).toEqual([1, 3]);
    });
});