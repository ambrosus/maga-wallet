import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import type { SvgIconProps } from '@types';

export const EditIcon = ({
  color = COLORS.textPrimary,
  scale = 1,
  ...props
}: SvgIconProps) => {
  const width = 16 * scale;
  const height = 18 * scale;

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
        d="M4.036 13.997H.5v-3.535l9.53-9.53a.833.833 0 0 1 1.178 0l2.357 2.358a.833.833 0 0 1 0 1.178l-9.53 9.53ZM.5 15.664h15v1.667H.5v-1.667Z"
      />
    </Svg>
  );
};
