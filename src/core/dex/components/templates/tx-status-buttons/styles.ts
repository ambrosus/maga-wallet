import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { verticalScale } from '@utils';

export const styles = StyleSheet.create({
  successButton: {
    width: '100%',
    height: 50,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary
  },
  container: {
    width: '100%',
    gap: verticalScale(24)
  },
  errorPrimaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary500
  },
  errorSecondaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary100
  }
});
