import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const DiscoverIcon = ({
  scale = 1,
  color = COLORS.neutral500
}: SvgIconProps) => {
  const width = 24 * scale;
  const height = 24 * scale;
  return (
    <Svg width={width} height={height} fill={color}>
      <Path
        fill={color}
        d="M12.5 23.666C6.057 23.666.833 18.443.833 12 .833 5.556 6.057.333 12.5.333S24.167 5.556 24.167 12c0 6.443-5.224 11.666-11.667 11.666Zm0-2.333A9.333 9.333 0 0 0 21.833 12a9.333 9.333 0 1 0-18.666 0 9.333 9.333 0 0 0 9.333 9.333Zm4.083-13.417L14.25 13.75l-5.833 2.333 2.333-5.833 5.833-2.334Z"
      />
    </Svg>
  );
};
