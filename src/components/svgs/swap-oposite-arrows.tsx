import Svg, { Path } from 'react-native-svg';
import { ArrowOrientation, ArrowPosition, COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SwapOppositeArrowsIcon = ({
  scale = 1,
  color = COLORS.neutral500,
  orientation = 'down'
}: SvgIconProps & { orientation?: ArrowOrientation }) => {
  const size = 32 * scale;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{ transform: [{ rotate: `${ArrowPosition[orientation]}deg` }] }}
    >
      <Path
        d="M17.4283 12.5001L11.25 18.6784V1.66678L12.9167 1.66678V14.6551L16.25 11.3218L17.4283 12.5001ZM8.75001 18.3334H7.08335L7.08335 5.34511L3.75001 8.67844L2.57168 7.50011L8.75001 1.32178L8.75001 18.3334Z"
        fill={color}
      />
    </Svg>
  );
};
