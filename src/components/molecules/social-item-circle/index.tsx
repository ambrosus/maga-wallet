import { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';

export const SocialItemCircle = ({ children }: PropsWithChildren) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.75 : 1 }
      ]}
    >
      {children}
    </Pressable>
  );
};
