import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  headerContentMiddle: {
    alignItems: 'center'
  },
  walletSelector: {
    backgroundColor: 'transparent',
    padding: 0
  },
  container: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(30)
  },
  buttonContainer: {
    paddingHorizontal: scale(16)
  }
});
