import { useCallback } from 'react';
import { Alert, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconContainer, Typography } from '@components';
import { Spacer } from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { SocialAuthList } from '@components/organisms';
import {
  COLORS,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FLEX_FULL_SIZE,
  FONT_SIZE
} from '@constants';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';

export const AuthScreen = ({
  navigation
}: RootNavigationScreenProps<'AuthScreen'>) => {
  const onNavigateToPasskey = useCallback(() => {
    navigation.navigate('Tabs');
  }, [navigation]);

  const onTermsUsageNavigate = useCallback(() => {
    Alert.alert('Terms of Service');
  }, []);

  const onPrivacyPolicyNavigate = useCallback(() => {
    Alert.alert('Privacy Policy');
  }, []);

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
          <IconContainer />

          <Spacer value={scale(16)} />
          <Typography
            fontSize={FONT_SIZE.heading.xl}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
            letterSpacing={-1}
          >
            Maga Wallet
          </Typography>
          <Spacer value={scale(8)} />
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
          <Spacer value={scale(32)} />
          {/* Social Auth List */}
          <SocialAuthList />
          <Spacer value={scale(32)} />
          <PrimaryButton onPress={onNavigateToPasskey}>
            <Typography
              fontSize={16}
              fontFamily="Onest600SemiBold"
              color={COLORS.white}
            >
              I have a Passkey
            </Typography>
          </PrimaryButton>

          {/* Terms And Privacy Footer Container */}
          <View style={styles.termsContainer}>
            <Typography
              align="center"
              fontSize={FONT_SIZE.body.sm}
              fontFamily="Onest500Medium"
            >
              By continuing, You agree to the
              <Typography
                color={COLORS.primary500}
                fontSize={FONT_SIZE.body.sm}
                fontFamily="Onest500Medium"
                onPress={onTermsUsageNavigate}
              >
                {' Terms of Service '}
              </Typography>
              and consent to the
              <Typography
                color={COLORS.primary500}
                fontSize={FONT_SIZE.body.sm}
                fontFamily="Onest500Medium"
                onPress={onPrivacyPolicyNavigate}
              >
                {' Privacy Policy'}
              </Typography>
            </Typography>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
