import camelCase from '../src/camelCase';

describe('camelCase', () => {
    test('works with strings', () => {
        expect(camelCase('foo bar')).toEqual(' fooBar');
    });
});