import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  menuItemContainer: {
    marginHorizontal: scale(15),
    borderRadius: 15,
    backgroundColor: COLORS.neutral100
  }
});
