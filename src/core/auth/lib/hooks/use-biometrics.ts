import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';
import { handleCreatePasskey } from '../biometrics';

export function useBiometrics() {
  const rnBiometrics = useMemo(() => new ReactNativeBiometrics(), []);

  const [availableBiometricMethod, setAvailableBiometricMethod] =
    useState<BiometryType | null>(null);

  const handleDeviceBiometrics = useCallback(async () => {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (biometryType)
      setAvailableBiometricMethod(available ? biometryType : null);
  }, [rnBiometrics]);

  useEffect(() => {
    handleDeviceBiometrics();
  }, [handleDeviceBiometrics]);

  const onHandleBiometricsAuth = useCallback(async () => {
    try {
      const promptResult = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint'
      });

      const { success } = promptResult;

      if (success) {
        console.warn('successful biometrics provided');
      } else {
        console.warn('user cancelled biometric prompt');
      }
    } catch (error) {
      console.error('Biometric error:', error);
      throw Error(error as string);
    }
  }, [rnBiometrics]);

  const createPasskey = useCallback(async () => {
    try {
      return await handleCreatePasskey();
    } catch (error) {
      console.error('Biometric error:', error);
      throw Error(error as string);
    }
  }, []);
  return { onHandleBiometricsAuth, createPasskey, availableBiometricMethod };
}
