import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacer, Spinner } from '@components/atoms';
import { Header } from '@components/molecules';
import {
  BottomSheetConfirmModal,
  BottomSheetContactAction,
  BottomSheetTokensList
} from '@components/templates';
import { useAllContactsQuery } from '@core/contacts/lib';
import { Contact } from '@core/contacts/types';
import { useSendFundsStore } from '@core/send-funds/model';
import { useWalletStore } from '@core/wallets';
import { useForwardedRef } from '@lib';
import { HOME_STACK_ROUTES, SETTINGS_STACK_ROUTES } from '@navigation';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { TABS_STACK_ROUTES } from '@navigation/tabs-stacks/routes';
import { IToken } from '@types';
import { delay, delayNavigationAction, scale, StringUtils } from '@utils';
import { EmptyContactList, ContactList } from './components';
import { styles } from './styles';

export const AddressBookScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  const contactActionRef = useForwardedRef<BottomSheetModal>(null);
  const selectTokensBottomSheetRef = useForwardedRef<BottomSheetModal>(null);
  const removeContactRef = useForwardedRef<BottomSheetModal>(null);

  const { data, loading: loadingContacts } = useAllContactsQuery();

  const { selectedWalletTokens } = useWalletStore();
  const { setReceipient } = useSendFundsStore();

  const [contactToAction, setContactToAction] = useState<Contact | null>(null);

  const isEmpty = !data?.length;

  const openAction = (contact: Contact) => {
    setContactToAction(contact);
    contactActionRef.current?.present();
  };

  const onPressToken = (token: IToken) => {
    selectTokensBottomSheetRef.current?.close();
    if (contactToAction?.address) setReceipient(contactToAction.address);
    delayNavigationAction(() =>
      navigation.navigate(ROOT_STACK_ROUTES.Tabs, {
        screen: TABS_STACK_ROUTES.Home as 'Home',
        params: {
          screen: HOME_STACK_ROUTES.SendFundsScreen,
          params: { token }
        }
      })
    );
  };

  const onSendPress = async () => {
    await contactActionRef.current?.dismiss();
    await delay(300);
    selectTokensBottomSheetRef.current?.present();
  };
  const onEditPress = async () => {
    await contactActionRef.current?.dismiss();
    await delay(300);

    if (!contactToAction) return;
    navigation.navigate(SETTINGS_STACK_ROUTES.AddContact, {
      contact: contactToAction ?? undefined,
      screenType: 'edit'
    });
  };

  const onRemovePress = async () => {
    await contactActionRef.current?.dismiss();
    await delay(300);
    removeContactRef.current?.present();
  };

  const onApproveRemoveContact = () => {
    // TODO: Remove contact
  };
  const onCancelRemoveContact = () => {
    removeContactRef.current?.dismiss();
  };

  const AddressBookTemplate = () => {
    if (loadingContacts)
      return (
        <SafeAreaView style={styles.spinnerContainer}>
          <Spacer value={scale(20)} />
          <Spinner size="large" />
        </SafeAreaView>
      );
    if (isEmpty) return <EmptyContactList />;
    return <ContactList openAction={openAction} contacts={data} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack title={t('settings.tabs.address.book')} />
      <AddressBookTemplate />
      <BottomSheetContactAction
        ref={contactActionRef}
        contact={contactToAction}
        onSendPress={onSendPress}
        onEditPress={onEditPress}
        onRemovePress={onRemovePress}
      />
      <BottomSheetTokensList
        ref={selectTokensBottomSheetRef}
        title="Select Tokens to Send"
        tokens={selectedWalletTokens}
        onPress={onPressToken}
      />
      <BottomSheetConfirmModal
        // TODO: Add translation and correct title
        title={'!!!ARE YOU SURE?'}
        // TODO: Add translation and correct description
        description={`!!!${contactToAction?.name} ${StringUtils.formatAddress(
          contactToAction?.address ?? '',
          7,
          4
        )} will be removed from your address book`}
        onApprove={onApproveRemoveContact}
        onCancel={onCancelRemoveContact}
        ref={removeContactRef}
      />
    </SafeAreaView>
  );
};
