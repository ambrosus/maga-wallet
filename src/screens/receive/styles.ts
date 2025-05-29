import { StyleSheet } from 'react-native';
import { scale } from '@utils';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(16)
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(8)
  },
  userInfoList: {
    width: '100%',
    flexDirection: 'column',
    gap: scale(12)
  },
  supportedTokensContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: scale(12)
  }
});
