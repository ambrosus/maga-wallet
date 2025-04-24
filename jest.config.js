module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-native-.*|@react-native|react-native|@react-navigation)/)'
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
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)']
};
