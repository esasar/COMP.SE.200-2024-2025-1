import isEmpty from '../src/isEmpty.js';

describe('isEmpty function', () => {

  // Test for primitive values (null, undefined, boolean, etc.)
  test('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for a boolean', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });

  test('returns true for a number', () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(1)).toBe(true);
  });

  // Test for empty and non-empty arrays
  test('returns true for an empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('returns false for a non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  // Test for empty and non-empty strings
  test('returns true for an empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('returns false for a non-empty string', () => {
    expect(isEmpty('abc')).toBe(false);
  });

  // Test for arguments objects
  test('returns true for an empty arguments object', () => {
    (function() {
      expect(isEmpty(arguments)).toBe(true);
    })();
  });

  test('returns false for a non-empty arguments object', () => {
    (function() {
      expect(isEmpty(arguments)).toBe(false);
    })(1);
  });

  // Test for buffers
  test('returns true for an empty buffer', () => {
    const buffer = Buffer.alloc(0);
    expect(isEmpty(buffer)).toBe(true);
  });

  test('returns false for a non-empty buffer', () => {
    const buffer = Buffer.from([1, 2, 3]);
    expect(isEmpty(buffer)).toBe(false);
  });

  // Test for sets
  test('returns true for an empty set', () => {
    const set = new Set();
    expect(isEmpty(set)).toBe(true);
  });

  test('returns false for a non-empty set', () => {
    const set = new Set([1, 2, 3]);
    expect(isEmpty(set)).toBe(false);
  });

  // Test for maps
  test('returns true for an empty map', () => {
    const map = new Map();
    expect(isEmpty(map)).toBe(true);
  });

  test('returns false for a non-empty map', () => {
    const map = new Map([['key', 'value']]);
    expect(isEmpty(map)).toBe(false);
  });

  // Test for plain objects (empty and non-empty)
  test('returns true for an empty plain object', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('returns false for a non-empty plain object', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('should return true for an empty prototype object', () => {
    function Foo() {}
    expect(isEmpty(Foo.prototype)).toBe(true);
  });

  test('should return false for a non-empty prototype object', () => {
    function Foo() {}
    Foo.prototype.a = 1;
    const foo = new Foo();
    foo.b = 2;
    expect(isEmpty(foo)).toBe(false);
  });

  // Test for objects with inherited properties
  test('returns false for an object with own and inherited properties', () => {
    const obj = Object.create({ inherited: 1 });
    obj.own = 2;
    expect(isEmpty(obj)).toBe(false);
  });

});
