import { memo, useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RowContainer, Spinner, Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapBetterRate } from '@core/dex/lib/hooks';
import { NumberUtils } from '@utils';
import { styles } from './styles';

interface SwapCurrencyRateProps {
  tokenToSell: string;
  tokenToReceive: string;
  tokensRoute: string[];
}

export const SwapCurrencyRate = memo(
  ({ tokenToSell, tokenToReceive }: SwapCurrencyRateProps) => {
    const { isExecutingPrice } = useSwapContextSelector();
    const {
      bestSwapRate,
      onToggleTokensOrder,
      tokens,
      isExecutingRate,
      rate,
      setRate
    } = useSwapBetterRate();

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (tokenToSell && tokenToReceive && !isExecutingPrice) {
          const executedTokensRate = bestSwapRate();

          if (!!executedTokensRate) {
            setRate(executedTokensRate);
          }
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }, [bestSwapRate, tokenToReceive, tokenToSell, isExecutingPrice, setRate]);

    const transformedCurrencyRate = useMemo(
      () => NumberUtils.toSignificantDigits(rate.toString(), 6),
      [rate]
    );

    return (
      <TouchableOpacity onPress={onToggleTokensOrder} activeOpacity={0.8}>
        <LinearGradient
          colors={['#FBF4FF', '#FFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <RowContainer
            style={styles.innerContainer}
            justifyContent="center"
            alignItems="center"
          >
            {isExecutingRate || typeof rate === 'number' ? (
              <Spinner customSize={17.5} />
            ) : (
              <Typography
                fontSize={14}
                fontFamily="Onest600SemiBold"
                color={COLORS.primary500}
              >
                1 {tokens.symbolInput ?? 'AMB'} = {transformedCurrencyRate}{' '}
                {tokens.symbolOutput}
              </Typography>
            )}
          </RowContainer>
        </LinearGradient>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.tokenToReceive === nextProps.tokenToReceive &&
    prevProps.tokenToSell === nextProps.tokenToSell
);
