import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/atoms';
import { StatusView } from '@components/organisms';
import { COLORS, FONT_SIZE } from '@constants';
import { useSendFundsStore } from '@core/send-funds/model';
import { HOME_STACK_ROUTES } from '@navigation';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { StringUtils } from '@utils';
import { styles } from './styles';

export const SendFundsTxStatusScreen = ({
  route
}: RootNavigationScreenProps<HOME_STACK_ROUTES.SendFundsTxStatusScreen>) => {
  const { t } = useTranslation();
  const { amount, receipient } = useSendFundsStore();
  const {
    params: { token, status }
  } = route;

  const title = useMemo(() => {
    switch (status) {
      case 'success':
        return t('send.status.success.title');
      case 'error':
        return t('swap.status.error.title');
    }
  }, [status, t]);

  const description = useMemo(() => {
    switch (status) {
      case 'error': {
        return t('swap.status.error.description');
      }
    }
  }, [status, t]);

  return (
    <StatusView
      title={title}
      description={description ?? ''}
      descriptionComponent={
        status === 'success' && (
          <Typography
            fontSize={FONT_SIZE.body.md}
            fontFamily="Onest500Medium"
            color={COLORS.textPrimary}
            style={styles.successDescription}
            align="center"
          >
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest600SemiBold"
              color={COLORS.textPrimary}
              align="center"
            >
              {amount} {token.currencyCode}
            </Typography>{' '}
            {t('send.status.success.description')}{' '}
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest600SemiBold"
              color={COLORS.textPrimary}
              align="center"
            >
              {StringUtils.formatAddress(receipient, receipient.length - 27, 4)}
            </Typography>
          </Typography>
        )
      }
      status={status}
      typographyStyle={{
        title: {
          fontSize: FONT_SIZE.heading.xl,
          color: COLORS.textPrimary
        },
        description: {
          fontSize: FONT_SIZE.body.md,
          fontFamily: 'Onest500Medium',
          color: COLORS.textPrimary,
          align: 'center'
        }
      }}
    />
  );
};
