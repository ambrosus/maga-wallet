import { render } from '@testing-library/react-native';
import { SplashScreen } from '../index';

describe('Splash Screen Unit Test', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SplashScreen />);
    const splashText = getByText('Splash screen');
    expect(splashText).toBeTruthy();
  });
});
