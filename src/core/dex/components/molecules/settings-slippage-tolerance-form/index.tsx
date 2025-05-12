import { useCallback } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  PercentPressableContainer,
  RowContainer,
  Typography
} from '@components/atoms';
import { COLORS } from '@constants';
import { SettingsInputWithLabel } from '@core/dex/components/atoms';
import { useSwapSettings } from '@core/dex/lib/hooks';
import { styles } from './styles';

const SLIPPAGE_TOLERANCE_PERCENTAGES = ['0.1', '0.5', '1'];

export const SettingsSlippageToleranceForm = () => {
  const { t } = useTranslation();
  const { _refSettingsGetter, onChangeSettings } = useSwapSettings();

  const onPercentageBoxPress = (value: number) => {
    if (value.toString().includes('.')) {
      const newValue = value + '0';
      return onChangeSettings('slippageTolerance', String(newValue));
    }

    const newValue = value + '.00';
    return onChangeSettings('slippageTolerance', String(newValue));
  };

  const onChangeSlippageToleranceHandle = useCallback(
    (value: string) => {
      onChangeSettings('slippageTolerance', value);
    },
    [onChangeSettings]
  );

  return (
    <View style={styles.container}>
      <SettingsInputWithLabel
        label={t('swap.settings.slippage')}
        value={_refSettingsGetter.slippageTolerance}
        onChangeText={onChangeSlippageToleranceHandle}
        placeholder="0.50%"
      >
        {_refSettingsGetter.slippageTolerance.length > 0 && (
          <Typography
            fontSize={16}
            fontFamily="Onest500Medium"
            color={COLORS.neutral900}
            style={styles.symbol}
          >
            %
          </Typography>
        )}
      </SettingsInputWithLabel>

      <RowContainer style={styles.slippageToleranceRow} alignItems="center">
        {SLIPPAGE_TOLERANCE_PERCENTAGES.map((value) => (
          <PercentPressableContainer
            key={value}
            percentage={+value}
            onPress={onPercentageBoxPress}
          />
        ))}
      </RowContainer>
    </View>
  );
};
