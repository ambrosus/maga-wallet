import { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@constants';
import { styles } from './styles.ts';
import { Typography } from '../../atoms';

interface CustomButtonProps {
  title?: string;
  children?: ReactElement;
  disabled?: boolean;
  onPress: () => void;
}

export const SecondaryButton = ({
  title,
  children,
  onPress,
  disabled
}: CustomButtonProps) => {
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
      style={{
        ...styles.buttonContainer,
        borderColor: disabled ? COLORS.neutral500 : COLORS.neutral700,
        backgroundColor: COLORS.white
      }}
    >
      {content}
    </TouchableOpacity>
  );
};
