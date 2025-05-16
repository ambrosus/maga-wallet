import { forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { Spacer, Typography } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { CheckboxCircle, GearIcon } from '@components/svgs';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef } from '@lib/hooks';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { IWallet } from '@types';
import { delay, NumberUtils, scale } from '@utils';
import { styles } from './styles';

export const BottomSheetWalletSelector = forwardRef<BottomSheetModal, any>(
  (_, ref) => {
    const {
      calculateTotalUsdBalance,
      wallets,
      selectedWallet,
      changeSelectedWallet,
      getTokensByWalletAddress
    } = useWalletStore();

    const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);
    const navigation = useNavigation<RootNavigationProp>();
    const onPressSettings = async () => {
      bottomSheetRef.current?.dismiss();
      await delay(150);
      bottomSheetRef.current?.close();

      navigation.navigate(ROOT_STACK_ROUTES.SettingsStack);
    };
    const handleSelectWallet = async (wallet: IWallet) => {
      changeSelectedWallet(wallet);
      await delay(150);
      bottomSheetRef.current?.close();
    };

    const renderItem = ({ item }: { item: IWallet }) => {
      const isSelected = selectedWallet.id === item.id;
      const tokens = getTokensByWalletAddress(item.address);
      const usdBalance = calculateTotalUsdBalance(tokens);

      return (
        <TouchableOpacity
          onPress={() => handleSelectWallet(item)}
          style={styles.walletItem}
        >
          <View>
            <Typography color={COLORS.textPrimary}>{item.name}</Typography>
            <Typography style={styles.balanceText}>
              ${NumberUtils.formatNumber(usdBalance)}
            </Typography>
          </View>
          <View>{isSelected && <CheckboxCircle />}</View>
        </TouchableOpacity>
      );
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
      >
        <View style={styles.container}>
          <View>
            <BottomSheetFlatList
              style={styles.listWrapper}
              data={wallets}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            <Spacer value={scale(16)} />
            <TouchableOpacity
              onPress={onPressSettings}
              style={styles.settingContainer}
            >
              <GearIcon />
              <Spacer horizontal value={scale(4)} />
              <Typography color={COLORS.textPrimary}>
                {t('settings.title')}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }
);
