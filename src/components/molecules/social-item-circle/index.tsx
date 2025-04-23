import { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';

interface SocialItemCircleProps extends PropsWithChildren {
  onPress: () => void;
}

export const SocialItemCircle = ({
  onPress,
  children
}: SocialItemCircleProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.75 : 1 }
      ]}
    >
      {children}
    </Pressable>
  );
};
