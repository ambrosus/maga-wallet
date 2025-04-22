import { PropsWithChildren, useCallback, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, FONTS } from '@constants';
import { DEFAULT_FONT_SIZE, fontWeightMapping } from './constants';
import { TextProps } from './types';

export const Typography = ({
  style: propsStyle,
  color = COLORS.neutral500,
  fontSize = DEFAULT_FONT_SIZE,
  opacity = 1,
  fontWeight = '600',
  align = 'auto',
  fontFamily = 'Onest500Medium',
  testID,
  letterSpacing = 0,
  children,
  ...restProps
}: TextProps & PropsWithChildren) => {
  const getFontWeight = useCallback((): TextStyle['fontWeight'] => {
    return fontWeightMapping[fontWeight];
  }, [fontWeight]);

  const styles: TextStyle = useMemo(
    () => ({
      fontSize,
      fontFamily: FONTS[fontFamily],
      color,
      textAlign: align,
      opacity,
      letterSpacing,
      fontWeight: getFontWeight()
    }),
    [align, color, fontFamily, fontSize, getFontWeight, letterSpacing, opacity]
  );

  return (
    <Text testID={testID} style={[styles, propsStyle]} {...restProps}>
      {children}
    </Text>
  );
};
