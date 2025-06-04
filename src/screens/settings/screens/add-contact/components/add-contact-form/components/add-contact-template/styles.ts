import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  fieldWrapper: {
    padding: scale(12),
    borderRadius: 15,
    backgroundColor: COLORS.neutral200,
    marginBottom: scale(12)
  },
  label: {
    fontWeight: '500',
    marginBottom: scale(4)
  },
  input: {
    height: scale(40),
    fontSize: scale(16),
    color: COLORS.textPrimary,
    padding: 0
  }
});
