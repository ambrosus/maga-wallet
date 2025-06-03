import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    padding: scale(16)
  },
  contactItem: {
    padding: scale(16),
    backgroundColor: COLORS.neutral200,
    borderRadius: scale(12),
    marginBottom: scale(12)
  }
});
