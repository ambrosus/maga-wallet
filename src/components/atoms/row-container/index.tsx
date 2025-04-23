import { JSX, ReactNode, Ref } from 'react';
import { View, ViewStyle } from 'react-native';

interface RowProps {
  style?: ViewStyle;
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  width?: ViewStyle['width'];
  flex?: ViewStyle['flex'];
  children?: ReactNode;
  testID?: string;
  gap?: number;
  ref?: Ref<any>;
}

export const RowContainer = ({
  alignItems,
  justifyContent,
  flex,
  width,
  style = {},
  testID,
  gap,
  children,
  ref
}: RowProps): JSX.Element => {
  const styles: ViewStyle = {
    ...style,
    alignItems,
    justifyContent,
    flex,
    gap,
    flexDirection: 'row',
    width
  };
  return (
    <View style={styles} testID={testID} ref={ref}>
      {children}
    </View>
  );
};
