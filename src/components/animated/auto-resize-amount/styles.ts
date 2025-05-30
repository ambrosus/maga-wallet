import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',

    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    position: 'relative'
  },
  typography: {
    width: '100%',
    fontFamily: 'Onest600SemiBold',
    color: COLORS.textPrimary,
    textAlign: 'center'
  },
  errorContainer: {
    position: 'absolute',
    bottom: '20%',
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});
