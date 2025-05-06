import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    height: '100%'
  },
  centerAling: { alignItems: 'center' },
  image: { width: 184, height: 184 },
  codeContainer: {
    width: '100%',
    paddingHorizontal: '5%'
  },
  codeWrapper: {
    backgroundColor: COLORS.neutral200,
    padding: scale(15),
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between'
  }
});
