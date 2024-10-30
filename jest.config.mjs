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
};

export default config;
