import get from '../src/get.js';

describe('get', () => {
    test('gets the value of a property', () => {
        const object = {'foo': 'bar' };
        expect(get(object, 'foo')).toBe('bar');
    });
});