import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { PrimaryButton, PrimaryButtonProps } from '../primary-button';

interface SetupFaceIdButton extends PrimaryButtonProps {
  onPress: () => void;
}

export const SetupFaceIdButton = ({ onPress, ...props }: SetupFaceIdButton) => {
  const { t } = useTranslation();
  return (
    <PrimaryButton onPress={onPress} {...props}>
      <Typography fontFamily="Onest600SemiBold" color={COLORS.white}>
        {t('buttons.faceID')}
      </Typography>
    </PrimaryButton>
  );
};
