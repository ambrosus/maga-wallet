import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header } from '@components/molecules';

export const NotificationsScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.notifications')} />
    </SafeAreaView>
  );
};
