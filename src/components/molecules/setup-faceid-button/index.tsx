import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@components/atoms';
import { ANIMATION_DELAY, COLORS } from '@constants';
import { useBiometrics } from '@core/biometrics/lib/hooks';
import { PrimaryButton, PrimaryButtonProps } from '../primary-button';

type SetupFaceIdButtonProps = Partial<PrimaryButtonProps>;

export const SetupFaceIdButton = ({
  onPress,
  ...props
}: SetupFaceIdButtonProps) => {
  const { t } = useTranslation();

  const { onHandleBiometricsAuth } = useBiometrics();

  const onCheckBiometrics = useCallback(async () => {
    await onHandleBiometricsAuth();
    if (onPress)
      setTimeout(() => {
        onPress();
      }, ANIMATION_DELAY * 2);
  }, [onHandleBiometricsAuth, onPress]);

  return (
    <PrimaryButton onPress={onCheckBiometrics} {...props}>
      <Typography fontFamily="Onest600SemiBold" color={COLORS.white}>
        {t('buttons.faceID')}
      </Typography>
    </PrimaryButton>
  );
};
