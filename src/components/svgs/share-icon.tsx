import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import type { SvgIconProps } from '@types';

export const ShareIcon = ({
  color = COLORS.textPrimary,
  scale = 1,
  ...props
}: SvgIconProps) => {
  const width = 16 * scale;
  const height = 16 * scale;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...props}
    >
      <Path
        fill={color}
        d="m8 .155 5.173 5.173-1.179 1.178-3.16-3.16v7.988H7.166V3.346l-3.161 3.16-1.179-1.178L8 .155ZM.5 13V9.667h1.667V13c0 .46.373.834.833.834h10c.46 0 .833-.373.833-.834V9.667H15.5V13a2.5 2.5 0 0 1-2.5 2.5H3A2.5 2.5 0 0 1 .5 13Z"
      />
    </Svg>
  );
};
