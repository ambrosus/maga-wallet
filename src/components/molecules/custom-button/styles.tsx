import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: scale(50),
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary500
  },
  disabled: {
    borderWidth: 1,
    borderColor: COLORS.primary100
  }
});
