/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { verticalScale } from '@utils';
import { SafeViewContainer } from '../index';

// Mock the useSafeAreaInsets hook
jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: jest.fn().mockReturnValue({ bottom: 0 })
}));

describe('SafeViewContainer | Unit Test (Component)', () => {
  it('renders correctly with default props', () => {
    const { UNSAFE_root } = render(
      <SafeViewContainer>
        <View testID="test-child" />
      </SafeViewContainer>
    );

    const safeAreaView = UNSAFE_root.children[0] as ReactTestInstance;
    expect(safeAreaView).toBeDefined();
    expect(safeAreaView.props.style).toEqual([
      {
        flex: 1,
        paddingBottom: verticalScale(24)
      }
    ]);
  });

  it('applies custom style with default bottom padding', () => {
    const customStyle = { backgroundColor: 'red' };
    const { UNSAFE_root } = render(
      <SafeViewContainer style={customStyle}>
        <View testID="test-child" />
      </SafeViewContainer>
    );

    const safeAreaView = UNSAFE_root.children[0] as ReactTestInstance;
    expect(safeAreaView.props.style).toEqual([
      [customStyle, { paddingBottom: verticalScale(24) }]
    ]);
  });

  it('applies different padding when bottom inset is available', () => {
    // Mock bottom inset value to be non-zero
    jest
      .spyOn(require('react-native-safe-area-context'), 'useSafeAreaInsets')
      .mockReturnValueOnce({ bottom: 20 });

    const { UNSAFE_root } = render(
      <SafeViewContainer>
        <View testID="test-child" />
      </SafeViewContainer>
    );

    const safeAreaView = UNSAFE_root.children[0] as ReactTestInstance;
    expect(safeAreaView.props.style).toEqual([
      {
        flex: 1,
        paddingBottom: 0
      }
    ]);
  });

  it('passes additional props to SafeAreaView', () => {
    const { UNSAFE_root } = render(
      <SafeViewContainer testID="test-container">
        <View />
      </SafeViewContainer>
    );

    const safeAreaView = UNSAFE_root.children[0] as ReactTestInstance;
    expect(safeAreaView.props.testID).toBe('test-container');
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <SafeViewContainer>
        <View testID="test-child" />
      </SafeViewContainer>
    );

    expect(getByTestId('test-child')).toBeDefined();
  });
});
