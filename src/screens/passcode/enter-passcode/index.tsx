import { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'; // для навігації
import { t } from 'i18next';
import { keychainStore } from '@lib/keychain';
import { KEYCHAIN_KEYS } from '@lib/keychain/keys';
import { RootNavigationProp, ROOT_STACK_ROUTES } from '@navigation/root-stack';
import { useHandleRemove, useHandleCodeChange } from '../hooks';
import { PasscodeScreenLayout } from '../passcode-layout';

export type EnterPasscodeParams = {
  onPasscodeSuccess?: () => void;
};

export const EnterPasscode = () => {
  const { params } =
    useRoute<RouteProp<Record<string, EnterPasscodeParams>, string>>();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [currentPassKey, setCurrentPassKey] = useState<string | null>(null);
  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    keychainStore.getItem(KEYCHAIN_KEYS.appPasscode).then(setCurrentPassKey);
  }, []);

  const handleSubmit = useCallback(() => {
    if (passcode.length === 4) {
      if (passcode === currentPassKey) {
        setTimeout(() => navigation.replace(ROOT_STACK_ROUTES.Tabs), 100);
        const onPasscodeSuccess = (params as EnterPasscodeParams)
          ?.onPasscodeSuccess;
        if (typeof onPasscodeSuccess === 'function') {
          onPasscodeSuccess();
        }
      } else {
        setError(t('settings.tabs.incorect.passcode'));
        setPasscode('');
        setTimeout(() => setError(''), 3000);
      }
    }
  }, [passcode, currentPassKey, params, navigation]);

  const handleCodeChange = useHandleCodeChange({
    passcode,
    setPasscode,
    error,
    setError,
    onComplete: () => handleSubmit()
  });

  const handleRemove = useHandleRemove({
    passcode,
    setPasscode,
    error,
    setError
  });

  useEffect(() => {
    if (passcode.length === 4) {
      handleSubmit();
    }
  }, [passcode, handleSubmit]);

  return (
    <SafeAreaView>
      <PasscodeScreenLayout
        title={t('settings.tabs.enter.passkey')}
        headerWithGoBack={false}
        passcode={passcode}
        error={error}
        handleCodeChange={handleCodeChange}
        handleRemove={handleRemove}
      />
    </SafeAreaView>
  );
};
