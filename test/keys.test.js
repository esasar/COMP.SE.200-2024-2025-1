import keys from '../src/keys.js';

test('should not return inherited properties', () => {
    const Foo = {
        a: 1,
        b: 2
    };
    Object.setPrototypeOf(Foo, { length: 1 }); // inherited property
    expect(keys(Foo)).toEqual(['a', 'b', ]); // Only own properties should be returned
});
test('returns property names for different types of preperties', () => {
    const objWithDifferentTypes = { arrProp: [1, 2, 3], stringProp: "test", numberProp: 13, objectProp: { a: 1, b: 2 },
        nullProp: null, undefinedProp: undefined, booleanProp: true, symbolProp: Symbol('test')};
    expect(keys(objWithDifferentTypes)).toEqual(['arrProp', 'stringProp', 'numberProp', 'objectProp', 'nullProp',
        'undefinedProp', 'booleanProp', 'symbolProp']); 
});
test('returns index keys for a string (array-like object)', () => {
    expect(keys("Hello")).toEqual(['0', '1', '2', '3', '4']);
});
test('returns index keys for a plain array', () => {
    expect(keys([10, 20, 30])).toEqual(['0', '1', '2']);
});

test('returns an empty array for null', () => {
    expect(keys(null)).toEqual([]);   
});
test('returns an empty array for undefined', () => {
    expect(keys(undefined)).toEqual([]);
});
