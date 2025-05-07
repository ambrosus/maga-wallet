import { ReactElement } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native';
import { COLORS } from '@constants';
import { styles } from './styles.tsx';
import { Typography } from '../../atoms';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: ReactElement;
  isPrimary?: boolean;
  disabled?: boolean;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabledTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  disabledContainerStyle?: ViewStyle;
  onPress: () => void;
}

export const Button = ({
  title,
  children,
  disabled,
  disabledContainerStyle,
  disabledTextStyle,
  textStyle,
  containerStyle,
  onPress,
  ...props
}: ButtonProps) => {
  const _textStyle = disabled
    ? { color: COLORS.neutral200, ...disabledTextStyle }
    : { color: COLORS.neutral400, ...textStyle };

  const _containerStyle = disabled
    ? { ...styles.buttonContainer, ...disabledContainerStyle }
    : { ...styles.buttonContainer, ...containerStyle };

  const content =
    children || <Typography style={_textStyle}>{title}</Typography> || '';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={_containerStyle}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
};
