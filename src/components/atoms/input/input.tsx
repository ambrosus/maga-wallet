import { forwardRef } from 'react';
import { InputProps, InputRef } from './types';
import { NumberInput } from './ui/input.number';
import { TextInput } from './ui/input.text';

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { type, ...restProps } = props;

  switch (type) {
    case 'number':
      return <NumberInput ref={ref} {...restProps} />;
    case 'text': {
      return <TextInput ref={ref} {...restProps} />;
    }
    default: {
      return <TextInput ref={ref} {...restProps} />;
    }
  }
});
