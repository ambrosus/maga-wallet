import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT } from '@constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: DEVICE_HEIGHT,
    position: 'relative'
  },
  camera: {
    flex: 1
  }
});
