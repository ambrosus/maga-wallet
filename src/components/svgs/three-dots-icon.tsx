import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import type { SvgIconProps } from '@types';

// Define specific props for ThreeDotsIcon, extending SvgIconProps
interface ThreeDotsIconProps extends SvgIconProps {
  orientation?: 'horizontal' | 'vertical';
}

export const ThreeDotsIcon = ({
  color = COLORS.textPrimary,
  scale = 1, // Default scale to 1
  orientation = 'vertical', // Default orientation to vertical
  ...props
}: ThreeDotsIconProps) => {
  const isVertical = orientation === 'vertical';

  const baseWidth = 4;
  const baseHeight = 16;

  // Determine actual width and height based on orientation and scale
  const actualWidth = (isVertical ? baseWidth : baseHeight) * scale;
  const actualHeight = (isVertical ? baseHeight : baseWidth) * scale;

  // Determine path transform for rotation if horizontal
  // Rotate around the center of the 4x16 viewBox (2, 8)
  const pathTransform = isVertical ? undefined : 'rotate(90 2 8)';

  return (
    <Svg
      width={actualWidth}
      height={actualHeight}
      viewBox={`0 0 ${baseWidth} ${baseHeight}`} // Path is always drawn in 4x16 coordinate system
      fill="none"
      {...props}
    >
      <Path
        fill={color}
        d="M2 .5C1.083.5.333 1.25.333 2.167c0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666C3.667 1.25 2.917.5 2 .5Zm0 11.667c-.917 0-1.667.75-1.667 1.666 0 .917.75 1.667 1.667 1.667s1.667-.75 1.667-1.667c0-.916-.75-1.666-1.667-1.666Zm0-5.834C1.083 6.333.333 7.083.333 8S1.083 9.667 2 9.667 3.667 8.917 3.667 8 2.917 6.333 2 6.333Z"
        transform={pathTransform} // Apply rotation here
      />
    </Svg>
  );
};
