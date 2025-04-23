import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from '@types';

export const XIcon = ({ scale = 1 }: SvgIconProps) => {
  const size = 28 * scale;

  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M20.6353 3.57294L14.8058 10.2366L9.76552 3.57294H2.46549L11.1879 14.9785L2.92108 24.4271H6.46094L12.8413 17.1367L18.4173 24.4271H25.5366L16.4442 12.4066L24.1731 3.57294H20.6353ZM19.3937 22.3096L6.59675 5.57922H8.70036L21.354 22.3096H19.3937Z"
        fill="black"
      />
    </Svg>
  );
};
