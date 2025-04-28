import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SettingsIconInfo = ({
  scale = 1,
  color = COLORS.neutral900
}: SvgIconProps) => {
  const width = 18 * scale;
  const height = 18 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M9 17.334A8.333 8.333 0 1 1 9 .667a8.333 8.333 0 0 1 0 16.667ZM9 6.917a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.667 4.583h-.834V7.75h-2.5v1.667h.834V11.5h-.834v1.667h3.334V11.5Z"
      />
    </Svg>
  );
};
