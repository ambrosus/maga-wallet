import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { FONT_SIZE, COLORS } from '@constants';
import { useAnimatedDots } from '@lib';
import { HOME_STACK_ROUTES, HomeNavigationProp } from '@navigation';
import { IToken } from '@types';
import { delay } from '@utils';

interface SendFundsButtonProps {
  token: IToken;
}

export const SendFundsButton = ({ token }: SendFundsButtonProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();

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
      navigation.navigate(HOME_STACK_ROUTES.SendFundsTxStatusScreen, {
        token,
        status: 'success'
      });
    } catch (error) {
      throw error;
    } finally {
      setIsAnimating(false);
    }
  }, [navigation, setIsAnimating, token]);

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
