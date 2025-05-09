import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export type ArrowOrientation = 'up' | 'down' | 'left' | 'right';

interface ArowProps extends SvgIconProps {
  orientation?: ArrowOrientation;
}

export const Arrow = ({
  scale = 1,
  color = COLORS.black,
  orientation = 'right'
}: ArowProps) => {
  const width = 8 * scale;
  const height = 14 * scale;

  let rotation = 0;
  switch (orientation) {
    case 'up':
      rotation = 90;

      break;
    case 'down':
      rotation = -90;
      break;
    case 'left':
      rotation = 0;
      break;
    case 'right':
    default:
      rotation = 180;
  }

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Path
        fill={color}
        d="m2.828 7 4.95 4.95-1.414 1.415L0 7 6.364.637 7.778 2.05 2.828 7Z"
      />
    </Svg>
  );
};
