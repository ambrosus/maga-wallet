import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

export const styles = StyleSheet.create({
  successDescription: {
    maxWidth: '75%'
  },
  buttonsContainer: {
    width: '100%',
    gap: 16
  },
  saveContactButton: {
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
    borderRadius: 100
  },
  doneButton: {
    width: '100%',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral900,
    borderRadius: 100
  }
});
