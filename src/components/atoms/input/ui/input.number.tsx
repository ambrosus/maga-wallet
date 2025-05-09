import { forwardRef } from 'react';
import { COLORS } from '@constants';
import { StringUtils } from '@utils';
import { TextInput } from './input.text';
import { InputProps, InputRef } from '../types';

export const NumberInput = forwardRef<InputRef, InputProps>((props, ref) => {
  const { value, style = {}, onChangeValue, ...restProps } = props;
  const styles = [{ color: COLORS.black, padding: 0 }, style];

  const onChangeText = (text: string) => {
    if (typeof onChangeValue === 'function') {
      onChangeValue(StringUtils.formatNumberInput(text));
    }
  };

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      style={styles}
      keyboardType="numeric"
      {...restProps}
    />
  );
});
