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

  // ingore source files in .internal and node_modules
  testPathIgnorePatterns: ['/node_modules/', '/.internal/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/.internal/'],
};

export default config;
