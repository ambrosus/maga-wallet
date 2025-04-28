import React from 'react';
import { render } from '@testing-library/react-native';

// Mock React for hooks consistently at the top level
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: (fn: () => any) => fn(),
  useCallback: (fn: (...args: any[]) => any) => fn
}));

// Mock the device constants module
const deviceMock = { isAndroid: false, isIos: true };
jest.mock('@constants/ui/device', () => deviceMock);

// Initial mock for auth methods
const mockAuthMethods = (overrides = {}) => ({
  AUTH_METHODS: [
    { key: 'google', component: () => null, visible: true },
    { key: 'facebook', component: () => null, visible: true },
    { key: 'apple', component: () => null, visible: true },
    { key: 'x', component: () => null, visible: true },
    ...Object.values(overrides)
  ]
});

jest.mock('@constants/auth/methods', () => mockAuthMethods());

// Mock the native stack navigator
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ children }: any) => <>{children}</>
  })
}));

// Mock the navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn()
  }),
  createNavigatorFactory: jest.fn((x) => x)
}));

// Mock the auth hook
jest.mock('@core/auth/lib', () => ({
  useAuth: () => ({
    authCallback: jest.fn().mockResolvedValue(true)
  })
}));

// Mock only SocialItemCircle component with a component that renders a testID
jest.mock('@components/molecules/social-item-circle', () => {
  const React = jest.requireActual('react');
  return {
    SocialItemCircle: jest
      .fn()
      .mockImplementation(
        ({
          children,
          onPress
        }: {
          children: React.ReactNode;
          onPress: () => void;
        }) =>
          React.createElement(
            'View',
            { testID: 'social-item-circle', onPress },
            children
          )
      )
  };
});

describe('SocialAuthList | Unit Test (Component)', () => {
  const originalConsoleWarn = console.warn;
  let consoleWarnMock: jest.Mock;
  // Import component once outside of isolateModules for better performance
  let SocialAuthList: any;

  beforeAll(() => {
    // Pre-load the component to avoid requiring it in each test
    jest.isolateModules(() => {
      SocialAuthList = require('../index').SocialAuthList;
    });
  });

  beforeEach(() => {
    consoleWarnMock = jest.fn();
    console.warn = consoleWarnMock;
    jest.resetModules();
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
    jest.resetAllMocks();
    // Reset device mock to default
    deviceMock.isAndroid = false;
    deviceMock.isIos = true;
  });

  // Helper function to reload SocialAuthList with updated mocks
  const reloadSocialAuthList = () => {
    jest.isolateModules(() => {
      SocialAuthList = require('../index').SocialAuthList;
    });
  };

  // Helper to set platform
  const setPlatform = (platform: 'ios' | 'android') => {
    deviceMock.isAndroid = platform === 'android';
    deviceMock.isIos = platform === 'ios';
  };

  it('should display all auth methods on iOS', () => {
    // Set platform to iOS
    setPlatform('ios');

    // Mock auth methods for iOS (all visible)
    jest.doMock('@constants/auth/methods', () => mockAuthMethods());

    // Reload component with updated mocks
    reloadSocialAuthList();

    const { getAllByTestId } = render(<SocialAuthList />);

    // Should render 4 auth methods on iOS
    const socialItems = getAllByTestId('social-item-circle');
    expect(socialItems.length).toBe(4);
    expect(consoleWarnMock).not.toHaveBeenCalled();
  });

  it('should not display Apple auth method on Android', () => {
    // Set platform to Android
    setPlatform('android');

    // Mock auth methods for Android (Apple not visible)
    jest.doMock('@constants/auth/methods', () => ({
      AUTH_METHODS: [
        { key: 'google', component: () => null, visible: true },
        { key: 'facebook', component: () => null, visible: true },
        { key: 'apple', component: () => null, visible: false },
        { key: 'x', component: () => null, visible: true }
      ]
    }));

    // Reload component with updated mocks
    reloadSocialAuthList();

    const { getAllByTestId } = render(<SocialAuthList />);

    // Should render 3 auth methods on Android (no Apple)
    const socialItems = getAllByTestId('social-item-circle');
    expect(socialItems.length).toBe(3);
  });

  it('should warn when Apple auth method is visible on Android', () => {
    // Set platform to Android
    setPlatform('android');

    // Mock auth methods for Android (Apple incorrectly visible)
    jest.doMock('@constants/auth/methods', () => mockAuthMethods());

    // Reload component with updated mocks
    reloadSocialAuthList();

    render(<SocialAuthList />);

    // Should warn about Apple auth not supported on Android
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Apple login is not supported on Android'
    );
  });
});
