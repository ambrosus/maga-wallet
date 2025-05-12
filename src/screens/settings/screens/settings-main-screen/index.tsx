import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Spacer } from '@components';
import { scale } from '@utils';
import { styles } from './styles';
import { SettingsMenuItem } from '../../components';
import { SETTINGS_ITEMS } from '../../constants';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <Header title={t('settings.tabs.app.settings')} />
      <Spacer value={scale(15)} />
      <View style={styles.menuItemContainer}>
        {SETTINGS_ITEMS.map((item, index) => {
          return (
            <SettingsMenuItem
              key={item.route}
              settingItem={item}
              showSeparator={index + 1 !== SETTINGS_ITEMS.length}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
