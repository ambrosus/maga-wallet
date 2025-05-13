import { useMemo } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Spinner, Typography } from '@components/atoms';
import { PrimaryButton } from '@components/molecules';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapSettings } from '@core/dex/lib/hooks';
import { AllowanceStatus } from '@core/dex/types';

interface SwapErrorImpactButtonProps {
  isProcessingSwap: boolean;
  onCompleteMultiStepSwap: () => void;
  minimized?: boolean;
}

export const SwapErrorImpactButton = ({
  isProcessingSwap,
  onCompleteMultiStepSwap,
  minimized = false
}: SwapErrorImpactButtonProps) => {
  const { t } = useTranslation();
  const {
    uiBottomSheetInformation: { priceImpact, allowance }
  } = useSwapContextSelector();
  const {
    settings: {
      current: { extendedMode }
    }
  } = useSwapSettings();

  const { isInsufficientBalance } = useSwapContextSelector();

  const buttonStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return minimized ? { flex: 1 } : {};
  }, [minimized]);

  const disabled = useMemo(() => {
    if (priceImpact) {
      return (
        allowance === AllowanceStatus.INCREASE ||
        (priceImpact > 10 && !extendedMode) ||
        isInsufficientBalance ||
        isProcessingSwap
      );
    }

    return false;
  }, [
    allowance,
    extendedMode,
    isInsufficientBalance,
    isProcessingSwap,
    priceImpact
  ]);

  const buttonActionString = useMemo(() => {
    if (minimized) {
      return t('swap.button.swap.anyway');
    }

    if (isInsufficientBalance) {
      return t('buttons.insufficient');
    }

    if (priceImpact) {
      if (priceImpact > 10 && !extendedMode) {
        return t('swap.button.impact.high');
      } else {
        return t('swap.button.swap.anyway');
      }
    }
  }, [minimized, isInsufficientBalance, priceImpact, t, extendedMode]);

  // const buttonColors = useMemo(() => {
  //   if (priceImpact && priceImpact >= 5 && priceImpact < 10) {
  //     return PriceImpactErrorColors.expert;
  //   }

  //   return PriceImpactErrorColors[
  //     !extendedMode || allowance === AllowanceStatus.INCREASE
  //       ? 'default'
  //       : ('expert' as keyof typeof PriceImpactErrorColors)
  //   ];
  // }, [allowance, extendedMode, priceImpact]);

  return (
    <PrimaryButton
      disabled={disabled}
      style={buttonStyle}
      onPress={onCompleteMultiStepSwap}
    >
      {isProcessingSwap ? (
        <Spinner />
      ) : (
        <Typography
          fontSize={16}
          fontFamily="Onest600SemiBold"
          color={COLORS.white}
        >
          {buttonActionString}
        </Typography>
      )}
    </PrimaryButton>
  );
};
