import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconSecurity = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 18 * scale;
  const height = 20 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M13 6.666h1.667c.46 0 .833.373.833.834v10c0 .46-.373.833-.833.833H1.333A.833.833 0 0 1 .5 17.5v-10c0-.46.373-.834.833-.834H3v-.833a5 5 0 1 1 10 0v.833ZM7.167 13.11V15h1.666v-1.89a1.666 1.666 0 1 0-1.666 0Zm4.166-6.444v-.833a3.333 3.333 0 1 0-6.666 0v.833h6.666Z"
      />
    </Svg>
  );
};
