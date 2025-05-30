import Svg, { G, Path, Defs } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const AppLogo = ({
  scale = 1,
  testID,
  color = COLORS.primary500
}: SvgIconProps) => {
  const width = 40 * scale;
  const height = 40 * scale;

  return (
    <Svg width={width} height={height} fill="none" testID={testID}>
      <G filter="url(#a)">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M12 3a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V11a8 8 0 0 0-8-8H12Zm-.962 7.98a.256.256 0 0 0-.076.347l8.052 13.095c.45.73 1.52.73 1.97 0l8.051-13.095a.256.256 0 0 0-.075-.346l-.439-.295a.265.265 0 0 0-.355.057c-.766.97-1.63 1.769-2.555 2.396-3.445 2.337-7.78 2.337-11.225 0a11.455 11.455 0 0 1-2.555-2.396.265.265 0 0 0-.355-.057l-.438.295Zm2.722 9.658a1.42 1.42 0 0 0-.199-.825c-.74-1.234-2.637-.71-2.637.73v5.582a1.234 1.234 0 0 0 2.465.082l.371-5.569Zm12.679-.825a1.42 1.42 0 0 0-.2.825l.372 5.569a1.234 1.234 0 0 0 2.465-.082v-5.581c0-1.44-1.896-1.965-2.637-.73Z"
          clipRule="evenodd"
        />
      </G>
      <Defs />
    </Svg>
  );
};
