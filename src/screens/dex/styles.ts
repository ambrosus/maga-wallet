import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: COLORS.neutral100,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
