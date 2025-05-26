import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    borderRadius: 16,
    padding: 12
  },
  tokenInfoContainer: {
    gap: 4
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
