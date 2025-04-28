import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@components';
import { Settingsitems } from '../models';

export const ManageAccountsScreen = () => {
  const route = useRoute();
  const { name } = route.params as { name: Settingsitems };
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header goBack title={t(`settings.tabs.${name}`)} />
    </SafeAreaView>
  );
};
