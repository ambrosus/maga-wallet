import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { isSmallScreen, scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    height: isSmallScreen ? '60%' : '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%'
  },
  innerContainer: {
    position: 'relative',
    width: scale(308),
    height: verticalScale(308)
  },
  corner: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderWidth: 9,
    borderColor: COLORS.white
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 9,
    borderLeftWidth: 9,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 24
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 9,
    borderRightWidth: 9,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 24
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 9,
    borderLeftWidth: 9,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 24
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 24
  }
});
