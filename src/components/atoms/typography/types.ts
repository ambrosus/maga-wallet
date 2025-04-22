import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type FontFamily = 'Onest500Medium' | 'Onest600SemiBold';

export type FontWeight = '500' | '600';

export type TextProps = {
  style?: StyleProp<TextStyle>;
  color?: string;
  fontSize?: number;
  opacity?: number;
  children?: ReactNode;
  fontWeight?: FontWeight;
  fontFamily?: FontFamily;
  align?: TextStyle['textAlign'];
  onPress?: () => unknown;
  testID?: string;
  numberOfLines?: number;
  letterSpacing?: number;
};
