import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../index';

describe('Button | Unit Test (Component)', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Button>
        <Text>Button Content</Text>
      </Button>
    );

    expect(getByText('Button Content')).toBeDefined();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress}>
        <Text>Click Me</Text>
      </Button>
    );

    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onLongPress function when long pressed', () => {
    const mockOnLongPress = jest.fn();
    const { getByText } = render(
      <Button onLongPress={mockOnLongPress}>
        <Text>Long Press Me</Text>
      </Button>
    );

    fireEvent(getByText('Long Press Me'), 'onLongPress');
    expect(mockOnLongPress).toHaveBeenCalledTimes(1);
  });

  it('disables button functionality when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={mockOnPress}>
        <Text>Disabled Button</Text>
      </Button>
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red', borderRadius: 10 };
    const { getByTestId } = render(
      <Button style={customStyle} testID="styled-button">
        <Text>Styled Button</Text>
      </Button>
    );

    const button = getByTestId('styled-button');
    expect(button.props.style).toMatchObject(customStyle);
  });

  it('passes testID prop to TouchableOpacity', () => {
    const { getByTestId } = render(
      <Button testID="test-button">
        <Text>Button with TestID</Text>
      </Button>
    );

    expect(getByTestId('test-button')).toBeDefined();
  });

  it('accepts activeOpacity prop', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button activeOpacity={0.8} onPress={mockOnPress}>
        <Text>With Active Opacity</Text>
      </Button>
    );

    expect(getByText('With Active Opacity')).toBeDefined();
    fireEvent.press(getByText('With Active Opacity'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('triggers onLayout callback when layout changes', () => {
    const mockOnLayout = jest.fn();
    const { getByTestId } = render(
      <Button onLayout={mockOnLayout} testID="layout-button">
        <Text>Layout Test</Text>
      </Button>
    );

    const button = getByTestId('layout-button');
    const mockEvent = { nativeEvent: { layout: { width: 100, height: 50 } } };
    fireEvent(button, 'onLayout', mockEvent);
    expect(mockOnLayout).toHaveBeenCalledWith(mockEvent);
  });

  it('passes additional props to button', () => {
    const hitSlopValue = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    };

    const { getByTestId } = render(
      <Button hitSlop={hitSlopValue} testID="additional-props-button">
        <Text>With Additional Props</Text>
      </Button>
    );

    expect(getByTestId('additional-props-button')).toBeDefined();
  });
});
