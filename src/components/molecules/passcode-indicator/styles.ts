import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  circle: {
    width: scale(24),
    height: scale(24),
    borderRadius: 25,
    borderWidth: 2,
    flexDirection: 'row',
    backgroundColor: COLORS.neutral100,
    borderColor: COLORS.neutral300,
    marginHorizontal: scale(18)
  },
  circleFilled: {
    borderWidth: 0,
    width: scale(24),
    height: scale(24),
    backgroundColor: COLORS.primary500
  },
  error: {
    backgroundColor: COLORS.destructive500
  }
});
