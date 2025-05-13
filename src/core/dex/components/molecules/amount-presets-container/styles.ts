import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, FONTS } from '@constants';
import { moderateScale, scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    width: scale(75),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderRadius: moderateScale(56),
    borderColor: COLORS.neutral200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typography: {
    fontSize: FONT_SIZE.body.sm,
    fontFamily: FONTS.Onest500Medium,
    color: COLORS.neutral700
  }
});
