import Svg, { Circle, Path } from 'react-native-svg';
import { SvgIconProps } from '@types';

export const FailedIconWrapped = ({ scale = 1 }: SvgIconProps) => {
  const size = 130 * scale;

  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 133 133">
      <Circle cx="66.5" cy="66.5" r="64.125" fill="#FECACA"></Circle>
      <Circle cx="66.5" cy="66.5" r="44.333" fill="#FEE2E2"></Circle>
      <Path
        fill="#EF4444"
        d="M66.5 98.167c-17.489 0-31.666-14.178-31.666-31.667S49.01 34.834 66.5 34.834 98.167 49.01 98.167 66.5 83.989 98.167 66.5 98.167m0-36.145-8.956-8.957-4.479 4.479 8.957 8.956-8.957 8.957 4.479 4.478 8.956-8.957 8.957 8.957 4.478-4.478-8.957-8.957 8.957-8.956-4.478-4.479z"
      ></Path>
    </Svg>
  );
};
