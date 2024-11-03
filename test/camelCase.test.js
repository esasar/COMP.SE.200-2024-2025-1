import camelCase from '../src/camelCase';

describe('camelCase', () => {

    describe('when given valid (string) inputs', () => {
        test('should convert single lowercase word', () => {
            expect(camelCase('foo')).toBe('foo');
        });

        test('should convert single uppercase word', () => {
            expect(camelCase('Foo')).toBe('foo');
        });

        test('should convert space separated words', () => {
            expect(camelCase('foo bar')).toBe('fooBar');
        });

        test('should convert hyphen separated words', () => {
            expect(camelCase('foo-bar')).toBe('fooBar');
        });

        test('should convert underscore separated words', () => {
            expect(camelCase('foo_bar')).toBe('fooBar');
        });

        test('should convert dot separated words', () => {
            expect(camelCase('foo.bar')).toBe('fooBar');
        });

        test('should convert mixed separated words', () => {
            expect(camelCase('foo bar-baz')).toBe('fooBarBaz');
        });

        test('should convert words with trailing spaces', () => {
            expect(camelCase(' foo ')).toBe('foo');
        });

        test('should convert words with multiple consecutive separators', () => {
            expect(camelCase('foo   bar')).toBe('fooBar');
        });

        test('should convert words with non-english latin characters', () => {
            expect(camelCase('fóó bár')).toBe('fóóBár');
        });

        test('should convert words with non-latin characters', () => {
            expect(camelCase('富 酒吧')).toBe('富酒吧');
        });

        test('should convert words with numbers', () => {
            expect(camelCase('foo 123 bar')).toBe('foo123Bar');
        });

        test('should handle empty string', () => {
            expect(camelCase('')).toBe('');
        });
    });

    describe('when given invalid (non-string) inputs', () => {
        test('returns empty string when input is only special characters', () => {
            expect(camelCase('!@#$%^&*()')).toBe('');
        });

        test('returns empty string when input is a number', () => {
            expect(camelCase(42)).toBe('');
        });

        test('returns empty string when input is a boolean', () => {
            expect(camelCase(true)).toBe('');
        });

        test('returns empty string when input is an object', () => {
            expect(camelCase({ foo: 'bar' })).toBe('');
        });

        test('returns empty string when input is an array', () => {
            expect(camelCase(['foo', 'bar'])).toBe('');
        });

        test('returns empty string when input is null', () => {
            expect(camelCase(null)).toBe('');
        });

        test('returns empty string when input is undefined', () => {
            expect(camelCase(undefined)).toBe('');
        });

        test('returns empty string when input is NaN', () => {
            expect(camelCase(NaN)).toBe('');
        });

        test('returns empty string when input is a function', () => {
            expect(camelCase(() => { return 'foo' })).toBe('');
        });
    });

    /* What would limit values be for camelCase? */
});