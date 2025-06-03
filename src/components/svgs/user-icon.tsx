import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const UserIcon = ({
  scale = 1,
  color = COLORS.neutral400,
  ...props
}: SvgIconProps) => {
  const width = 43 * scale;
  const height = 49 * scale;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 43 49"
      fill="none"
      {...props}
    >
      <Path
        fill={color}
        d="M21.5 37.105c8.866 0 16.62 3.813 20.837 9.501l-4.459 2.11c-3.432-4.068-9.485-6.77-16.378-6.77-6.894 0-12.946 2.702-16.378 6.77L.664 46.604c4.218-5.687 11.97-9.5 20.836-9.5ZM21.5.79c6.685 0 12.105 5.42 12.105 12.105v7.263c0 6.685-5.42 12.105-12.105 12.105-6.685 0-12.105-5.42-12.105-12.105v-7.263C9.395 6.21 14.815.79 21.5.79Z"
      />
    </Svg>
  );
};
