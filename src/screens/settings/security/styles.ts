import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  main: { paddingHorizontal: scale(15), marginTop: scale(20) },
  wrapper: { backgroundColor: COLORS.borderDefault, borderRadius: 15 },
  border: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral300
  },
  securityItem: {
    paddingHorizontal: scale(15),
    height: scale(64),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  securityItemWrapper: { flex: 1 },
  toogleSwitcher: { width: scale(51), height: scale(31) }
});
