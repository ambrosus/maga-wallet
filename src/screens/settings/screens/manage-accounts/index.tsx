import { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, View, Share } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Separator, Spacer } from '@components/atoms';
import {
  Header,
  Toast,
  ToastType,
  WalletContainer
} from '@components/molecules';
import { ThreeDotsIcon } from '@components/svgs';
import {
  BottomSheetEditwallet,
  BottomSheetEditWalletName,
  BottomSheetConfirmModal
} from '@components/templates';
import { COLORS } from '@constants';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef } from '@lib';
import { IWallet } from '@types';
import { scale } from '@utils';
import { UserInfoCantainer } from './components';
import { styles } from './styles';

export const ManageAccountsScreen = () => {
  const { t } = useTranslation();
  const { wallets, removeWallet } = useWalletStore();
  const [walletToEdit, setWalletToEdit] = useState<IWallet | null>(null);

  const editWalletRef = useForwardedRef<BottomSheetModal>(null);
  const editWalletNameRef = useForwardedRef<BottomSheetModal>(null);
  const removeWalletRef = useForwardedRef<BottomSheetModal>(null);

  const onPressChangeUserInfo = useCallback(() => {
    // Removed console.log
  }, []);

  const RightContent = ({ wallet }: { wallet: IWallet }) => {
    const handlePresentEditSheet = () => {
      setWalletToEdit(wallet);
      editWalletRef.current?.present();
    };
    return (
      <TouchableOpacity
        style={styles.rightContentTouchable}
        onPress={handlePresentEditSheet}
      >
        <ThreeDotsIcon />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }: { item: IWallet; index: number }) => (
    <>
      <WalletContainer
        disabled
        containerStyle={styles.walletItemWrapper}
        item={item}
        contentRight={<RightContent wallet={item} />}
      />
      {index !== wallets.length - 1 && <Separator color={COLORS.neutral300} />}
    </>
  );

  const onEditNamePress = () => {
    editWalletNameRef.current?.present();
  };
  const onRemoveWalletPress = () => {
    removeWalletRef.current?.present();
  };
  const onShareWalletPress = async () => {
    await Share.share({
      message: t('settings.manage.accounts.share.account'),
      title: t('settings.manage.accounts.share.account')
    });
  };

  const onApproveRemoveWallet = () => {
    if (walletToEdit) {
      removeWallet(walletToEdit?.id);
    }
    Toast.show({
      text: t('settings.manage.accounts.toast.success.remove.wallet'),
      type: ToastType.Success
    });
    removeWalletRef.current?.dismiss();
  };

  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.manage.accounts')} />
      <Spacer value={scale(16)} />
      <View style={styles.container}>
        <UserInfoCantainer onPressChange={onPressChangeUserInfo} />
        <Spacer value={scale(30)} />
        <View style={styles.listWrapper}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={wallets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <BottomSheetEditwallet
        onShareWalletPress={onShareWalletPress}
        onEditNamePress={onEditNamePress}
        onRemoveWalletPress={onRemoveWalletPress}
        ref={editWalletRef}
        wallet={walletToEdit}
      />
      <BottomSheetEditWalletName
        ref={editWalletNameRef}
        wallet={walletToEdit}
      />
      <BottomSheetConfirmModal
        title={t('settings.manage.accounts.remove.wallet.title')}
        description={t(
          'settings.manage.accounts.remove.wallet.description'
        ).replace('{{walletName}}', walletToEdit?.name || '')}
        onApprove={onApproveRemoveWallet}
        onCancel={() => removeWalletRef.current?.dismiss()}
        ref={removeWalletRef}
        wallet={walletToEdit}
      />
    </SafeAreaView>
  );
};
