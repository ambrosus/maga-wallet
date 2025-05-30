import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

const COMMON_STYLES = {
  center: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const
  } as ViewStyle,
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12)
  } as ViewStyle
};

export const styles = StyleSheet.create({
  wrapper: {
    ...COMMON_STYLES.center,
    position: 'relative'
  },
  logoWrapper: {
    ...COMMON_STYLES.center,
    ...COMMON_STYLES.card,
    position: 'absolute',
    padding: scale(5)
  }
});
