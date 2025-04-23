import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIconContainer, Typography } from '@components';
import { SocialAuthList } from '@components/organisms';
import {
  COLORS,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FLEX_FULL_SIZE,
  FONT_SIZE
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
            fontSize={FONT_SIZE.heading.xl}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
            letterSpacing={-1}
          >
            Maga Wallet
          </Typography>
          <Typography fontFamily="Onest500Medium" color={COLORS.textSecondary}>
            Crypto made simple.
          </Typography>
        </View>
        <View style={styles.footer}>
          <View style={styles.divider}>
            <View style={styles.line} />
            <Typography
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
              style={styles.dividerLabel}
            >
              Continue with
            </Typography>
          </View>

          <SocialAuthList />
        </View>
      </SafeAreaView>
    </View>
  );
};
