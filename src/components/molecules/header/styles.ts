import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale, verticalScale } from '@utils';

const leftPadding = scale(16);
const rightPadding = scale(16);

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: scale(7)
  },
  arrowContainer: {
    position: 'absolute',
    left: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: scale(40)
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: verticalScale(48),
    minHeight: 56,
    paddingLeft: leftPadding,
    paddingRight: rightPadding
  },
  containerBorder: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neutral100
  },
  left: {
    position: 'absolute',
    zIndex: 1000,
    left: leftPadding
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  right: {
    zIndex: 1000,
    position: 'absolute',
    right: rightPadding
  },
  titleOnLeft: {
    marginLeft: scale(20)
  }
});
