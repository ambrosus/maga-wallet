import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '@utils';

export const useSafeViewController = (bInset = 24) => {
  const insets = useSafeAreaInsets();

  return {
    bottom: verticalScale(insets.bottom === 0 ? bInset : insets.bottom),
    top: insets.top,
    left: insets.left,
    right: insets.right
  };
};
