import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  walletItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    marginVertical: scale(4),
    borderRadius: scale(8),
    backgroundColor: COLORS.neutral100,
    height: scale(60)
  },
  balanceText: {
    color: COLORS.textSecondary,
    fontSize: scale(12)
  }
});
