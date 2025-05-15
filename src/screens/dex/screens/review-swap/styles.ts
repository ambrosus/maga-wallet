import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { moderateScale, scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16),
    justifyContent: 'space-between'
  },
  heading: {
    textAlign: 'center'
  },
  preview: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: COLORS.primary50,
    padding: 16,
    borderRadius: moderateScale(16)
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.neutral200,
    alignSelf: 'center'
  },
  actionsContainer: {
    height: 48
  }
});
