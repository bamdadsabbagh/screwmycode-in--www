const transformModules = ['speed-to-semitones', 'speed-to-percentage'].join(
  '|',
);

module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRegex: '\\.(test|spec)\\.[jt]sx?$',
  moduleNameMapper: {
    'next/head': '<rootDir>/__mocks__/next-head.js',
    'next/router': '<rootDir>/__mocks__/next-router.js',
    '^.+.(glsl)$': '<rootDir>/__mocks__/glsl.js',
    'src/(.*)': '<rootDir>/src/$1',
    '@fontsource/noto-sans': '<rootDir>/__mocks__/fontsource-noto-sans.js',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!${transformModules}/)`],
  modulePathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/src/.*/__mocks__'],
  // collectCoverage: true,
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
};
