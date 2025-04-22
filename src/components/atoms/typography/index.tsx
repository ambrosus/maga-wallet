import { PropsWithChildren, useCallback, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, FONTS } from '@constants';
import {
  DEFAULT_FONT_SIZE,
  fontSizeMapping,
  fontWeightMapping
} from '@constants/ui/typography';
import { FontSizeKey, TextProps } from './types';

export const Typography = ({
  style: propsStyle,
  color = COLORS.neutral500,
  fontSize,
  opacity = 1,
  fontWeight = 'normal',
  align = 'auto',
  fontFamily = 'Onest500Medium',
  testID,
  letterSpacing = 0,
  children,
  ...restProps
}: TextProps & PropsWithChildren) => {
  const getFontSize = useCallback((): number => {
    if (fontSize) return fontSize;
    const fontSizeKeys: FontSizeKey[] = Object.keys(restProps || {}).filter(
      (key) => key in FontSizeKey
    ) as FontSizeKey[];
    // Return default font size if none of the font size keys are provided
    if (fontSizeKeys.length === 0) return DEFAULT_FONT_SIZE;
    // Prioritize last key
    return fontSizeMapping[fontSizeKeys[fontSizeKeys.length - 1]];
  }, [fontSize, restProps]);

  const getFontWeight = useCallback((): TextStyle['fontWeight'] => {
    return fontWeightMapping[fontWeight];
  }, [fontWeight]);

  const styles: TextStyle = useMemo(
    () => ({
      fontFamily: FONTS[fontFamily],
      color,
      textAlign: align,
      opacity,
      letterSpacing,
      fontSize: getFontSize(),
      fontWeight: getFontWeight()
    }),
    [
      align,
      color,
      fontFamily,
      getFontSize,
      getFontWeight,
      letterSpacing,
      opacity
    ]
  );

  return (
    <Text testID={testID} style={[styles, propsStyle]} {...restProps}>
      {children}
    </Text>
  );
};
