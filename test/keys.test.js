import keys from '../src/keys.js';

describe('keys', () => {
    test('returns keys of an object', () => {
        expect(keys({ 'foo': 'bar' })).toEqual(['foo']);
    });
});