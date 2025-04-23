/* eslint-disable camelcase */
import { View, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { COLORS } from '@constants';
import { Button } from '../index';
import { styles } from '../styles.tsx';

describe('Button | Unit Test (Component)', () => {
  it('renders correctly with title prop', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    expect(buttonText).toBeDefined();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={mockOnPress} />
    );

    const buttonText = getByText('Press Me');
    fireEvent.press(buttonText);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Disabled Button" disabled onPress={mockOnPress} />
    );

    const buttonText = getByText('Disabled Button');
    const textStyles = buttonText.props.style;

    expect(textStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: COLORS.neutral200 })
      ])
    );
  });

  it('applies custom text styles', () => {
    const mockOnPress = jest.fn();
    const textStyle = { fontSize: 18 };

    const { getByText } = render(
      <Button
        title="Custom Style Button"
        textStyle={textStyle}
        onPress={mockOnPress}
      />
    );

    const buttonText = getByText('Custom Style Button');
    const textStyles = buttonText.props.style;

    expect(textStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 18
        })
      ])
    );
  });

  it('applies custom container styles', () => {
    const mockOnPress = jest.fn();
    const containerStyle = { backgroundColor: COLORS.primary500 };

    const { UNSAFE_root } = render(
      <Button
        title="Custom Container"
        containerStyle={containerStyle}
        onPress={mockOnPress}
      />
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
    const TestComponent = () => <View testID="custom-component"></View>;

    const { queryByText, getByTestId } = render(
      <Button onPress={mockOnPress}>
        <TestComponent />
      </Button>
    );

    expect(queryByText('Press Me')).toBeNull();
    expect(getByTestId('custom-component')).toBeDefined();
  });

  it('passes additional TouchableOpacity props', () => {
    const mockOnPress = jest.fn();
    const { UNSAFE_root } = render(
      <Button
        title="With Props"
        onPress={mockOnPress}
        activeOpacity={0.8}
        testID="test-button"
      />
    );

    const touchable = UNSAFE_root.findByType(TouchableOpacity);

    expect(touchable.props.activeOpacity).toBe(0.8);
    expect(touchable.props.testID).toBe('test-button');
  });
});
