import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@components';
import { styles } from './styles';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Typography fontSize={16}>Splash screen</Typography>
    </SafeAreaView>
  );
};
