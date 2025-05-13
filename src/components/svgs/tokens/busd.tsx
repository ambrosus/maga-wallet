import { Image, View } from 'react-native';
import { SvgIconProps } from '@types';

export const BusdIcon = ({ scale = 1 }: Omit<SvgIconProps, 'color'>) => {
  const size = 32 * scale;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: '#f0b90b',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        source={require('@assets/tokens/busd-token.png')}
        style={{
          width: size * 0.6,
          height: size * 0.6,
          tintColor: 'white'
        }}
      />
    </View>
  );
};
