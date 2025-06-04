import { View } from 'react-native';
import { COLORS } from '@constants';

interface SeparatorProps {
  color?: string;
  width?: number;
  itemWidth?: number;
  height?: number;
}

export const Separator = ({
  color = COLORS.neutral500,
  width = 1,
  height = 1,
  itemWidth
}: SeparatorProps) => {
  if (itemWidth) {
    return (
      <View
        style={{
          width: itemWidth,
          height,
          backgroundColor: color,
          borderWidth: width,
          borderColor: color
        }}
      />
    );
  }
  return <View style={{ borderWidth: width, borderColor: color }} />;
};
