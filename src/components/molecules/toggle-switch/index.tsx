import { JSX } from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { Switch as RNGHSwitch } from 'react-native-gesture-handler';
import { COLORS } from '@constants';

interface SwitchProps {
  disabled?: boolean;
  value: boolean;
  trackColor?: {
    false?: ColorValue | null | undefined;
    true?: ColorValue | null | undefined;
  };
  onValueChange?: (newValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const ToggleSwitch = (props: SwitchProps): JSX.Element => {
  const {
    disabled,
    value,
    onValueChange = () => null,
    trackColor,
    style
  } = props;
  const defaultTrackColor = {
    true: COLORS.primary500,
    false: undefined
  };
  return (
    <RNGHSwitch
      style={style}
      thumbColor={COLORS.white}
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
      trackColor={{
        ...defaultTrackColor,
        ...trackColor
      }}
    />
  );
};
