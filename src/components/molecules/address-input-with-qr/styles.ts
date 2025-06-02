import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, FONTS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    borderRadius: 16,
    padding: 16
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: FONT_SIZE.body.lg,
    fontFamily: FONTS.Onest500Medium,
    color: COLORS.textPrimary,
    paddingLeft: 0,
    textAlign: 'left'
  }
});
