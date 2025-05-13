import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  otpWrapper: {
    width: '100%',
    marginTop: scale(32),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  otpContainer: {
    borderWidth: 1,
    borderRadius: 8,
    width: scale(40),
    height: scale(48),
    marginHorizontal: scale(4),
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  otpText: {
    color: COLORS.textPrimary,
    fontSize: scale(24)
  },

  errorText: { marginTop: scale(12) }
});
