/* eslint-disable camelcase */
import { View, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { COLORS } from '@constants';
import { PrimaryButton } from '../index';
import { styles } from '../styles.ts';

describe('PrimaryButton | Unit Test (Component)', () => {
  it('renders correctly with title prop', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    expect(buttonText).toBeDefined();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    fireEvent.press(buttonText);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles when disabled', () => {
    const mockOnPress = jest.fn();
    const { UNSAFE_root } = render(
      <PrimaryButton title="Disabled Button" disabled onPress={mockOnPress} />
    );

    const touchable = UNSAFE_root.findByType(TouchableOpacity);

    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        ...styles.buttonContainer,
        backgroundColor: COLORS.primary300
      })
    );
  });

  it('applies correct styles when enabled', () => {
    const mockOnPress = jest.fn();
    const { UNSAFE_root } = render(
      <PrimaryButton title="Enabled Button" onPress={mockOnPress} />
    );

    const touchable = UNSAFE_root.findByType(TouchableOpacity);

    expect(touchable.props.style).toEqual(
      expect.objectContaining({
        ...styles.buttonContainer,
        backgroundColor: COLORS.primary500
      })
    );
  });

  it('renders children instead of title when provided', () => {
    const mockOnPress = jest.fn();
    const TestComponent = () => <View testID="custom-component" />;

    const { queryByText, getByTestId } = render(
      <PrimaryButton onPress={mockOnPress}>
        <TestComponent />
      </PrimaryButton>
    );

    expect(queryByText('Press Me')).toBeNull();
    expect(getByTestId('custom-component')).toBeDefined();
  });

  it('renders with white text color', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="White Text" onPress={mockOnPress} />
    );

    const buttonText = getByText('White Text');
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: COLORS.white })])
    );
  });
});
