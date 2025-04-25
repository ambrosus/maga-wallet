import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  menuItem: {
    justifyContent: 'center',
    height: scale(64)
  },
  menuItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    justifyContent: 'space-between'
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemSeperator: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderDefault
  }
});
