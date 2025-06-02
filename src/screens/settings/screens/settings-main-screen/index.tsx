import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer, SettingsMenuItem } from '@components/atoms';
import { Header } from '@components/molecules';
import { RootNavigationProp } from '@navigation/types';
import { SETTINGS_ITEMS } from '@screens/settings/constants';
import { scale } from '@utils';
import { styles } from './styles';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <SafeAreaView>
      <Header title={t('settings.tabs.app.settings')} />
      <Spacer value={scale(15)} />
      <View style={styles.menuItemContainer}>
        {SETTINGS_ITEMS.map((item, index) => {
          const { name, route, icon } = item;
          const onPress = () => navigation.navigate(route, { name });
          return (
            <SettingsMenuItem
              key={item.route}
              title={t(`settings.tabs.${name}`)}
              icon={icon}
              onPress={onPress}
              showSeparator={index + 1 !== SETTINGS_ITEMS.length}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
