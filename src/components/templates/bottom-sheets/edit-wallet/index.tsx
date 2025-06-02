import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Separator, Spacer, Typography } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { EditIcon, ShareIcon } from '@components/svgs';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useForwardedRef } from '@lib/hooks';
import { IWallet } from '@types';
import { scale, verticalScale } from '@utils';
import { EditItem } from './components';
import { styles } from './styles';

interface BottomSheetEditWalletProps {
  wallet: IWallet | null;
  onEditNamePress: () => void;
  onRemoveWalletPress: () => void;
  onShareWalletPress: () => void;
}

export const BottomSheetEditwallet = forwardRef<
  BottomSheetModal,
  BottomSheetEditWalletProps
>(
  (
    { wallet, onEditNamePress, onRemoveWalletPress, onShareWalletPress },
    ref
  ) => {
    const { t } = useTranslation();
    const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);

    const onItemPress = (event: (wallet: IWallet) => void) => {
      bottomSheetRef.current?.dismiss();
      if (wallet) {
        event(wallet);
      }
    };
    return (
      <BottomSheet
        ref={bottomSheetRef}
        maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
      >
        <Spacer value={verticalScale(6)} />
        <Typography
          color={COLORS.textPrimary}
          align="center"
          fontSize={scale(18)}
        >
          {wallet?.name || ''}
        </Typography>
        <View style={styles.container}>
          <EditItem
            icon={<EditIcon />}
            title={t('settings.manage.accounts.edit.account')}
            onPress={() => onItemPress(onEditNamePress)}
          />
          <EditItem
            icon={<ShareIcon />}
            title={t('settings.manage.accounts.share.account')}
            onPress={() => onItemPress(onShareWalletPress)}
          />
          <EditItem
            textColor={COLORS.destructive500}
            icon={<Separator itemWidth={14} color={COLORS.destructive500} />}
            title={t('settings.manage.accounts.remove.account')}
            onPress={() => onItemPress(onRemoveWalletPress)}
          />
        </View>
      </BottomSheet>
    );
  }
);
