import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  indicator: {
    width: 41.5,
    backgroundColor: COLORS.borderDefault
  },
  indicatorHidden: {
    width: 0,
    height: 0
  },
  container: {
    paddingHorizontal: scale(12)
  },
  background: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  }
});
