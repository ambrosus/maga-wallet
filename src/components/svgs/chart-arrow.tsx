import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

interface ChartArrowProps extends SvgIconProps {
  orientation: 'up' | 'down';
}

export const ChartArrow = ({
  scale = 1,
  color,
  orientation
}: ChartArrowProps) => {
  const width = scale * 8;
  const height = scale * 8;
  const defaultColor =
    orientation === 'up' ? COLORS.success500 : COLORS.destructive500;

  const pathData =
    orientation === 'down'
      ? 'm.11 0.818.708-.707 5.717 5.717v-2.792h1v4.5h-4.5v-1h2.793L.111 0.818Z'
      : 'm.11 7.182.708.707 5.717-5.717v2.792h1v-4.5h-4.5v1h2.793L.111 7.182Z';

  return (
    <Svg width={width} height={height} fill="none">
      <Path fill={color || defaultColor} d={pathData} />
    </Svg>
  );
};
