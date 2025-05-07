import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: { paddingHorizontal: scale(25) },
  timerWrapper: {
    width: scale(60),
    alignItems: 'center'
  }
});
