import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: scale(7)
  },
  arrowContainer: {
    zIndex: 1000,
    position: 'absolute',
    left: scale(20),
    height: '100%',
    width: scale(40)
  },
  titleWithArrow: {
    width: '100%',
    textAlign: 'center'
  }
});
