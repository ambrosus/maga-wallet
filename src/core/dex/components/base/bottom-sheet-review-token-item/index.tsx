import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Spacer, TokenLogo, Typography } from '@components';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { FIELD } from '@core/dex/types';
import { SwapStringUtils } from '@core/dex/utils';
import { verticalScale } from '@utils';
import { styles } from './styles';

interface BottomSheetReviewTokenItemProps {
  type: keyof typeof FIELD;
}

export const BottomSheetReviewTokenItem = ({
  type
}: BottomSheetReviewTokenItemProps) => {
  const { t } = useTranslation();
  const label = type === FIELD.TOKEN_A ? t('swap.pay') : t('swap.receive');
  const { selectedTokens, selectedTokensAmount } = useSwapContextSelector();

  const token = SwapStringUtils.extendedLogoVariants(
    selectedTokens[type]?.symbol ?? ''
  );

  const combinedTypeContainerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      ...styles.container,
      paddingTop: type === FIELD.TOKEN_B ? verticalScale(8) : 0,
      paddingBottom: type === FIELD.TOKEN_A ? verticalScale(8) : 0
    };
  }, [type]);

  return (
    <View style={combinedTypeContainerStyle}>
      <Typography
        fontSize={13}
        fontFamily="Onest600SemiBold"
        color={COLORS.neutral500}
      >
        {label}
      </Typography>
      <View style={styles.inner}>
        <TokenLogo token={token} scale={0.65} />
        <Spacer horizontal value={4} />
        <Typography
          fontSize={17}
          fontFamily="Onest600SemiBold"
          color={COLORS.neutral800}
        >
          {SwapStringUtils.transformAmountValue(selectedTokensAmount[type])}{' '}
          {selectedTokens[type]?.symbol}
        </Typography>
      </View>
    </View>
  );
};
