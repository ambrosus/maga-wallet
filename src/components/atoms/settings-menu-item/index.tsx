import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacer, Typography } from '@components/atoms';
import { Button } from '@components/molecules';
import { Arow } from '@components/svgs';
import { RootNavigationProp } from '@navigation/root-stack';
import { SettingItem } from '@screens/settings/models';
import { scale } from '@utils';
import { styles } from './styles';

interface SettingsMenuItemProps {
  settingItem: SettingItem;
  showSeparator: boolean;
}

export const SettingsMenuItem = ({
  settingItem,
  showSeparator
}: SettingsMenuItemProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const { t } = useTranslation();
  const { name, route, icon } = settingItem;
  const handlePress = () => navigation.navigate(route, { name });
  const notification = 0;

  return (
    <Button
      style={
        showSeparator
          ? { ...styles.menuItem, ...styles.itemSeperator }
          : styles.menuItem
      }
      onPress={handlePress}
    >
      <View style={styles.menuItemWrapper}>
        <View style={styles.leftBlock}>
          {icon}
          <Spacer horizontal value={scale(10)} />
          <Typography>{t(`settings.tabs.${name}`)}</Typography>
        </View>

        <View style={styles.rightBlock}>
          {!!notification && <Typography>{notification}</Typography>}
          <Spacer horizontal value={scale(15)} />
          <Arow orientation="right" />
        </View>
      </View>
    </Button>
  );
};
