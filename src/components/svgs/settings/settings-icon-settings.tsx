import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconSettings = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 20 * scale;
  const height = 20 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M5.142 15a2.501 2.501 0 0 1 4.716 0h8.475v1.667H9.858a2.501 2.501 0 0 1-4.716 0H1.667V15h3.475Zm5-5.833a2.5 2.5 0 0 1 4.716 0h3.475v1.667h-3.475a2.501 2.501 0 0 1-4.716 0H1.667V9.167h8.475Zm-5-5.833a2.501 2.501 0 0 1 4.716 0h8.475V5H9.858a2.501 2.501 0 0 1-4.716 0H1.667V3.334h3.475Z"
      />
    </Svg>
  );
};
