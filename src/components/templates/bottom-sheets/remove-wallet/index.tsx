import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import {
  PrimaryButton,
  SecondaryButton,
  Toast,
  ToastType
} from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef } from '@lib/hooks';
import { IWallet } from '@types';
import { scale, verticalScale } from '@utils';
import { styles } from './styles';

interface BottomSheetRemoveWalletProps {
  wallet: IWallet | null;
}

export const BottomSheetRemoveWallet = forwardRef<
  BottomSheetModal,
  BottomSheetRemoveWalletProps
>(({ wallet }, ref) => {
  const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);
  const { t } = useTranslation();
  const { removeWallet } = useWalletStore();

  const handleRemoveWallet = () => {
    if (wallet) {
      removeWallet(wallet.id);
    }
    Toast.show({
      text: t('settings.manage.accounts.toast.success.remove.wallet'),
      type: ToastType.Success
    });
    bottomSheetRef.current?.dismiss();
  };

  const descriptionText = t(
    'settings.manage.accounts.remove.wallet.description'
  ).replace('{{walletName}}', wallet?.name || '');

  return (
    <BottomSheet
      ref={bottomSheetRef}
      maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
      swiperIconVisible={false}
    >
      <View style={styles.contentWrapper}>
        <Spacer value={verticalScale(6)} />
        <Typography
          color={COLORS.textPrimary}
          align="center"
          fontSize={scale(18)}
        >
          {t('settings.manage.accounts.remove.wallet.title')}
        </Typography>
        <Spacer value={verticalScale(16)} />
        <Typography
          fontSize={scale(14)}
          align="center"
          color={COLORS.textPrimary}
        >
          {descriptionText}
        </Typography>
        <RowContainer
          justifyContent="space-between"
          style={styles.buttonsRowContainer}
        >
          <SecondaryButton
            title={t('buttons.cancel')}
            onPress={() => bottomSheetRef.current?.dismiss()}
            style={[styles.buttonStyle, styles.secondaryButton]}
          />
          <PrimaryButton
            title={t('buttons.remove')}
            onPress={handleRemoveWallet}
            style={[styles.buttonStyle, styles.primaryButton]}
          />
        </RowContainer>
      </View>
    </BottomSheet>
  );
});
