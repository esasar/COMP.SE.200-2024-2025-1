/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 * 
 * Some javascript acrobatics to make jest work with esm modules
 * https://jestjs.io/docs/ecmascript-modules
 */

/** @type {import('jest').Config} */
const config = {
  transform: {},
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },

  // ingore source files in .internal and node_modules
  testPathIgnorePatterns: ['/node_modules/', '/.internal/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/.internal/'],
};

export default config;
