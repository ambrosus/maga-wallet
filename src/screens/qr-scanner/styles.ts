import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: DEVICE_HEIGHT,
    position: 'relative'
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 99999
  },
  camera: {
    flex: 1
  }
});
