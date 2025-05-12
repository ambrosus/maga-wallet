import { JSX } from 'react';
import { Keyboard, View, ViewProps } from 'react-native';

export const KeyboardDismissingView = (
  props: ViewProps & { disabled?: boolean }
): JSX.Element => {
  const keyboardDismissProps = props.disabled
    ? {}
    : {
        onStartShouldSetResponder: () => true,
        onResponderRelease: () => Keyboard.dismiss()
      };
  return <View {...keyboardDismissProps} {...props} />;
};
