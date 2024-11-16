import isEmpty from '../src/isEmpty.js';

describe('When given edge cases', () => {
  test('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for NaN', () => {
    expect(isEmpty(NaN)).toBe(true);
  });

  test('returns true for positive and negative infinity', () => {
    expect(isEmpty(Infinity)).toBe(true);
    expect(isEmpty(-Infinity)).toBe(true);
  });

  test('returns true for a boolean', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });

  test('returns true for a number', () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(1)).toBe(true);
  });
});

describe('When given array-like objects', () => {
  test('returns true for an empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('returns false for a non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('returns true for an empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('returns false for a non-empty string', () => {
    expect(isEmpty('abc')).toBe(false);
  });
});

describe('When given different types of collections', () => {
  test('returns true for empty arguments', () => {
    const args = (function() { return arguments; })();
    expect(isEmpty(args)).toBe(true);
  });

  test('returns false for non-empty arguments', () => {
    const args = (function() { return arguments; })(1, 2, 3);
    expect(isEmpty(args)).toBe(false);
  });

  test('returns true for an empty buffer', () => {
    const buffer = Buffer.alloc(0);
    expect(isEmpty(buffer)).toBe(true);
  });

  test('returns false for a non-empty buffer', () => {
    const buffer = Buffer.from([1, 2, 3]);
    expect(isEmpty(buffer)).toBe(false);
  });

  test('returns true for an empty set', () => {
    const set = new Set();
    expect(isEmpty(set)).toBe(true);
  });

  test('returns false for a non-empty set', () => {
    const set = new Set([1, 2, 3]);
    expect(isEmpty(set)).toBe(false);
  });

  test('returns true for an empty map', () => {
    const map = new Map();
    expect(isEmpty(map)).toBe(true);
  });

  test('returns false for a non-empty map', () => {
    const map = new Map([['key', 'value']]);
    expect(isEmpty(map)).toBe(false);
  });
});

describe('When given an object', () => {
  test('returns true for an empty plain object', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('returns false for a non-empty plain object', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('returns false for an object containing only a function', () => {
    const obj = { toString: () => 'test' };
    expect(isEmpty(obj)).toBe(false);
  });

  test('should return true for an empty prototype object', () => {
    class Foo {}
    expect(isEmpty(Foo.prototype)).toBe(true);
  });

  test('should return false for a non-empty prototype object', () => {
    class Foo {}
    Foo.prototype.a = 1;
    const fooInstance = new Foo();
    fooInstance.b = 2;
    expect(isEmpty(fooInstance)).toBe(false);
  });

  test('returns true for an object with only inherited properties', () => {
      const obj = Object.create({ inheritedProperty: 1 });
      expect(isEmpty(obj)).toBe(true);
  });

  test('returns false for an object with own and inherited properties', () => {
    const obj = Object.create({ inheritedProperty: 1 });
    obj.ownProperty = 2;
    expect(isEmpty(obj)).toBe(false);
  });
});