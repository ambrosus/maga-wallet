import { StyleSheet } from 'react-native';
import { isAndroid } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: scale(16),
    justifyContent: 'space-between'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    paddingTop: isAndroid ? '35%' : '30%'
  },
  description: {
    maxWidth: '75%'
  }
});
