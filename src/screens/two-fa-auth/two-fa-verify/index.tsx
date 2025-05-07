import { useState } from 'react';
import { Linking, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Header, Spacer, Typography } from '@components';
import { COLORS, isIos } from '@constants';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { scale } from '@utils';
import { CodeLayout } from '../components/code-layout';

export type TwoFAVerifyParams = {
  onVerify?: () => void;
};

export const TwoFAVerify = () => {
  const { params } =
    useRoute<RouteProp<Record<string, TwoFAVerifyParams>, string>>();
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  const [, setCode] = useState<string>('');

  const onFilled = (val: string) => {
    if (val === '000000')
      if (params?.onVerify) {
        params?.onVerify();
      }

    navigation.reset({
      index: 1,
      routes: [
        { name: SETTINGS_STACK_ROUTES.SettingsScreen },
        { name: SETTINGS_STACK_ROUTES.SecurityScreen }
      ]
    });
  };

  const goToGoogleAuthApp = async () => {
    const iosAppStoreURL = 'itms-apps://itunes.apple.com/app/id388497605';
    const androidPlayStoreURL =
      'market://details?id=com.google.android.apps.authenticator2';
    const fallbackURL = isIos ? iosAppStoreURL : androidPlayStoreURL;

    const otpScheme = 'otpauth://';

    try {
      const canOpen = await Linking.canOpenURL(otpScheme);
      if (canOpen) {
        await Linking.openURL(otpScheme);
      } else {
        await Linking.openURL(fallbackURL);
      }
    } catch (error) {
      console.warn('Failed to open app or store:', error);
      await Linking.openURL(fallbackURL);
    }
  };

  const onTextChange = (val: string) => {
    setCode(val);
  };
  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.two.fa.verify.header')} />
      <View style={{ paddingHorizontal: scale(25) }}>
        <Spacer value={scale(40)} />
        <Typography align="center">
          {t('settings.tabs.two.fa.verify.description')}
        </Typography>
        <Spacer value={scale(20)} />
        <CodeLayout onFilled={onFilled} onTextChange={onTextChange} />
        <View style={{ alignItems: 'flex-end' }}>
          <Button onPress={goToGoogleAuthApp}>
            <Typography color={COLORS.white}>
              {t('settings.tabs.get.code')}
            </Typography>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
