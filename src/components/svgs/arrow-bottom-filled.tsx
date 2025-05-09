import { Path, Svg } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export function ArrowBottomFilledIcon({
  scale = 1,
  color = COLORS.neutral800
}: SvgIconProps) {
  const size = 24 * scale;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 16L6 10H18L12 16Z" fill={color} />
    </Svg>
  );
}
