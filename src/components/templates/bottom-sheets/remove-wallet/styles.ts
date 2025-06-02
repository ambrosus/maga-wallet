import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  contentWrapper: {
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(16)
  },
  buttonsRowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(24)
  },
  buttonStyle: {
    flex: 1
  },
  secondaryButton: {
    marginRight: scale(8)
  },
  primaryButton: {
    marginLeft: scale(8),
    backgroundColor: COLORS.destructive500
  }
});
