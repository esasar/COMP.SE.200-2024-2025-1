import memoize from '../src/memoize.js';

describe("When given a function without a resolver", () => {
    test('should return a memoized function', () => {
        const mockFunc = (x) => x * 2;
        const memoized = memoize(mockFunc);
        expect(typeof memoized).toBe('function');
    });
    
    test('should cache results', () => {
        let callCount = 0;
        const mockFunc = (x) => { callCount++; return x + 1; };
        const memoized = memoize(mockFunc);

        expect(memoized(1)).toBe(2);
        expect(callCount).toBe(1);
        expect(memoized(1)).toBe(2); // Cached result
        expect(callCount).toBe(1); // callCount should not increase
        expect(memoized(2)).toBe(3);
        expect(callCount).toBe(2);
    });

    test('should cache results based on the first argument by default', () => {
        const mockFunc = (x, y) =>  x + y;
        const memoized = memoize(mockFunc);
        memoized(1, 2);
        expect(memoized.cache.get(1)).toBe(3);
    });

    test('should work properly even if giving memoized function extra parameters' , () => {
        const mockFunc = (x, y) =>  x + y;
        const memoized = memoize(mockFunc);
        expect(memoized(1, 2, 3)).toBe(3);
    });
});

// If the resolver is empty or null etc., the function will cache the results using the same key for all calls.
// This might be unwanted behavior, but it is not specified in the documentation.
// It's not tested because it's not clear what the expected behavior is.
describe("When given a function and a resolver", () => {
    test('should return a memoized function', () => {
        const mockFunc = (x, y) => x + y;
        const resolver = (x, y) => `${x}-${y}`;
        const memoized = memoize(mockFunc, resolver);
        expect(typeof memoized).toBe('function');
    });

    test('should cache results based on the resolver', () => {
        let callCount = 0;
        const mockFunc = (x, y) => { callCount++; return x + y; };
        const resolver = (x, y) => `${x}-${y}`;
        const memoized = memoize(mockFunc, resolver);

        expect(memoized(1, 2)).toBe(3);
        expect(callCount).toBe(1);
        expect(memoized(1, 2)).toBe(3); // Cached result
        expect(callCount).toBe(1); // callCount should not increase
        expect(memoized.cache.get('1-2')).toBe(3); // Cache key is based on resolver
    });

    test('should cache based on first parameter if resolver is null', () => {
        const mockFunc = (x) => x + 1;
        const memoized = memoize(mockFunc, null);
        expect(memoized(5)).toBe(6);
        expect(memoized.cache.get(5)).toBe(6);
    });

    test('should cache based on first parameter if resolver is undefined', () => {
        const mockFunc = (x) => x + 1;
        const memoized = memoize(mockFunc, undefined);
        expect(memoized(5)).toBe(6);
        expect(memoized.cache.get(5)).toBe(6);
    });
});

describe('When given invalid parameters for func or resolver', () => {
    test('should throw TypeError if first parameter "func" is not a function', () => {
        expect(() => memoize(null)).toThrow(TypeError);
        expect(() => memoize(123)).toThrow(TypeError);
        expect(() => memoize('test')).toThrow(TypeError);
        expect(() => memoize({})).toThrow(TypeError);
        expect(() => memoize(undefined)).toThrow(TypeError);
        expect(() => memoize()).toThrow(TypeError);
        expect(() => memoize([])).toThrow(TypeError);
    });

    test('should throw TypeError if the second parameter "resolver" is not a null AND not a function', () => {
        const mockFunc = (x) => x * 2;
        expect(() => memoize(mockFunc, 123)).toThrow(TypeError);
        expect(() => memoize(mockFunc, 'test')).toThrow(TypeError);
        expect(() => memoize(mockFunc, {})).toThrow(TypeError);
        expect(() => memoize(mockFunc, [])).toThrow(TypeError);
    });
});

describe('When using non-default cache constructors', () => {
    test('should work properly with WeakMap when using objects as keys', () => {
        let callCount = 0;
        const mockFunc = (x) => {callCount ++; return x;};
        memoize.Cache = WeakMap;
        const memoized = memoize(mockFunc);
        const obj1 = {value: 1};
        const obj2 = {value: 2};
        expect(memoized.cache instanceof WeakMap).toBe(true);
        expect(memoized(obj1)).toBe(obj1);
        expect(callCount).toBe(1);
        expect(memoized(obj1)).toBe(obj1);
        expect(callCount).toBe(1);
        expect(memoized(obj2)).toBe(obj2);	
        expect(callCount).toBe(2);
        memoize.Cache = Map; // Restore default
    })

    // WeakMap does not support primitive keys. What is the expected behavior when using them?
    // Here we just test, that it throws a TypeError, but the behavior should be defined to make better tests.
    test('should throw TypeError with WeakMap when using not using objects as keys', () => {
        let callCount = 0;
        const mockFunc = (x) => {callCount ++; return x;};
        memoize.Cache = WeakMap;
        const memoized = memoize(mockFunc);
        expect(() => memoized(1)).toThrow(TypeError);
        memoize.Cache = Map; // Restore default
    });

    test("Should work properly with custom cache constructor", () => {
        class CustomCache {
            constructor() {
              this.store = {};
            }         
            clear = () => { this.store = {}; }
            delete = (key) => { delete this.store[key]; }
            get = (key) => this.store[key];
            has = (key) => this.store.hasOwnProperty(key);
            set = (key, value) => { this.store[key] = value; }
          }

        let callCount = 0;
        mockFunc = (x) => { callCount ++; return x + 1; };
        memoize.Cache = CustomCache;
        const memoized = memoize(mockFunc);
        expect(memoized.cache instanceof CustomCache).toBe(true);
        expect(memoized(1)).toBe(2);
        expect(callCount).toBe(1);
        expect(memoized(1)).toBe(2);
        expect(callCount).toBe(1);
        expect(memoized(2)).toBe(3);
        expect(callCount).toBe(2);
        memoize.Cache = Map; // Restore default
    });

    test('Should default to using Map as cache constructor if given an invalid cache constructor', () => {
        mockFunc = (x) => { callCount ++; return x + 1; };
        memoize.Cache = null; // invalid cache constructor
        const memoized = memoize(mockFunc);
        expect(memoized.cache instanceof Map).toBe(true);
        memoize.Cache = Map; // Restore default
    });
});
