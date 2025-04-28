import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { useHandleRemove, useHandleCodeChange } from '../hooks';
import { PasscodeScreenLayout } from '../passcode-layout';

export const CreaateNewPasscode = ({}) => {
  const navigation = useNavigation<RootNavigationProp>();
  const { t } = useTranslation();
  const [passcode, setPasscode] = useState('');

  const onComplete = (newCode: string) => {
    navigation.navigate(SETTINGS_STACK_ROUTES.ConfirmNewPasscode, {
      passcode: newCode
    });
  };

  const handleCodeChange = useHandleCodeChange({
    passcode,
    setPasscode,
    onComplete
  });

  const handleRemove = useHandleRemove({
    passcode,
    setPasscode
  });

  return (
    <SafeAreaView>
      <PasscodeScreenLayout
        title={t('settings.tabs.create.new.passkey')}
        headerWithGoBack={false}
        passcode={passcode}
        handleCodeChange={handleCodeChange}
        handleRemove={handleRemove}
      />
    </SafeAreaView>
  );
};
