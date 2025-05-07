import { Path, Svg } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

interface CheckboxCircleProps extends SvgIconProps {
  isFill?: boolean;
}

export function CheckboxCircle({
  scale = 1,
  color = COLORS.primary600,
  isFill = false
}: CheckboxCircleProps) {
  const size = 21;
  const scaled = size * scale;
  return (
    <Svg
      width={scaled}
      height={scaled}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
    >
      {isFill ? (
        <Path
          fill={color}
          d="M10.63 19.06a8.333 8.333 0 110-16.666 8.333 8.333 0 010 16.666zm-.832-5l5.893-5.892-1.179-1.179-4.714 4.714-2.357-2.357-1.178 1.179 3.535 3.535z"
        ></Path>
      ) : (
        <Path
          fill={color}
          d="M1.833 9a6.667 6.667 0 1 1 13.333 0A6.667 6.667 0 0 1 1.833 9ZM8.5.667a8.333 8.333 0 1 0 0 16.667A8.333 8.333 0 0 0 8.5.667Zm4.547 6.214L11.87 5.703 7.667 9.905 5.338 7.578 4.161 8.756l3.506 3.506 5.38-5.38Z"
        />
      )}
    </Svg>
  );
}
