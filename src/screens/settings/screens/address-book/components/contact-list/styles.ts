import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(16)
  },
  contentContainer: {
    backgroundColor: COLORS.neutral100,
    borderRadius: 16
  },
  row: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    borderColor: COLORS.neutral300,
    borderBottomWidth: 0
  },
  name: {
    fontSize: scale(16),
    color: COLORS.textPrimary
  },
  address: {
    fontSize: scale(10),
    color: COLORS.textSecondary
  },
  actionButton: {
    paddingRight: scale(5),
    paddingLeft: scale(10)
  }
});
