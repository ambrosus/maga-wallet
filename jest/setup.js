import 'react-native-gesture-handler/jestSetup';

require('react-native-reanimated').setUpTests();
// Include this section for mocking react-native-screens

// Global mock for @navigation
jest.mock(
  '@navigation',
  () => ({
    SETTINGS_STACK_ROUTES: {
      SettingsScreen: 'SettingsScreen',
      ManageAccountsScreen: 'ManageAccountsScreen',
      SecurityScreen: 'SecurityScreen',
      AddressBookScreen: 'AddressBookScreen',
      PreferencesScreen: 'PreferencesScreen',
      NotificationsScreen: 'NotificationsScreen',
      AboutScreen: 'AboutScreen'
    },
    DISCOVER_STACK_ROUTES: {
      DiscoverScreen: 'DiscoverScreen'
    }
  }),
  { virtual: true }
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signInWithCredential: jest.fn(() =>
      Promise.resolve({
        user: { getIdToken: () => Promise.resolve('mock-token') }
      })
    ),
    signOut: jest.fn()
  }),
  GoogleAuthProvider: {
    credential: jest.fn()
  },
  TwitterAuthProvider: {
    credential: jest.fn()
  }
}));
