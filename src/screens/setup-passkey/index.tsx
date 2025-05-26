import { useRef } from 'react';
import { ImageBackground, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { SafeViewContainer, Typography, Spacer } from '@components/atoms';
import { Button, SetupBiometricsButton } from '@components/molecules';
import { SetupPasskeyBenefitsContainer } from '@components/organisms';
import { BottomSheetSetupBiometrics } from '@components/templates';
import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  FONT_SIZE,
  COLORS,
  FLEX_FULL_SIZE
} from '@constants';
import {
  ROOT_STACK_ROUTES,
  RootNavigationScreenProps
} from '@navigation/root-stack';
import { delayNavigationAction, verticalScale } from '@utils';
import { styles } from './styles';

type SetupPasskeyScreenProps = RootNavigationScreenProps<'SetupPasskeyScreen'>;

export const SetupPasskeyScreen = ({ navigation }: SetupPasskeyScreenProps) => {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapToIndex = () => bottomSheetRef.current?.present();

  const onSetupBiometrics = () => {
    bottomSheetRef.current?.dismiss();
    delayNavigationAction(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROOT_STACK_ROUTES.CreateWalletLoadingScreen
          }
        ]
      });
    });
  };

  return (
    <>
      <ImageBackground
        style={FLEX_FULL_SIZE}
        width={DEVICE_WIDTH}
        height={DEVICE_HEIGHT}
        source={require('@assets/images/passkey-background.png')}
      >
        <SafeViewContainer style={styles.container}>
          <View style={styles.header}>
            <Typography
              fontSize={FONT_SIZE.heading.xl}
              fontFamily="Onest600SemiBold"
              color={COLORS.textPrimary}
              letterSpacing={-1}
            >
              {t('setupPasskey.title')}
            </Typography>
            <Spacer value={verticalScale(8)} />
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
              style={styles.description}
            >
              {t('setupPasskey.description')}
            </Typography>

            <View style={styles.benefitsContainer}>
              <SetupPasskeyBenefitsContainer />
            </View>
          </View>

          <View style={styles.footer}>
            <Button style={styles.cancelButton} onPress={snapToIndex}>
              <Typography
                fontFamily="Onest600SemiBold"
                color={COLORS.neutral700}
              >
                {t('setupPasskey.button.later')}
              </Typography>
            </Button>
            <SetupBiometricsButton onPress={onSetupBiometrics} />
          </View>
        </SafeViewContainer>

        <BottomSheetSetupBiometrics ref={bottomSheetRef} />
      </ImageBackground>
    </>
  );
};
