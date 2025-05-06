import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    width: scale(107),
    height: verticalScale(84),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
    borderRadius: 16,
    gap: 8
  }
});
