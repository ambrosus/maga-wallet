import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer, Typography } from '@components/atoms';
import { Header, PrimaryButton } from '@components/molecules';
import { COLORS } from '@constants';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';

export const TwoFAPrepare = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  const onPress = () => {
    navigation.navigate(SETTINGS_STACK_ROUTES.TwoFASetup);
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View>
          <Header title={t('settings.tabs.two.fa.setup.header')} />
          <Spacer value={scale(50)} />
          <View style={styles.centerAling}>
            <Image
              source={require('@assets/images/google-auth-icon.png')}
              style={styles.image}
            />
          </View>
          <Spacer value={scale(50)} />
          <View style={styles.centerAling}>
            <Typography
              color={COLORS.textPrimary}
              fontSize={scale(16)}
              align="center"
            >
              {t('settings.tabs.two.fa.setup.title')}
            </Typography>
            <Spacer value={scale(20)} />

            <Typography
              fontSize={scale(14)}
              color={COLORS.textSecondary}
              align="center"
            >
              {t('settings.tabs.two.fa.setup.description')}
            </Typography>
          </View>
        </View>
        <PrimaryButton
          title={t('settings.tabs.two.fa.setup.button')}
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};
