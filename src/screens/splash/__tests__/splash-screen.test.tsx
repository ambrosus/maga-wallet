import { render } from '@testing-library/react-native';
import { SplashScreen } from '../index';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    replace: jest.fn()
  })
}));

describe('Splash Screen Unit Test', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<SplashScreen />);
    const splashText = getByTestId('splash_icon');
    expect(splashText).toBeDefined();
  });
});
