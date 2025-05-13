import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from '@types';

export const InfoIcon = ({ scale = 1, color = '#FF4747' }: SvgIconProps) => {
  const size = 88;

  return (
    <Svg
      width={size * scale}
      height={size * scale}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
    >
      <Path
        d="M44 7.33c20.253 0 36.672 16.419 36.672 36.672 0 20.254-16.419 36.672-36.672 36.672-20.254 0-36.672-16.418-36.672-36.672C7.328 23.748 23.746 7.33 44 7.33zm0 5.5c-17.216 0-31.172 13.956-31.172 31.172S26.784 75.174 44 75.174s31.172-13.956 31.172-31.172S61.216 12.83 44 12.83zm-.014 25.668a2.75 2.75 0 012.727 2.376l.025.373.014 20.172a2.75 2.75 0 01-5.475.377l-.026-.373-.013-20.173a2.75 2.75 0 012.748-2.752zm.016-12.825a3.662 3.662 0 110 7.324 3.662 3.662 0 010-7.324z"
        fill={color}
      />
    </Svg>
  );
};
