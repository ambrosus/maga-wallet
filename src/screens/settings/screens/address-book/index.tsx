import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Spacer, Spinner } from '@components/atoms';
import { Header } from '@components/molecules';
import { useAllContactsQuery } from '@core/contacts/lib';
import { scale } from '@utils';
import { EmptyContactList, ContactList } from './components';
import { styles } from './styles';

export const AddressBookScreen = () => {
  const { t } = useTranslation();
  const { data, loading: loadingContacts } = useAllContactsQuery();

  const isEmpty = data?.length;

  const AddressBookTemplate = () => {
    if (loadingContacts)
      return (
        <SafeAreaView style={styles.spinnerContainer}>
          <Spacer value={scale(20)} />
          <Spinner size="large" />
        </SafeAreaView>
      );
    if (isEmpty) return <EmptyContactList />;
    return <ContactList />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack title={t('settings.tabs.address.book')} />
      <AddressBookTemplate />
    </SafeAreaView>
  );
};
