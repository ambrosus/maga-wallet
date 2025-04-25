import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: scale(7)
  },
  arrowContainer: {
    position: 'absolute',
    left: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
