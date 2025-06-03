import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  innerDetailsContainer: {
    backgroundColor: COLORS.primary50,
    borderRadius: 16,
    padding: 16,
    gap: 16
  },
  innerDetailsContainerTransparent: {
    borderRadius: 16,
    padding: 16,
    gap: 16
  }
});
