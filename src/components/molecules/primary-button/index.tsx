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

export const PrimaryButton = ({
  title,
  children,
  disabled,
  onPress
}: CustomButtonProps) => {
  const content =
    children || <Typography color={COLORS.white}>{title}</Typography> || '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        backgroundColor: disabled ? COLORS.primary300 : COLORS.primary500
      }}
    >
      {content}
    </TouchableOpacity>
  );
};
