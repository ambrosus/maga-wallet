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

jest.mock('@web3auth/base', () => ({
  CHAIN_NAMESPACES: {
    EIP155: 'eip155',
    SOLANA: 'solana',
    OTHER: 'other'
  },
  WEB3AUTH_NETWORK_TYPE: {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    CYAN: 'cyan'
  }
}));

jest.mock('@web3auth/ethereum-provider', () => ({
  EthereumPrivateKeyProvider: jest.fn().mockImplementation(() => ({
    init: jest.fn(() => Promise.resolve()),
    getProvider: jest.fn(() => Promise.resolve({}))
  }))
}));

jest.mock('@web3auth/single-factor-auth', () => {
  const mockLoginResponse = {
    privKey: '0x1234567890abcdef',
    userInfo: {
      email: 'test@example.com',
      name: 'Test User'
    }
  };

  return {
    SDK_MODE: {
      WALLET: 'wallet',
      VERIFIER: 'verifier'
    },
    Web3Auth: jest.fn().mockImplementation(() => ({
      init: jest.fn(() => Promise.resolve()),
      connect: jest.fn(() => Promise.resolve(mockLoginResponse)),
      signIn: jest.fn(() => Promise.resolve(mockLoginResponse)),
      signOut: jest.fn(() => Promise.resolve()),
      getUserInfo: jest.fn(() => Promise.resolve(mockLoginResponse.userInfo))
    }))
  };
});

jest.mock('react-native-inappbrowser-reborn', () => ({
  InAppBrowser: {
    openAuth: jest.fn(() =>
      Promise.resolve({
        type: 'success',
        url: 'app-scheme://?oauth_token=mock-token&oauth_verifier=mock-verifier'
      })
    )
  }
}));

jest.mock('@react-native-google-signin/google-signin', () => {
  return {
    GoogleSignin: {
      signIn: jest.fn(() => Promise.resolve({ idToken: '123' })),
      configure: jest.fn(),
      hasPlayServices: jest.fn(() => Promise.resolve(true)),
      getTokens: jest.fn(() => Promise.resolve({ idToken: '123' })),
      signOut: jest.fn(() => Promise.resolve())
    }
  };
});
