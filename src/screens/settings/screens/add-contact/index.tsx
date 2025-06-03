import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header } from '@components/molecules';
import { AddContactForm } from './components';

export const AddContactScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header title={t('settings.address.book.add.contact.title')} />
      <AddContactForm />
    </SafeAreaView>
  );
};
