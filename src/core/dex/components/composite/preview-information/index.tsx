import { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatEther } from 'viem';
import { RowContainer, Typography } from '@components';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapTokens } from '@core/dex/lib/hooks';
import {
  addresses,
  isETHtoWrapped,
  isWrappedToETH,
  SwapStringUtils
} from '@core/dex/utils';
import { getObjectKeyByValue, NumberUtils } from '@utils';
import { styles } from './styles';

export const PreviewInformation = () => {
  const { t } = useTranslation();
  const {
    latestSelectedTokens,
    uiBottomSheetInformation,
    _refExactGetter,
    isMultiHopSwapBetterCurrency,
    estimatedGasValues
  } = useSwapContextSelector();

  const { tokensRoute, tokenToSell, tokenToReceive } = useSwapTokens();

  const uiPriceImpact = useMemo(() => {
    const { priceImpact } = uiBottomSheetInformation;

    return priceImpact != null && priceImpact < 0.01 ? '<0.01' : priceImpact;
  }, [uiBottomSheetInformation]);

  const priceImpactHighlight = useMemo(() => {
    const { priceImpact } = uiBottomSheetInformation;

    if (priceImpact !== undefined && priceImpact !== null) {
      if (priceImpact < 0 || priceImpact < 5) return COLORS.success500;
      if (priceImpact >= 5) return COLORS.destructive500;
    }
  }, [uiBottomSheetInformation]);

  const symbol = useMemo(() => {
    return _refExactGetter
      ? tokenToReceive.TOKEN?.symbol
      : tokenToSell.TOKEN?.symbol;
  }, [
    _refExactGetter,
    tokenToReceive.TOKEN?.symbol,
    tokenToSell.TOKEN?.symbol
  ]);

  const isMultiHopRoute = useMemo(() => {
    return isMultiHopSwapBetterCurrency.tokens.length > 0;
  }, [isMultiHopSwapBetterCurrency]);

  const tokens = useMemo(() => {
    return isMultiHopSwapBetterCurrency.tokens.map((token) =>
      getObjectKeyByValue(addresses, token)
    );
  }, [isMultiHopSwapBetterCurrency.tokens]);

  const renderHopTokensRoute = useMemo(() => {
    return tokens.length > 0 ? tokens.join(' > ') : '';
  }, [tokens]);

  const estimatedNetworkFee = useMemo(() => {
    const { swap, approval } = estimatedGasValues;

    const parsedEstimatedGas = formatEther(swap + approval);

    return SwapStringUtils.transformRealizedLPFee(
      NumberUtils.limitDecimalCount(parsedEstimatedGas, 1)
    );
  }, [estimatedGasValues]);

  const isWrapOrUnwrapETH = useMemo(() => {
    return isETHtoWrapped(tokensRoute) || isWrappedToETH(tokensRoute);
  }, [tokensRoute]);

  return (
    <View style={styles.container}>
      {!isWrapOrUnwrapETH && (
        <>
          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={15}
              fontFamily="Onest500Medium"
              color={COLORS.neutral500}
            >
              {t(
                !_refExactGetter
                  ? 'swap.bottom.sheet.max.sold'
                  : 'swap.bottom.sheet.min.received'
              )}
            </Typography>

            <RightSideRowItem>
              {`${uiBottomSheetInformation.minimumReceivedAmount} ${symbol}`}
            </RightSideRowItem>
          </RowContainer>

          <RowContainer alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={15}
              fontFamily="Onest500Medium"
              color={COLORS.neutral500}
            >
              {t('swap.bottom.sheet.impact')}
            </Typography>

            <RightSideRowItem color={priceImpactHighlight}>
              {uiPriceImpact}%
            </RightSideRowItem>
          </RowContainer>
        </>
      )}

      <RowContainer alignItems="center" justifyContent="space-between">
        <Typography
          fontSize={15}
          fontFamily="Onest500Medium"
          color={COLORS.neutral500}
        >
          {t('swap.bottom.sheet.lpfee')}
        </Typography>

        <RightSideRowItem>{`${estimatedNetworkFee} $AMB`}</RightSideRowItem>
      </RowContainer>

      {isMultiHopRoute && (
        <RowContainer alignItems="center" justifyContent="space-between">
          <Typography
            fontSize={15}
            fontFamily="Onest500Medium"
            color={COLORS.neutral500}
          >
            {t('swap.route')}
          </Typography>

          <RightSideRowItem>
            {`${latestSelectedTokens.current.TOKEN_A?.symbol} > ${renderHopTokensRoute} > ${latestSelectedTokens.current.TOKEN_B?.symbol}`}
          </RightSideRowItem>
        </RowContainer>
      )}
    </View>
  );
};

const RightSideRowItem = ({
  children,
  color = COLORS.neutral800
}: {
  children: ReactNode;
  color?: string;
}) => {
  return (
    <Typography fontSize={15} fontFamily="Onest500Medium" color={color}>
      {children}
    </Typography>
  );
};
