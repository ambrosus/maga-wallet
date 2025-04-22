import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashAppIcon } from '@components/svgs';
import { useFakeTimer } from './hooks/use-fake-timer';
import { styles } from './styles';

export const SplashScreen = () => {
  useFakeTimer();
  return (
    <SafeAreaView style={styles.container}>
      <SplashAppIcon testID="splash_icon" />
    </SafeAreaView>
  );
};
