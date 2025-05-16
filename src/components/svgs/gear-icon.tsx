import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const GearIcon = ({
  scale = 1,
  color = COLORS.neutral500
}: SvgIconProps) => {
  const width = 20 * scale;
  const height = 20 * scale;
  return (
    <Svg width={width} height={height}>
      <Path
        fill={color}
        d="M7.954.21a9.99 9.99 0 0 1 4.09-.002A3.993 3.993 0 0 0 14 3.07a3.992 3.992 0 0 0 3.457.261A9.988 9.988 0 0 1 19.5 6.877 3.992 3.992 0 0 0 18 9.999c0 1.264.586 2.391 1.501 3.124a10.042 10.042 0 0 1-2.045 3.543 3.992 3.992 0 0 0-3.456.261 3.993 3.993 0 0 0-1.955 2.86 9.99 9.99 0 0 1-4.09.004A3.993 3.993 0 0 0 6 16.927a3.992 3.992 0 0 0-3.457-.26A9.99 9.99 0 0 1 .5 13.121 3.992 3.992 0 0 0 2 9.999C2 8.735 1.413 7.61.498 6.875a10.043 10.043 0 0 1 2.045-3.542A3.993 3.993 0 0 0 6 3.07 3.993 3.993 0 0 0 7.954.211ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
    </Svg>
  );
};
