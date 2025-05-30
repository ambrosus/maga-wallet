import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(6),
    position: 'relative',
    flex: 1
  },

  listWrapper: {
    width: '100%'
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    height: scale(50)
  },
  walletItem: {
    height: scale(60),
    paddingHorizontal: scale(16),
    marginVertical: verticalScale(4),
    borderRadius: scale(8),
    backgroundColor: COLORS.neutral100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  balanceText: {
    marginTop: verticalScale(4),
    fontSize: 12,
    color: COLORS.neutral600
  }
});
