import { SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Header } from '@components/molecules';
import { Settingsitems } from '../models';

export const SecurityScreen = () => {
  const route = useRoute();
  const { name } = route.params as { name: Settingsitems };
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header goBack title={t(`settings.tabs.${name}`)} />
    </SafeAreaView>
  );
};
