import { View } from 'react-native';
import { COLORS } from '@constants';

interface SeparatorProps {
  color?: string;
  width?: number;
}

export const Separator = ({
  color = COLORS.neutral500,
  width = 1
}: SeparatorProps) => {
  return <View style={{ borderWidth: width, borderColor: color }} />;
};
