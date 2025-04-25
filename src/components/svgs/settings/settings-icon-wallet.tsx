import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconWallet = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 18 * scale;
  const height = 16 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M.67 5.5h15.834c.46 0 .833.373.833.833v8.334c0 .46-.373.833-.833.833h-15a.833.833 0 0 1-.833-.833V5.5Zm.834-5h12.5v3.333H.671v-2.5c0-.46.373-.833.833-.833Zm10 9.167v1.666h2.5V9.667h-2.5Z"
      />
    </Svg>
  );
};
