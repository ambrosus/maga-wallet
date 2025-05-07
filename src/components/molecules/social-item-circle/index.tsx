import { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';

interface SocialItemCircleProps extends PropsWithChildren {
  onPress: () => void;
  disabled?: boolean;
}

export const SocialItemCircle = ({
  onPress,
  disabled = false,
  children
}: SocialItemCircleProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed || disabled ? 0.75 : 1 }
      ]}
    >
      {children}
    </Pressable>
  );
};
