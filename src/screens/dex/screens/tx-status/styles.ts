import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: scale(16),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  description: {
    maxWidth: '70%'
  },
  statusContainer: {
    alignItems: 'center'
  }
});
