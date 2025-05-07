import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { moderateScale, scale } from '@utils';

export const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: moderateScale(8),
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  statusIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    marginRight: scale(14),
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtn: {
    alignSelf: 'center',
    marginLeft: scale(14)
  }
});
