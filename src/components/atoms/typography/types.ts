import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export const FontSizeKey = {
  subtext: 'subtext',
  subtitle: 'subtitle',
  title: 'title',
  heading: 'heading'
} as const;

export type FontSizeKey = (typeof FontSizeKey)[keyof typeof FontSizeKey];

export type FontFamily = 'Onest500Medium' | 'Onset600SemiBold';

export type FontWeight =
  | 'normal'
  | 'semi-bold'
  | 'bold'
  | 'bolder'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type FontSizeProps = {
  [key in FontSizeKey]?: boolean;
};

export type TextProps = FontSizeProps & {
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
