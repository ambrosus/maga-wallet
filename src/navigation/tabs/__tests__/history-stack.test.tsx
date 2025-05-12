import { render } from '@testing-library/react-native';
import { HistoryStack } from '../history/history-stack';

// Mock the screens
jest.mock('@screens', () => ({
  HistoryScreen: () => null
}));

describe('HistoryStack', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<HistoryStack />);
    // Add appropriate test assertions based on your implementation
    expect(getByTestId('history-stack')).toBeTruthy();
  });

  it('renders HistoryScreen as initial route', () => {
    const { getByTestId } = render(<HistoryStack />);
    expect(getByTestId('history-screen')).toBeTruthy();
  });
});
