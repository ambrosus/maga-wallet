import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgIconProps } from '@types';

export const CopyIcon = ({ color = '#111827', ...props }: SvgIconProps) => (
  <Svg width={12} height={14} fill="none" {...props}>
    <Path
      fill={color}
      d="M2.667 3V1c0-.368.298-.667.666-.667h8c.368 0 .667.299.667.667v9.334a.667.667 0 0 1-.667.666h-2v2c0 .368-.3.667-.671.667H.672A.668.668 0 0 1 0 13l.002-9.333c0-.368.3-.667.67-.667h1.995ZM1.335 4.333l-.002 8H8v-8H1.335ZM4 3h5.333v6.667h1.333v-8H4V3Z"
    />
  </Svg>
);
