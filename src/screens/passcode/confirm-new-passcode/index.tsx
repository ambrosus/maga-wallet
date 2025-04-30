import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { mmkv } from '@lib';
import { keychainStore } from '@lib/keychain';
import { KEYCHAIN_KEYS } from '@lib/keychain/keys';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import { RootNavigationProp } from '@navigation/root-stack';
import {
  useHandleRemove,
  useShakeAnimation,
  useHandleCodeChange
} from '../hooks';
import { PasscodeScreenLayout } from '../passcode-layout';

type ConfirmNewPasscodeRouteParams = { passcode: string };

export const ConfirmNewPasscode = ({}) => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { passcode: pascodeToConfirm }
  } =
    useRoute<RouteProp<{ params: ConfirmNewPasscodeRouteParams }, 'params'>>();
  const { t } = useTranslation();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const { triggerShake } = useShakeAnimation();

  const onComplete = (newCode: string) => {
    if (newCode === pascodeToConfirm) {
      setTimeout(() => {
        navigation.replace('Tabs');
      }, 100);
      mmkv.setItem(MMKV_KEYS.isAppPasskeySet, 'true');
      keychainStore.setItem(KEYCHAIN_KEYS.appPasscode, newCode);
    } else {
      setPasscode('');
      triggerShake();
      setError('Incorrect passcode');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCodeChange = useHandleCodeChange({
    passcode,
    setPasscode,
    error,
    setError,
    triggerShake,
    onComplete
  });

  const handleRemove = useHandleRemove({
    passcode,
    setPasscode,
    error,
    setError
  });

  return (
    <SafeAreaView>
      <PasscodeScreenLayout
        title={t('settings.tabs.confirm.new.passkey')}
        passcode={passcode}
        error={error}
        handleCodeChange={handleCodeChange}
        handleRemove={handleRemove}
      />
    </SafeAreaView>
  );
};
