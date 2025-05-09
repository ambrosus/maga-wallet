import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  percentageBox: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    backgroundColor: COLORS.neutral50,
    borderRadius: 1000
  }
});
