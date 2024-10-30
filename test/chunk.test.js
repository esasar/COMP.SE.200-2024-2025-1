import chunk from '../src/chunk';

describe('chunk', () => {
    test('works with an array', () => {
        expect(chunk(['a', 'b', 'c', 'd'], 1)).toEqual([['a'], ['b'], ['c'], ['d']]);  
    });
});