import { memo, useEffect, useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { RowContainer, Spinner, Typography } from '@components';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapBetterRate } from '@core/dex/lib/hooks';
import { NumberUtils, verticalScale } from '@utils';

interface SwapCurrencyRateProps {
  tokenToSell: string;
  tokenToReceive: string;
  tokensRoute: string[];
}

const _SwapCurrencyRate = ({
  tokenToSell,
  tokenToReceive
}: SwapCurrencyRateProps) => {
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

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      height: 52,
      paddingBottom: verticalScale(20)
    };
  }, []);

  const transformedCurrencyRate = useMemo(
    () => NumberUtils.toSignificantDigits(rate.toString(), 6),
    [rate]
  );

  return (
    <RowContainer
      style={containerStyle}
      justifyContent="center"
      alignItems="center"
    >
      {isExecutingRate || typeof rate === 'number' ? (
        <Spinner customSize={17.5} />
      ) : (
        <TouchableOpacity onPress={onToggleTokensOrder}>
          <Typography
            fontSize={14}
            fontFamily="Onest600SemiBold"
            color={COLORS.primary500}
          >
            1 {tokens.symbolInput ?? 'AMB'} = {transformedCurrencyRate}{' '}
            {tokens.symbolOutput}
          </Typography>
        </TouchableOpacity>
      )}
    </RowContainer>
  );
};

export const SwapCurrencyRate = memo(
  _SwapCurrencyRate,
  (prevProps, nextProps) =>
    prevProps.tokenToReceive === nextProps.tokenToReceive &&
    prevProps.tokenToSell === nextProps.tokenToSell
);
