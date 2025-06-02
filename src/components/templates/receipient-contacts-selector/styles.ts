import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.borderDefault,
    marginVertical: verticalScale(24)
  },
  paddingContainer: {
    paddingHorizontal: scale(16)
  }
});
