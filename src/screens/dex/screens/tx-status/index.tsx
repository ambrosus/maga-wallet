import { useMemo } from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeViewContainer, Spacer, Typography } from '@components/atoms';
import { FailedIconWrapped, SuccessIconWrapped } from '@components/svgs';
import { TxStatusButtons } from '@components/templates';
import { DEVICE_WIDTH, DEVICE_HEIGHT, FONT_SIZE, COLORS } from '@constants';
import { useSwapTokens } from '@core/dex/lib/hooks';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { NumberUtils } from '@utils';
import { styles } from './styles';

type Props = RootNavigationScreenProps<'DexTxStatusScreen'>;

export const DexTxStatusScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { tokenToReceive } = useSwapTokens();

  const isError = useMemo(
    () => route.params?.status === 'error',
    [route.params?.status]
  );

  const amount = useMemo(() => {
    return NumberUtils.numberToTransformedLocale(
      route.params?.amount ?? tokenToReceive.AMOUNT
    );
  }, [route.params?.amount, tokenToReceive.AMOUNT]);

  const symbol = useMemo(
    () => route.params?.token ?? tokenToReceive.TOKEN.symbol,
    [route.params?.token, tokenToReceive.TOKEN.symbol]
  );

  const bgSource = useMemo(() => {
    return isError
      ? require('@assets/images/tx-failed-background.png')
      : require('@assets/images/tx-success-background.png');
  }, [isError]);

  const title = useMemo(() => {
    return t(`swap.status.${isError ? 'error' : 'success'}.title`);
  }, [isError, t]);

  const description = useMemo(() => {
    return t(`swap.status.${isError ? 'error' : 'success'}.description`, {
      amount,
      symbol
    });
  }, [isError, t, amount, symbol]);

  return (
    <SafeViewContainer style={styles.container}>
      <Image
        style={styles.background}
        width={DEVICE_WIDTH}
        height={DEVICE_HEIGHT}
        source={bgSource}
      />

      <View style={styles.innerContainer}>
        <View style={styles.statusContainer}>
          {isError ? <FailedIconWrapped /> : <SuccessIconWrapped />}
          <Spacer value={16} />
          <Typography
            fontSize={FONT_SIZE.heading.xl}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
            letterSpacing={-1}
          >
            {title}
          </Typography>
          <Spacer value={8} />
          <Typography
            fontSize={FONT_SIZE.body.lg}
            fontFamily="Onest500Medium"
            color={COLORS.textPrimary}
            align="center"
            style={styles.description}
          >
            {description}
          </Typography>
        </View>
      </View>

      <TxStatusButtons isError={isError} navigation={navigation} />
    </SafeViewContainer>
  );
};
