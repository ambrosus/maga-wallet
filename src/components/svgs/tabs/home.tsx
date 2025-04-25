import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';
export const HomeIcon = ({
  scale = 1,
  color = COLORS.neutral500
}: SvgIconProps) => {
  const width = 23 * scale;
  const height = 23 * scale;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M13.178 1.134c-.406-.29-.95-.29-1.356 0L.738 9.05l1.357 1.9L12.5 3.516l10.405 7.432 1.356-1.899-11.083-7.916ZM21.345 12.8l-8.167-5.833c-.406-.29-.95-.29-1.356 0L3.655 12.8a1.167 1.167 0 0 0-.488.95v7.583c0 .645.522 1.167 1.166 1.167h16.334c.644 0 1.166-.523 1.166-1.167V13.75c0-.377-.182-.73-.488-.95Z"
      />
    </Svg>
  );
};
