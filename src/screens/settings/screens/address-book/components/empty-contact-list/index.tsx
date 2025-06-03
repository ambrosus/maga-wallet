import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacer, Typography } from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { UserIcon } from '@components/svgs';
import { COLORS } from '@constants';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';

export const EmptyContactList = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<RootNavigationProp>();

  const addContact = () =>
    navigation.navigate(SETTINGS_STACK_ROUTES.AddContact);

  return (
    <View style={styles.root}>
      <Spacer value={scale(40)} />
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <View style={styles.userIconBg}>
            <UserIcon />
          </View>
          <Spacer value={scale(20)} />
          <View style={styles.textWrapper}>
            <Typography
              align="center"
              numberOfLines={2}
              fontWeight="500"
              fontSize={16}
              color={COLORS.textSecondary}
            >
              {t('settings.address.book.empty.list')}
            </Typography>
          </View>
        </View>
        <Spacer value={scale(20)} />
        <PrimaryButton
          onPress={addContact}
          title={t('settings.address.book.add.contact')}
        />
      </View>
    </View>
  );
};
