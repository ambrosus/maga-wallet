import { StyleSheet } from 'react-native';
import { COLORS, isAndroid } from '@constants';
import { scale, verticalScale } from '@utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: scale(16),
    justifyContent: 'space-between'
  },
  header: {
    paddingTop: isAndroid ? '35%' : '30%'
  },
  description: {
    maxWidth: '75%'
  },
  benefitsContainer: {
    marginTop: verticalScale(48)
  },
  footer: {
    gap: 20
  },
  cancelButton: {
    width: '100%',
    height: 50,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderDefault
  }
});
