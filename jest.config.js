module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-native-.*)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hooks(.*)$': '<rootDir>/src/lib/hooks$1',
    '^@core(.*)$': '<rootDir>/src/core$1',
    '^@screens(.*)$': '<rootDir>/src/screens$1',
    '^@navigation(.*)$': '<rootDir>/src/navigation$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1'
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)']
};
