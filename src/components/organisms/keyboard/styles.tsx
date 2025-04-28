import { StyleSheet } from 'react-native';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.4,
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    margin: 5,
    height: DEVICE_HEIGHT * 0.08
  },
  btnText: {
    fontSize: scale(25),
    color: COLORS.textPrimary
  }
});
