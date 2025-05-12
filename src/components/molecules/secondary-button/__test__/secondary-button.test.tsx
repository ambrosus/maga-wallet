// src/components/molecules/secondary-button/__tests__/secondary-button.test.tsx
/* eslint-disable camelcase */
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { COLORS } from '@constants';
import { SecondaryButton } from '../index';
import { styles } from '../styles';

describe('SecondaryButton | Unit Test (Component)', () => {
  it('renders correctly with title prop', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <SecondaryButton title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    expect(buttonText).toBeDefined();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <SecondaryButton title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    fireEvent.press(buttonText);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles when disabled', () => {
    const mockOnPress = jest.fn();
    const { UNSAFE_root, getByText } = render(
      <SecondaryButton title="Disabled Button" disabled onPress={mockOnPress} />
    );

    const touchable = UNSAFE_root.findByType(TouchableOpacity);
    const buttonText = getByText('Disabled Button');

    // Check container styles
    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        ...styles.buttonContainer,
        borderColor: COLORS.neutral500,
        backgroundColor: COLORS.white
      })
    );

    // Check text color
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: COLORS.neutral300 })
      ])
    );
  });

  it('applies correct styles when enabled', () => {
    const mockOnPress = jest.fn();
    const { UNSAFE_root, getByText } = render(
      <SecondaryButton title="Enabled Button" onPress={mockOnPress} />
    );

    const touchable = UNSAFE_root.findByType(TouchableOpacity);
    const buttonText = getByText('Enabled Button');

    // Check container styles
    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        ...styles.buttonContainer,
        borderColor: COLORS.neutral700,
        backgroundColor: COLORS.white
      })
    );

    // Check text color
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: COLORS.neutral700 })
      ])
    );
  });

  it('renders children instead of title when provided', () => {
    const mockOnPress = jest.fn();
    const TestComponent = () => <div data-testid="custom-component"></div>;

    const { queryByText, getByTestId } = render(
      <SecondaryButton onPress={mockOnPress}>
        <TestComponent />
      </SecondaryButton>
    );

    expect(queryByText('Press Me')).toBeNull();
    expect(getByTestId('custom-component')).toBeDefined();
  });
});
