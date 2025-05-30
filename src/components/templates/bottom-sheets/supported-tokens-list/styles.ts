import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scale(6),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(8)
  },
  container: {
    paddingHorizontal: scale(16),
    minHeight: '100%'
  },
  listWrapper: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100)
  },
  footer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16)
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: COLORS.primary500,
    borderRadius: 25
  }
});
