import add from '../src/add';

describe('add', () => {
    /*
    * What is the equivalence partition in the case of numbers?
    * In theory, we should expect Numbers and Non-Numbers to behave
    * the same way, but because of javascript and type inference
    * this is not the case.
    */
    describe('when given valid (Number) inputs', () => {
        test('should sum two integers', () => {
            expect(add(4, 2)).toBe(6);
        });

        test('should sum two floats', () => {
            expect(add(4.2, 2.4)).toBe(6.6);
        });
    });

    /*
    * Should the case when both inputs are non-Numbers be separately tested?
    * the test amount would explode if we want all combinations of Javascript
    * primitives and objects 
    */
    describe('when given invalid (non-Number) inputs', () => {
        test('should return NaN when one argument is a number string', () => {
            expect(add('1', 1)).toBeNaN();
        });
        
        test('should return NaN when one argument is a non-number string', () => {
            expect(add('foo', 1)).toBeNaN();
        });

        test('should return NaN when one argument is null', () => {
            expect(add(null, 1)).toBeNaN();
        });

        test('should return NaN when one argument is undefined', () => {
            expect(add(undefined, 1)).toBeNaN();
        });

        test('should return NaN when one argument is NaN', () => {
            expect(add(NaN, 1)).toBeNaN();
        });

        test('should return NaN when one argument is an empty object', () => {
            expect(add({}, 1)).toBeNaN();
        });

        test('should return NaN when one argument is a non-empty object', () => {
            expect(add({ 1: 1}, 1)).toBeNaN();
        });

        test('should return NaN when one argument is an empty array', () => {
            expect(add([], 1)).toBeNaN();
        });

        test('should return NaN when one argument is an integer array', () => {
            expect(add([1, 2, 3, 4], 1)).toBeNaN();
        });

        test('should return NaN when one argument is a string array of number strings', () => {
            expect(add(['1', '2'], 1)).toBeNaN();
        });

        test('should return NaN when one argument is an non-integer array', () => {
            expect(add(['foo', 'bar'], 1)).toBeNaN();
        });

        test('should return NaN when one argument is a boolean', () => {
            expect(add(true, 1)).toBeNaN();
        });

        test('should return NaN when one argument is a function', () => {
            expect(add(() => { return 'foo' }, 1)).toBeNaN();
        });
    });

    describe('when testing boundary values', () => {
        test('should sum very large positive integers', () => {
            expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
        });

        test('should sum very large negative integers', () => {
            expect(add(Number.MIN_SAFE_INTEGER, -1)).toBe(Number.MIN_SAFE_INTEGER - 1);
        });

        test('should sum very small positive floats', () => {
            expect(add(1e-10, 1e-10)).toBeCloseTo(2e-10);
        });

        test('should sum very small negative floats', () => {
            expect(add(-1e-10, -1e-10)).toBeCloseTo(-2e-10);
        });
    });
});