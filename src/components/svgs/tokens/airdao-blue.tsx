import { Path, Svg } from 'react-native-svg';
import { SvgIconProps } from '@types';

export const AirdaoBlueIcon = ({ scale = 1 }: Omit<SvgIconProps, 'color'>) => {
  const size = 32;
  return (
    <Svg
      width={size * scale}
      height={size * scale}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <Path
        d="M8.895 2.854a15.242 15.242 0 0122.863 13.2 15.242 15.242 0 01-22.863 13.2 15.242 15.242 0 010-26.4z"
        fill="#3668DD"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7 24.703a.236.236 0 01-.318-.069l-.27-.398a.24.24 0 01.052-.322 10.45 10.45 0 002.197-2.322c2.142-3.13 2.142-7.07 0-10.2a10.449 10.449 0 00-2.197-2.322.24.24 0 01-.052-.323l.27-.398a.236.236 0 01.318-.07l12.003 7.318c.67.408.67 1.381 0 1.79L11.7 24.702z"
        fill="#fff"
      />
    </Svg>
  );
};
