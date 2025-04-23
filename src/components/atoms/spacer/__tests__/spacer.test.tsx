/* eslint-disable camelcase */
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Spacer } from '../index';

describe('Spacer | Unit Test (Component)', () => {
  it('renders correctly with default props', () => {
    const { UNSAFE_root } = render(<Spacer />);
    const view = UNSAFE_root.findByType(View);

    expect(view).toBeDefined();
  });

  it('applies vertical spacing with correct height', () => {
    const testValue = 16;
    const { UNSAFE_root } = render(<Spacer value={testValue} />);
    const view = UNSAFE_root.findByType(View);

    expect(view.props.style).toEqual(
      expect.objectContaining({
        height: testValue,
        width: undefined
      })
    );
  });

  it('applies horizontal spacing with correct width', () => {
    const testValue = 24;
    const { UNSAFE_root } = render(<Spacer value={testValue} horizontal />);
    const view = UNSAFE_root.findByType(View);

    expect(view.props.style).toEqual(
      expect.objectContaining({
        height: undefined,
        width: testValue
      })
    );
  });

  it('applies flex properties correctly', () => {
    const { UNSAFE_root } = render(
      <Spacer flexBasis="50%" flexShrink={1} flexGrow={1} />
    );
    const view = UNSAFE_root.findByType(View);

    expect(view.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '50%',
        flexShrink: 1,
        flexGrow: 1
      })
    );
  });

  it('passes pointerEvents correctly', () => {
    const { UNSAFE_root } = render(<Spacer pointerEvents="none" />);
    const view = UNSAFE_root.findByType(View);

    expect(view.props.pointerEvents).toBe('none');
  });

  it('handles onLayout event', () => {
    const handleLayout = jest.fn();
    const { UNSAFE_root } = render(<Spacer onLayout={handleLayout} />);
    const view = UNSAFE_root.findByType(View);

    expect(view.props.onLayout).toBe(handleLayout);
  });
});
