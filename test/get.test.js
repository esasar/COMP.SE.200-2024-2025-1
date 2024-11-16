import get from '../src/get.js';


 describe('When using dot notation to access properties', () => {
  test('returns the value of a direct property', () => {
    const object = { a: 1 };
    expect(get(object, 'a')).toBe(1);
  });

  test('returns the value of a nested property using dot notation', () => {
    const object = { a: { b: { c: 3 } } };
    expect(get(object, 'a.b.c')).toBe(3);
  });

  test('returns "undefined" in an array property', () => {
    const object = { a: [{ b: undefined }] };
    expect(get(object, 'a[0].b')).toEqual(undefined);
  });

  test('returns the value in a nested array property, even if it is null', () => {
    const object = { a: [[1, 2, { b: null }]] };
    expect(get(object, 'a[0][2].b')).toBe(null);
  });

  test('returns the value at the array index using dot notation', () => {
    const object = { a: [{ "0": 2 }] };
    expect(get(object, 'a.0.0')).toBe(2);
  });
});

describe('When using array path notation to access properties', () => {
  test('returns the value at the array index using array path notation', () => {
    const object = { a: [{ 0: 2 }] };
    expect(get(object, ['a', '0', '0'])).toBe(2);
  });
});

describe('When using a default value', () => {
  test('returns the default value when the property path does not exist', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.x.y', 'default')).toBe('default');
  });

  test('returns the default value when the property is undefined', () => {
    const object = { a: { b: undefined } };
    expect(get(object, 'a.b', "this is default value")).toBe("this is default value");
  });

  test('returns the default even if it is an object, when found property is undefined', () => {
    const object = { a: { b: undefined } };
    expect(get(object, 'a.b', {a: 2})).toEqual({a: 2});
  });
});

describe('When given invalid parameters and no default value', () => {
  test('returns undefined for an empty path', () => {
    const object = { a: 1 };
    expect(get(object, '')).toBeUndefined();
  });

  test('returns undefined for a malformed path', () => {
    const object = { a: 1 };
    expect(get(object, 'a[0]')).toBeUndefined();
  });

  test('returns undefined for an invalid path in array format', () => {
    const object = { a: {b: 3} };
    expect(get(object, ['a', 0, 'b', 'c'])).toBeUndefined();
  });
});

describe('When given edge cases', () => {
  test('Should return undefined for null', () => {
    expect(get(null, 'a')).toBeUndefined();
  });

  test('Should return undefined for undefined', () => {
    expect(get(undefined, 'a')).toBeUndefined();
  });

  test('Should return undefined for NaN', () => {
    expect(get(NaN, 'a')).toBeUndefined();
  });

  test('Should return undefined for Infinity', () => {
    expect(get(Infinity, 'a')).toBeUndefined();
  });

  test('Should return undefined for string', () => {
    expect(get('test', 'a')).toBeUndefined();
  });

  test('Should return undefined for number', () => {
    expect(get(123, 'a')).toBeUndefined();
  });

  test('Should return undefined for boolean', () => {
    expect(get(true, 'a')).toBeUndefined();
  });

  test('Should return undefined for symbol', () => {
    expect(get(Symbol('a'), 'a')).toBeUndefined();
  });

  test('Should return undefined for array', () => {
    expect(get([1, 2, 3], 'a')).toBeUndefined();
  });

  test('Should return undefined for function', () => {
    expect(get(() => {}, 'a')).toBeUndefined();
  });
});




describe('When using symbols in path', () => {
  test('returns value for symbol path in array format', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    const resultSym = Symbol('result');
    const object = { [sym1]: {[sym2]: resultSym} };
    expect(get(object, [sym1, sym2])).toBe(resultSym);
  });

  test('returns default value for invalid symbol path', () => {
    const sym = Symbol('a');
    const object = {};
    expect(get(object, sym, 'default')).toBe('default');
  });
});

describe('When objects inherit properties', () => {
  test('returns inherited property', () => {
    const parent = { a: 1 };
    const child = Object.create(parent);
    expect(get(child, 'a')).toBe(1);
  });
});

describe('When object is modified after get', () => {
  test('returns new value after object modification', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.b')).toBe(2);
    object.a.b = 3;
    expect(get(object, 'a.b')).toBe(3); // Should reflect the new value
  });
});