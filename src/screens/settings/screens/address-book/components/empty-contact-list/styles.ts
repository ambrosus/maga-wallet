import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  root: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: scale(12)
  },
  iconWrapper: {
    alignItems: 'center'
  },
  userIconBg: {
    width: scale(122),
    height: scale(122),
    backgroundColor: COLORS.neutral100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrapper: {
    paddingHorizontal: scale(50)
  }
});
