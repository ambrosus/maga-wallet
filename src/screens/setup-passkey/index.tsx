import { useRef } from 'react';
import { Image, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BottomSheetSetupBiometrics,
  Button,
  PrimaryButton,
  SetupFaceIdButton,
  SetupPasskeyBenefitsContainer,
  Spacer,
  Typography
} from '@components';
import { DEVICE_WIDTH, DEVICE_HEIGHT, FONT_SIZE, COLORS } from '@constants';
import { verticalScale } from '@utils';
import { styles } from './styles';

export const SetupPasskeyScreen = () => {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapToIndex = () => bottomSheetRef.current?.present();

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView style={styles.container}>
            <Image
              style={styles.background}
              width={DEVICE_WIDTH}
              height={DEVICE_HEIGHT}
              source={require('@assets/images/passkey-background.png')}
            />

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
              <SetupFaceIdButton />
            </View>
          </SafeAreaView>

          <BottomSheetSetupBiometrics ref={bottomSheetRef} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};
