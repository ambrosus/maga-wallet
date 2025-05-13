import { useCallback } from 'react';
import { Alert, Image, View } from 'react-native';
import {
  IconContainer,
  SafeViewContainer,
  Spacer,
  Typography
} from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { SocialAuthList } from '@components/organisms';
import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONT_SIZE } from '@constants';
import { useAuth } from '@core/auth/lib';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import { SETTINGS_STACK_ROUTES, TABS_STACK_ROUTES } from '@navigation';
import {
  ROOT_STACK_ROUTES,
  RootNavigationScreenProps,
  RootStackParamsList
} from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';

export const AuthScreen = ({
  navigation
}: RootNavigationScreenProps<'AuthScreen'>) => {
  const { authCallback, loading } = useAuth();

  const onNavigateToPasskey = useCallback(() => {
    const isPasscodeSetup = mmkv.getItem(MMKV_KEYS.isAppPasskeySet);

    if (isPasscodeSetup) {
      navigation.replace(ROOT_STACK_ROUTES.Tabs, {
        screen: TABS_STACK_ROUTES.Settings,
        params: {
          screen: SETTINGS_STACK_ROUTES.EnterPasscode
        }
      } as unknown as RootStackParamsList['Tabs']);
    } else {
      navigation.replace(ROOT_STACK_ROUTES.Tabs, {
        screen: TABS_STACK_ROUTES.Settings,
        params: {
          screen: SETTINGS_STACK_ROUTES.CreateNewPasscode
        }
      } as unknown as RootStackParamsList['Tabs']);
    }
  }, [navigation]);

  const onTermsUsageNavigate = useCallback(() => {
    Alert.alert('Terms of Service');
  }, []);

  const onPrivacyPolicyNavigate = useCallback(() => {
    Alert.alert('Privacy Policy');
  }, []);

  return (
    <View style={styles.container}>
      <SafeViewContainer>
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
          <SocialAuthList loading={loading} authCallback={authCallback} />
          <Spacer value={scale(32)} />
          <PrimaryButton disabled={loading} onPress={onNavigateToPasskey}>
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
      </SafeViewContainer>
    </View>
  );
};
