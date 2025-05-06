import { PropsWithChildren, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { verticalScale } from '@utils';

type SafeViewContainerProps = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren &
  Omit<SafeAreaViewProps, 'style'>;

export const SafeViewContainer = ({
  children,
  style,
  ...restProps
}: SafeViewContainerProps) => {
  const { bottom } = useSafeAreaInsets();

  const styles: StyleProp<ViewStyle> = useMemo(
    () => [
      style
        ? [style, { paddingBottom: bottom === 0 ? verticalScale(24) : 0 }]
        : {
            flex: 1,
            paddingBottom: bottom === 0 ? verticalScale(24) : 0
          }
    ],
    [bottom, style]
  );

  return (
    <SafeAreaView style={styles} {...restProps}>
      {children}
    </SafeAreaView>
  );
};
