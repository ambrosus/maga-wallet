import { Children, useCallback } from 'react';
import { View } from 'react-native';
import { PercentPressableContainer, RowContainer } from '@components/atoms';
import { SettingsInputWithLabel } from '@core/dex/components/molecules';
import { SettingsKeys } from '@core/dex/types';
import { styles } from './styles';

interface SettingsSlippageFormProps {
  slippageTolerance: string;
  setSlippageTolerance: (sKey: SettingsKeys, value: string) => void;
}

const SLIPPAGE_TOLERANCE_OPTIONS = [0.1, 0.5, 1];

export const SettingsSlippageForm = ({
  slippageTolerance,
  setSlippageTolerance
}: SettingsSlippageFormProps) => {
  const onChangeSlippageToleranceHandle = useCallback(
    (value: string) => {
      setSlippageTolerance('slippageTolerance', value);
    },
    [setSlippageTolerance]
  );

  const onPresetSlippageToleranceHandle = useCallback(
    (value: number) => {
      if (value.toString().includes('.')) {
        const newValue = value + '0';
        return setSlippageTolerance('slippageTolerance', String(newValue));
      }

      const newValue = value + '.00';
      return setSlippageTolerance('slippageTolerance', String(newValue));
    },
    [setSlippageTolerance]
  );

  return (
    <View style={styles.container}>
      <SettingsInputWithLabel
        label="%"
        heading="Slippage Tolerance"
        placeholder="Custom"
        value={slippageTolerance}
        onChangeText={onChangeSlippageToleranceHandle}
      />

      <RowContainer alignItems="center" gap={10}>
        {Children.toArray(
          SLIPPAGE_TOLERANCE_OPTIONS.map((value, index) => (
            <PercentPressableContainer
              key={index}
              value={value}
              onPress={onPresetSlippageToleranceHandle}
              style={styles.pressableContainer}
              typographyStyle={styles.typography}
            />
          ))
        )}
      </RowContainer>
    </View>
  );
};
