import { ReactElement, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@constants';
import { styles } from './styles.tsx';
import { Typography } from '../../atoms';

interface CustomButtonProps {
  title?: string;
  children?: ReactElement;
  isPrimary?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export const CustomButton = ({
  title,
  children,
  isPrimary,
  disabled,
  onPress
}: CustomButtonProps) => {
  const _style = useMemo(() => {
    if (disabled) {
      return {
        backgroundColor: COLORS.primary300,
        textColor: COLORS.primary100,
        styles: styles.disabled
      };
    }
    switch (true) {
      case isPrimary:
        return {
          backgroundColor: COLORS.primary500,
          textColor: COLORS.white
        };
      default:
        return {
          backgroundColor: COLORS.white,
          textColor: COLORS.primary500,
          styles: styles.secondaryContainer
        };
    }
  }, [disabled, isPrimary]);

  const content =
    children || <Typography color={_style.textColor}>{title}</Typography> || '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        ..._style?.styles,
        backgroundColor: _style.backgroundColor
      }}
    >
      {content}
    </TouchableOpacity>
  );
};
