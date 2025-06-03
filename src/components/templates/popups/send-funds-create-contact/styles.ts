import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, COLORS } from '@constants';

export const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH - 32,
    padding: 12,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    gap: 16
  },
  formContainer: {
    width: '100%',
    gap: 16
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.neutral100,
    borderRadius: 12,
    padding: 12
  },
  input: {
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },

  button: {
    flex: 1
  }
});
