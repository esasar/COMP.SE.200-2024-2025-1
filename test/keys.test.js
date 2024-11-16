import keys from '../src/keys.js';

describe('When dealing with inheritance and prototypes', () => {
    test('should not return inherited properties when prototype is set', () => {
        const Foo = {
            a: 1,
            b: 2
        };
        Object.setPrototypeOf(Foo, { length: 1 }); // inherited property
        expect(keys(Foo)).toEqual(['a', 'b' ]); // Only own properties should be returned
    });
    
    test('should not return inherited properties when new object inherits from prototype', () => {
        const prototype = { inheritedProperty: 1 };
        const newObject = Object.create(prototype);
        newObject.ownProperty = 2;
        expect(keys(newObject)).toEqual(['ownProperty']);
    });
});

describe('When given an object with different types of properties', () => {
    test('returns property names for different types of properties', () => {
        const objWithDifferentTypes = { arrProp: [1, 2, 3], stringProp: "test", numberProp: 13, objectProp: { a: 1, b: 2 },
            nullProp: null, undefinedProp: undefined, booleanProp: true, symbolProp: Symbol('test')};
        expect(keys(objWithDifferentTypes)).toEqual(['arrProp', 'stringProp', 'numberProp', 'objectProp', 'nullProp',
            'undefinedProp', 'booleanProp', 'symbolProp']);
    });
});

describe('When given an array-like object', () => {
    test('returns index keys for a string (array-like object)', () => {
        expect(keys("Hello")).toEqual(['0', '1', '2', '3', '4']);
    });
    test('returns index keys for a plain array', () => {
        expect(keys([10, 20, 30])).toEqual(['0', '1', '2']);
    });
});

describe('When given edge case objects', () => {
    test('returns an empty array for null', () => {
        expect(keys(null)).toEqual([]);   
    });
    test('returns an empty array for undefined', () => {
        expect(keys(undefined)).toEqual([]);
    });
    test('returns an empty array for a number', () => {
        expect(keys(123)).toEqual([]);
    });
    test('returns an empty array for an empty object', () => {
        expect(keys({})).toEqual([]);
    });
    test('returns an empty array for a boolean', () => {
        expect(keys(true)).toEqual([]);
    });
    test('returns an empty array for a Date object', () => {
        expect(keys(new Date())).toEqual([]);
    });
});
