import { StyleSheet } from 'react-native';
import { isAndroid } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    paddingHorizontal: scale(16)
  },
  relativeContainer: {
    position: 'relative'
  },
  footer: {
    paddingHorizontal: scale(16),
    paddingBottom: isAndroid ? verticalScale(20) : 0
  }
});
