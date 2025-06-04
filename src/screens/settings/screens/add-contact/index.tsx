import { SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Header } from '@components/molecules';
import { RootStackParamsList } from '@navigation/root-stack';
import { AddContactForm } from './components';

export const AddContactScreen = () => {
  const { t } = useTranslation();
  const { params } =
    useRoute<RouteProp<RootStackParamsList, 'AddContactScreen'>>();

  const isEdit = params?.screenType === 'edit';

  const title = isEdit
    ? t('settings.address.book.edit.contact.title')
    : t('settings.address.book.add.contact.title');

  return (
    <SafeAreaView>
      <Header title={title} />
      <AddContactForm isEdit={isEdit} contact={params?.contact} />
    </SafeAreaView>
  );
};
