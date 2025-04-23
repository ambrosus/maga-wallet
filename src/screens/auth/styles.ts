import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  background: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT / 2.75
  }
});
