import { useRef } from 'react';
import { Image, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetSetupBiometrics,
  Button,
  SafeViewContainer,
  SetupBiometricsButton,
  SetupPasskeyBenefitsContainer,
  Spacer,
  Typography
} from '@components';
import { DEVICE_WIDTH, DEVICE_HEIGHT, FONT_SIZE, COLORS } from '@constants';
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
      <SafeViewContainer style={styles.container}>
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
            <Typography fontFamily="Onest600SemiBold" color={COLORS.neutral700}>
              {t('setupPasskey.button.later')}
            </Typography>
          </Button>
          <SetupBiometricsButton onPress={onSetupBiometrics} />
        </View>
      </SafeViewContainer>

      <BottomSheetSetupBiometrics ref={bottomSheetRef} />
    </>
  );
};
