import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { FONT_SIZE, COLORS } from '@constants';
import { useAnimatedDots } from '@lib';
import { delay } from '@utils';

export const SendFundsButton = () => {
  const { t } = useTranslation();

  const { DotsComponent, setIsAnimating } = useAnimatedDots({
    fontSize: FONT_SIZE.body.md,
    fontFamily: 'Onest500Medium',
    color: COLORS.white
  });

  const [sending, setSending] = useState(false);

  const onSendFundsHandle = useCallback(async () => {
    try {
      setIsAnimating(true);
      setSending(true);
      await delay(5000);
      setSending(false);
    } catch (error) {
      throw error;
    } finally {
      setIsAnimating(false);
    }
  }, [setIsAnimating]);

  const buttonText = useMemo(
    () => t(sending ? 'buttons.sending' : 'account.actions.send'),
    [sending, t]
  );

  return (
    <PrimaryButton disabled={sending} onPress={onSendFundsHandle}>
      <Typography
        fontSize={FONT_SIZE.body.md}
        fontFamily="Onest500Medium"
        color={COLORS.white}
      >
        {buttonText}
        {sending && <DotsComponent />}
      </Typography>
    </PrimaryButton>
  );
};
