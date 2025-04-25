import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconProfile = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 18 * scale;
  const height = 19 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M2.333.667A.833.833 0 0 0 1.5 1.5v1.667h1.667v1.667h-2.5V6.5h2.5v1.667h-2.5v1.667h2.5V11.5h-2.5v1.667h2.5v1.667H1.5V16.5c0 .46.373.834.833.834h13.334c.46 0 .833-.373.833-.834v-15a.833.833 0 0 0-.833-.833H2.333ZM6.5 12.334a2.5 2.5 0 1 1 5 0h-5ZM9 9a1.667 1.667 0 1 1 0-3.333A1.667 1.667 0 0 1 9 9Z"
      />
    </Svg>
  );
};
