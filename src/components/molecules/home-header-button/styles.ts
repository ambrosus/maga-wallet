import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral100,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: 10
  }
});
