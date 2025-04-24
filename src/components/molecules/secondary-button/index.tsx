import { ReactElement } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '@constants';
import { styles } from './styles.ts';
import { Typography } from '../../atoms';

interface SecondaryButtonProps {
  title?: string;
  children?: ReactElement;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SecondaryButton = ({
  title,
  children,
  onPress,
  disabled,
  style
}: SecondaryButtonProps) => {
  const content =
    children || (
      <Typography color={disabled ? COLORS.neutral300 : COLORS.neutral700}>
        {title}
      </Typography>
    ) ||
    '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          ...styles.buttonContainer,
          borderColor: disabled ? COLORS.neutral500 : COLORS.borderDefault,
          backgroundColor: COLORS.white
        }
      ]}
    >
      {content}
    </TouchableOpacity>
  );
};
