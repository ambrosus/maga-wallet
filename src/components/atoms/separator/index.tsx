import { View } from 'react-native';
import { COLORS } from '@constants';

interface SeparatorModel {
  color?: string;
  width?: number;
}

export const Separator = ({
  color = COLORS.neutral500,
  width = 1
}: SeparatorModel) => {
  return <View style={{ borderWidth: width, borderColor: color }} />;
};
