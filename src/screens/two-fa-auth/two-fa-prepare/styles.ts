import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    height: '100%'
  },
  centerAling: { alignItems: 'center' },
  image: { width: 184, height: 184 }
});
