import { ReactNode, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback
} from 'react-native';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { INITIAL_SLIPPAGE_TOLERANCE } from '@core/dex/context/initials';
import { SwapStringUtils } from '@core/dex/utils';
import { styles } from './styles';

interface SettingsInputWithLabelProps extends TextInputProps {
  label: string;
  children?: ReactNode;
}

export const SettingsInputWithLabel = ({
  label,
  onChangeText,
  value,
  style,
  placeholder,
  children
}: SettingsInputWithLabelProps) => {
  const inputRef = useRef<TextInput>(null);

  const onInputContainerPress = () => inputRef.current?.focus();

  const onChangeSlippageBlur = useCallback(() => {
    if (typeof onChangeText === 'function') {
      const newValue = SwapStringUtils.transformSlippageOnBlur(value);
      return onChangeText(newValue ?? INITIAL_SLIPPAGE_TOLERANCE);
    }
  }, [onChangeText, value]);

  return (
    <View style={styles.formWithLabel}>
      <Typography
        fontSize={14}
        fontFamily="Onest500Medium"
        color={COLORS.neutral800}
      >
        {label}
      </Typography>

      <TouchableWithoutFeedback onPress={onInputContainerPress}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            maxLength={24}
            style={style}
            placeholder={placeholder}
            keyboardType="numeric"
            value={value}
            onChangeText={onChangeText}
            onBlur={onChangeSlippageBlur}
          />

          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
