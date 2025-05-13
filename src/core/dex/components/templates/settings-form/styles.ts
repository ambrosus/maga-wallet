import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    gap: verticalScale(32)
  },
  togglersContainer: {
    backgroundColor: COLORS.neutral50,
    borderRadius: scale(16)
  }
});
