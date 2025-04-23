import { View } from 'react-native';
import { AppIcon as AppIconSvg } from '@components/svgs';
import { COLORS } from '@constants';
import { styles } from './styles';

interface AppIconContainerProps {
  size?: number;
  testID?: string;
  style?: object;
  backgroundColor?: string;
  iconColor?: string;
}

export const AppIconContainer = ({
  size = 56,
  style,
  backgroundColor = COLORS.primary500,
  iconColor = COLORS.white,
  testID
}: AppIconContainerProps) => {
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        { width: size, height: size, backgroundColor, borderRadius: size / 4 },
        style
      ]}
    >
      <AppIconSvg scale={size / 100} color={iconColor} />
    </View>
  );
};
