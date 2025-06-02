import { useMemo } from 'react';
import { View } from 'react-native';
import { t } from 'i18next';
import { RowContainer, Typography } from '@components/atoms';
import { TokenLogo } from '@components/molecules';
import { FONT_SIZE, COLORS, Config, CryptoCurrencyCode } from '@constants';
import { SendFundsButton } from '@core/send-funds/components';
import { useSendFundsStore } from '@core/send-funds/model';
import { useWalletStore } from '@core/wallets';
import { IToken } from '@types';
import { StringUtils, NumberUtils } from '@utils';
import { styles } from './styles';

interface SendFundsReviewFormProps {
  token: IToken;
}

export const SendFundsReviewForm = ({ token }: SendFundsReviewFormProps) => {
  const { selectedWallet } = useWalletStore();
  const { amount, receipient } = useSendFundsStore();

  const accountDetails = useMemo(() => {
    if (!selectedWallet) return '';

    const { name, address } = selectedWallet;

    return name ? name : StringUtils.formatAddress(address, 5, 4);
  }, [selectedWallet]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.innerDetailsContainer}>
          {/* Amount */}
          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
            >
              Amount
            </Typography>
            <RowContainer alignItems="center" gap={8}>
              <TokenLogo scale={0.75} token={token.currencyCode} />
              <Typography
                fontSize={FONT_SIZE.body.md}
                fontFamily="Onest500Medium"
                color={COLORS.textPrimary}
              >
                {NumberUtils.limitDecimalCount(amount, 5)} {token.currencyCode}
              </Typography>
            </RowContainer>
          </RowContainer>

          {/* Recipient */}
          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
            >
              Sending to
            </Typography>

            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
            >
              {StringUtils.formatAddress(receipient, 5, 4)}
            </Typography>
          </RowContainer>
        </View>

        <View style={styles.innerDetailsContainerTransparent}>
          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
            >
              From
            </Typography>

            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
            >
              {accountDetails}
            </Typography>
          </RowContainer>

          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={15}
              fontFamily="Onest500Medium"
              color={COLORS.neutral500}
            >
              {t('common.network')}
            </Typography>

            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
            >
              {Config.CHAIN_ID}
            </Typography>
          </RowContainer>

          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textSecondary}
            >
              {t('common.network.fee')}
            </Typography>

            <Typography
              fontSize={FONT_SIZE.body.md}
              fontFamily="Onest500Medium"
              color={COLORS.textPrimary}
            >
              0 {CryptoCurrencyCode.AMB}
            </Typography>
          </RowContainer>
        </View>
      </View>

      <SendFundsButton />
    </View>
  );
};
