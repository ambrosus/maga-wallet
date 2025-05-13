import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { verticalScale } from '@utils';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(80),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: COLORS.neutral100
  },
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral100,
    borderWidth: 4,
    borderColor: COLORS.white,
    borderRadius: 1000,
    transform: [{ rotate: '90deg' }],
    elevation: 2,
    shadowColor: '#C2C5CC',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 99999
  }
});
