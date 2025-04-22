import { TextStyle as RNTextStyle } from 'react-native';

export const DEFAULT_FONT_SIZE = 16;

export const fontWeightMapping: {
  [key: string]: RNTextStyle['fontWeight'];
} = {
  'medium': '500',
  'semi-bold': '600',
  '500': '500',
  '600': '600'
};
