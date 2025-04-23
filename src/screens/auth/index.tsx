import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIconContainer, Typography } from '@components';
import {
  COLORS,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FLEX_FULL_SIZE
} from '@constants';
import { styles } from './styles';

export const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={FLEX_FULL_SIZE}>
        <Image
          style={styles.background}
          width={DEVICE_WIDTH}
          height={DEVICE_HEIGHT}
          source={require('@assets/images/auth-initial-background.png')}
        />

        <View style={styles.header}>
          <AppIconContainer />

          <Typography
            fontSize={24}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
          >
            Maga Wallet
          </Typography>
          <Typography
            fontSize={16}
            fontFamily="Onest500Medium"
            color={COLORS.textSecondary}
          >
            Crypto made simple.
          </Typography>
        </View>
      </SafeAreaView>
    </View>
  );
};
