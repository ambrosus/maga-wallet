import { DefaultTheme } from '@react-navigation/native';
import { COLORS } from './colors';

export const appTheme: ReactNavigation.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
} as const;
