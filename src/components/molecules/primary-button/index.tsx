import { ReactElement } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '@constants';
import { styles } from './styles.ts';
import { Typography } from '../../atoms';

export interface PrimaryButtonProps {
  title?: string;
  children?: ReactElement;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton = ({
  title,
  children,
  disabled,
  onPress,
  style
}: PrimaryButtonProps) => {
  const content =
    children || <Typography color={COLORS.white}>{title}</Typography> || '';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        {
          ...styles.buttonContainer,
          backgroundColor: disabled ? COLORS.primary300 : COLORS.primary500
        }
      ]}
    >
      {content}
    </TouchableOpacity>
  );
};
