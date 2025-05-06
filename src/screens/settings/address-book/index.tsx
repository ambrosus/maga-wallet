import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header } from '@components';

export const AddressBookScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.address.book')} />
    </SafeAreaView>
  );
};
