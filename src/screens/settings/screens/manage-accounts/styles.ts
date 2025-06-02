import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/ui';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16)
  },
  listWrapper: {
    overflow: 'hidden',
    height: '82%'
  },
  listContainer: {
    backgroundColor: COLORS.neutral100,
    borderRadius: 20
  },
  walletItemWrapper: {
    marginVertical: 0,
    backgroundColor: 'transparent',
    borderColor: COLORS.neutral800
  },
  rightContentTouchable: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
