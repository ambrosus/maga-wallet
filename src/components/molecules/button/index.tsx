import { ReactNode } from 'react';
import {
  LayoutChangeEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  style?: ViewProps['style'];
  disabled?: boolean;
  children?: ReactNode;
  activeOpacity?: number;
  onPress?: () => unknown;
  testID?: string;
  onLongPress?: () => unknown;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const Button = ({
  disabled,
  children,
  style,
  testID,
  activeOpacity,
  onPress,
  onLongPress,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={style}
      testID={testID}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
