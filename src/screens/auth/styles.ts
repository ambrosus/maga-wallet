import { StyleSheet } from 'react-native';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT / 2.25
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  divider: {
    width: '100%',
    height: 24,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.borderDefault,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0
  },
  dividerLabel: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16
  },
  termsContainer: {
    maxWidth: '75%',
    marginTop: verticalScale(32),
    alignItems: 'center'
  }
});
