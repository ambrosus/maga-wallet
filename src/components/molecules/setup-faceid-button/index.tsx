import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { PrimaryButton, PrimaryButtonProps } from '../primary-button';

type SetupFaceIdButtonProps = Partial<PrimaryButtonProps>;

export const SetupFaceIdButton = ({
  onPress,
  ...props
}: SetupFaceIdButtonProps) => {
  const { t } = useTranslation();

  const onCheckBiometrics = useCallback(async () => {
    const rnBiometrics = new ReactNativeBiometrics();

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

    if (onPress) onPress();
  }, [onPress]);

  return (
    <PrimaryButton onPress={onCheckBiometrics} {...props}>
      <Typography fontFamily="Onest600SemiBold" color={COLORS.white}>
        {t('buttons.faceID')}
      </Typography>
    </PrimaryButton>
  );
};
