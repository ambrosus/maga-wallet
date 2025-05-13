import { render } from '@testing-library/react-native';
import { SplashScreen } from '../index';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    replace: jest.fn()
  })
}));

// Mock the useSplashNavigation hook
jest.mock('../hooks/use-splash-navigation', () => ({
  useSplashNavigation: jest.fn()
}));

describe('Splash Screen Unit Test', () => {
  it('should render the splash screen', () => {
    const { getByTestId } = render(<SplashScreen />);
    expect(getByTestId('splash_icon')).toBeDefined();
  });
});
