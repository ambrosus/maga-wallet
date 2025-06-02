import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import { SettingsMenuItem } from '@components/atoms';
import { Header } from '@components/molecules';

interface AboutData {
  title: string;
  route?: string;
  data?: string;
}

const ABOUT_DATA: AboutData[] = [
  {
    title: 'Privacy Policy',
    route: ''
  },
  {
    title: 'Terms of Service',
    route: ''
  },
  {
    title: 'Version',
    data: DeviceInfo.getVersion()
  }
];

export const AboutScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.about')} />
      {ABOUT_DATA.map((item: AboutData) => {
        const { title, data } = item;
        const handlePress = () => {
          //TODO hadle press
        };
        return (
          <SettingsMenuItem
            disabled={title === 'Version'}
            onPress={handlePress}
            key={title}
            title={title}
            subtitle={data}
            showSeparator={false}
            isArrow={title !== 'Version'}
          />
        );
      })}
    </SafeAreaView>
  );
};
