import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(16)
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary500,
    borderRadius: 56,
    paddingVertical: 8,
    paddingHorizontal: 12
  }
});
