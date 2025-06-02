import { forwardRef, useMemo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { FlatList } from 'react-native-gesture-handler';
import { Spacer, Typography } from '@components/atoms';
import { WalletContainer } from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { GearIcon } from '@components/svgs';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef } from '@lib/hooks';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { IWallet } from '@types';
import { delay, scale } from '@utils';
import { styles } from './styles';

interface BottomSheetWalletSelectorProps {
  title?: string;
  settingsButton?: boolean;
}

export const BottomSheetWalletSelector = forwardRef<
  BottomSheetModal,
  BottomSheetWalletSelectorProps
>(({ title, settingsButton = false }, ref) => {
  const { wallets, changeSelectedWallet } = useWalletStore();

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

  const listStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      maxHeight: settingsButton ? '70%' : '100%'
    };
  }, [settingsButton]);

  const renderItem = ({ item }: { item: IWallet }) => (
    <WalletContainer
      item={item}
      onPress={handleSelectWallet}
      containerStyle={{
        marginVertical: 0
      }}
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={title}
      maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
    >
      <View style={styles.container}>
        <View>
          <FlatList
            style={[styles.listWrapper, listStyle]}
            data={wallets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          {settingsButton && (
            <>
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
            </>
          )}
        </View>
      </View>
    </BottomSheet>
  );
});
