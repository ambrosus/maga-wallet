import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  IconContainer,
  RowContainer,
  Spacer,
  Typography
} from '@components/atoms';
import { SecondaryButton, SetupFaceIdButton } from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { WarningIcon } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { useForwardedRef } from '@lib/hooks';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { verticalScale } from '@utils';
import { styles } from './styles';

export const BottomSheetSetupBiometrics = forwardRef<BottomSheetModal, any>(
  ({}, ref) => {
    const { t } = useTranslation();
    const navigation = useNavigation<RootNavigationProp>();
    const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);

    const onDismissBottomSheet = () => bottomSheetRef.current?.dismiss();

    const onHandleBiometricsAuth = () =>
      navigation.navigate(ROOT_STACK_ROUTES.CreateWalletLoadingScreen);

    return (
      <BottomSheet ref={bottomSheetRef}>
        <View style={styles.container}>
          <IconContainer size={80} backgroundColor={COLORS.warning50}>
            <WarningIcon />
          </IconContainer>
          <Spacer value={verticalScale(16)} />
          <Typography
            fontSize={FONT_SIZE.heading.lg}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
          >
            {t('setupPasskey.bottomSheet.title')}
          </Typography>
          <Spacer value={verticalScale(16)} />
          <Typography
            fontSize={FONT_SIZE.body.lg}
            fontFamily="Onest600SemiBold"
            color={COLORS.textSecondary}
            align="center"
          >
            {t('setupPasskey.bottomSheet.description')}
          </Typography>

          <Spacer value={verticalScale(32)} />

          <RowContainer gap={16}>
            <SetupFaceIdButton
              style={styles.button}
              onPress={onHandleBiometricsAuth}
            />
            <SecondaryButton
              style={styles.button}
              onPress={onDismissBottomSheet}
            >
              <Typography
                fontFamily="Onest600SemiBold"
                color={COLORS.neutral700}
              >
                {t('setupPasskey.bottomSheet.button.cancel')}
              </Typography>
            </SecondaryButton>
          </RowContainer>
        </View>
      </BottomSheet>
    );
  }
);
