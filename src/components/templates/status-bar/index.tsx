import { StatusBar as RNStatusBar } from 'react-native';
import { COLORS } from '@constants';

export const StatusBar = () => {
  return <RNStatusBar barStyle="dark-content" backgroundColor={COLORS.white} />;
};
