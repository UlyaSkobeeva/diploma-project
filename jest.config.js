/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.js',
    '!src/main.jsx',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.css$': 'identity-obj-proxy',
  },
}

export default config
