import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { AppIcon as AppIconSvg } from '@components/svgs';
import { COLORS } from '@constants';
import { styles } from './styles';

interface IconContainerProps extends PropsWithChildren {
  size?: number;
  testID?: string;
  style?: object;
  backgroundColor?: string;
  iconColor?: string;
}

export const IconContainer = ({
  size = 56,
  style,
  backgroundColor = COLORS.primary500,
  iconColor = COLORS.white,
  testID,
  children
}: IconContainerProps) => {
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        { width: size, height: size, backgroundColor, borderRadius: size / 4 },
        style
      ]}
    >
      {children ? (
        children
      ) : (
        <AppIconSvg scale={size / 100} color={iconColor} />
      )}
    </View>
  );
};
