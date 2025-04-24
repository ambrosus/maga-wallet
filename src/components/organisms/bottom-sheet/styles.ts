import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  indicator: {
    width: 41.5,
    backgroundColor: COLORS.borderDefault
  },
  container: {
    paddingHorizontal: scale(12)
  }
});
