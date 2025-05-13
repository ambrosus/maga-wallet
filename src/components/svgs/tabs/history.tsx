import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const HistoryIcon = ({
  scale = 1,
  color = COLORS.neutral500,
  testID
}: SvgIconProps) => {
  const width = 25 * scale;
  const height = 24 * scale;
  return (
    <Svg
      testID={testID}
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <Path
        fill={color}
        d="M12.5 23.667C6.057 23.667.833 18.443.833 12S6.057.333 12.5.333 24.167 5.557 24.167 12 18.943 23.667 12.5 23.667Zm0-2.334a9.333 9.333 0 1 0 0-18.666 9.333 9.333 0 1 0 0 18.666ZM13.667 12h4.667v2.333h-7V6.167h2.333V12Z"
      />
    </Svg>
  );
};
