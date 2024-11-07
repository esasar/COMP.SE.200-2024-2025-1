import get from '../src/get.js';
describe('get function', () => {

  // Test for basic property access
  test('returns the value of a direct property', () => {
    const object = { a: 1 };
    expect(get(object, 'a')).toBe(1);
  });

  // Test for nested property access
  test('returns the value of a nested property using dot notation', () => {
    const object = { a: { b: { c: 3 } } };
    expect(get(object, 'a.b.c')).toBe(3);
  });

  // Test for accessing array elements
  test('returns the value at the array index', () => {
    const object = { a: [{ b: 2 }] };
    expect(get(object, 'a[0].b')).toBe(2);
  });

  test('returns the value at the array index using array path notation', () => {
    const object = { a: [{ b: 2 }] };
    expect(get(object, ['a', '0', 'b'])).toBe(2);
  });

  // Test for default value return
  test('returns the default value when the property is undefined', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.c', 'default')).toBe('default');
  });

  test('returns the default value when the property path does not exist', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.x.y', 'default')).toBe('default');
  });

  // Test for null or undefined object
  test('returns undefined when the object is null', () => {
    const object = null;
    expect(get(object, 'a')).toBeUndefined();
  });

  test('returns undefined when the object is undefined', () => {
    const object = undefined;
    expect(get(object, 'a')).toBeUndefined();
  });

  // Test for empty or malformed paths
  test('returns undefined for an empty path', () => {
    const object = { a: 1 };
    expect(get(object, '')).toBeUndefined();
  });

  test('returns undefined for a malformed path', () => {
    const object = { a: 1 };
    expect(get(object, 'a[0]')).toBeUndefined();
  });

  // Test for invalid paths and default fallback
  test('returns default value for an invalid path with a default specified', () => {
    const object = { a: 1 };
    expect(get(object, 'a.b.c', 'default')).toBe('default');
  });

  test('returns the default value for undefined path', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.x.y', 'default')).toBe('default');
  });

  // Test for retrieving undefined from an object with undefined properties
  test('returns default value when the property is explicitly undefined', () => {
    const object = { a: undefined };
    expect(get(object, 'a', 'default')).toBe('default');
  });



  // Test for symbol paths
  test('returns value for symbol path', () => {
    const sym = Symbol('a');
    const object = { [sym]: 1 };
    expect(get(object, sym)).toBe(1);
  });

  test('returns default value for invalid symbol path', () => {
    const sym = Symbol('a');
    const object = {};
    expect(get(object, sym, 'default')).toBe('default');
  });

  // Test for memoized function
  test('returns memoized value for repeated calls', () => {
    const object = { a: { b: 2 } };
    const memoizedGet = get(object, 'a.b');
    expect(memoizedGet).toBe(2);
    expect(get(object, 'a.b')).toBe(2); // Should hit the cache
  });

  test('returns new value after object modification', () => {
    const object = { a: { b: 2 } };
    expect(get(object, 'a.b')).toBe(2);
    object.a.b = 3;
    expect(get(object, 'a.b')).toBe(3); // Should reflect the new value
  });
});
