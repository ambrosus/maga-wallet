import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconNotification = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 18 * scale;
  const height = 19 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M15.667 13.167h1.666v1.667H.667v-1.667h1.666V7.334a6.667 6.667 0 0 1 13.334 0v5.833ZM6.5 16.5h5v1.667h-5V16.5Z"
      />
    </Svg>
  );
};
