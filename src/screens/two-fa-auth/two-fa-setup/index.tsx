import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CopyButton,
  Header,
  PrimaryButton,
  Spacer,
  Typography
} from '@components';
import { COLORS } from '@constants';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys.ts';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { styles } from './styles';

export const TwoFASetup = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  // TODO remove hardcode
  const code = 'D6IDDDH45024LKD42';
  const onVerify = () => {
    mmkv.setItem(MMKV_KEYS.twoFAAuthEnabled, 'true');
    mmkv.setItem(MMKV_KEYS.twoFAAuthConnected, 'true');
  };

  const onPress = () => {
    navigation.navigate(SETTINGS_STACK_ROUTES.TwoFAVerify, { onVerify });
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View>
          <Header goBack title={t('settings.tabs.two.fa.connect.header')} />
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
              fontSize={scale(16)}
              color={COLORS.textSecondary}
              align="center"
            >
              {t('settings.tabs.two.fa.connect.description')}
            </Typography>
            <Spacer value={scale(40)} />
            <View style={styles.codeContainer}>
              <View style={styles.codeWrapper}>
                <Typography color={COLORS.textPrimary} fontSize={scale(14)}>
                  {code}
                </Typography>
                <CopyButton
                  valueToCopy={code}
                  fontSize={13}
                  onCopyPress={() => {
                    // TODO add copy function
                  }}
                  title={t('settings.tabs.copy.key')}
                />
              </View>
            </View>
          </View>
        </View>
        <PrimaryButton title={t('buttons.next')} onPress={onPress} />
      </View>
    </SafeAreaView>
  );
};
