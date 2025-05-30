import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral100,
    borderRadius: 14,
    justifyContent: 'flex-start',
    padding: scale(8)
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  copyButton: {
    borderRadius: 6,
    padding: scale(6),
    backgroundColor: COLORS.neutral200
  }
});
