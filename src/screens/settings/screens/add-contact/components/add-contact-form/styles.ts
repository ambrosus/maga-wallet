import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

const BUTTON_HORIZONTAL_PADDING = scale(12);

export const styles = StyleSheet.create({
  main: {
    height: '90%',
    paddingHorizontal: scale(12),
    justifyContent: 'space-between'
  },
  root: {
    margin: scale(16)
  },
  fieldWrapper: {
    padding: scale(12),
    borderRadius: 15,
    backgroundColor: COLORS.neutral200,
    marginBottom: scale(12)
  },
  label: {
    fontWeight: '500',
    marginBottom: scale(4)
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: BUTTON_HORIZONTAL_PADDING,
    zIndex: 10
  },
  input: {
    height: scale(40),
    fontSize: scale(16),
    color: COLORS.textPrimary,
    padding: 0
  }
});
