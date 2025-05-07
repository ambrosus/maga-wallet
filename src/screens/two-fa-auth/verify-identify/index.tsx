import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { OtpInputRef } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, RowContainer, Spacer, Typography } from '@components';
import { COLORS } from '@constants';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';
import { useShakeAnimation } from '@styles';
import { scale } from '@utils';
import { useTimer } from '../hooks';
import { styles } from './styles';
import { CodeLayout } from '../components/code-layout';

export const VerifyIndentify = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();

  const [, setCode] = useState('');
  const [error, setError] = useState('');
  const { triggerShake } = useShakeAnimation();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [wasStarted, setWasStarted] = useState(false);
  const otpRef = useRef<OtpInputRef>(null);

  const { min, sec, start } = useTimer({
    duration: 60,
    onStart: () => setIsResendDisabled(true),
    onEnd: () => setIsResendDisabled(false)
  });

  useEffect(() => {
    const checkClipboard = async () => {
      const text = await Clipboard.getString();
      if (/^\d{6}$/.test(text)) {
        setCode(text);
      }
    };
    checkClipboard();
  }, []);

  useEffect(() => {
    if (error) {
      triggerShake();
    }
  }, [error, triggerShake]);

  const onFilled = (val: string) => {
    // TODO code validator
    if (val === '000000') {
      mmkv.setItem(MMKV_KEYS.isEmailVerified, 'true');
      navigation.navigate(SETTINGS_STACK_ROUTES.TwoFAPrepare);
    } else {
      setError('incorrect');
    }
  };

  const onTextChange = (value: string) => {
    setError('');
    setCode(value);
  };

  useFocusEffect(
    useCallback(() => {
      // TODO send code to user email
      otpRef.current?.focus();
      if (!wasStarted) {
        setWasStarted(true);
        start();
      }
    }, [wasStarted, start])
  );

  const resendCode = () => {
    if (!isResendDisabled) {
      start();
      // ТODO resend code logic
    }
  };

  return (
    <SafeAreaView>
      <Header goBack title={t('settings.tabs.verify.header')} />
      <Spacer value={scale(20)} />
      <View style={styles.main}>
        <Typography
          align="center"
          color={COLORS.textSecondary}
          fontSize={scale(14)}
        >
          {t('settings.tabs.verify.description')}
        </Typography>
        <CodeLayout onFilled={onFilled} onTextChange={onTextChange} />
        <Spacer value={scale(20)} />
        <RowContainer justifyContent="flex-end">
          <View style={styles.timerWrapper}>
            <Typography
              color={COLORS[isResendDisabled ? 'primary500' : 'neutral500']}
            >
              {`${min}:${sec}`}
            </Typography>
          </View>
          <TouchableOpacity
            disabled={isResendDisabled}
            onPress={resendCode}
            style={{ opacity: isResendDisabled ? 0.5 : 1 }}
          >
            <Typography
              color={COLORS[isResendDisabled ? 'neutral500' : 'primary500']}
            >
              {t('settings.tabs.resend.code')}
            </Typography>
          </TouchableOpacity>
        </RowContainer>
      </View>
    </SafeAreaView>
  );
};
