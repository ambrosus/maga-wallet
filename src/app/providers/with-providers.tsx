import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from '@components';
import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <GestureHandlerRootView>
      <SafeContainerProvider>
        <LocalizationProvider>
          <NavigationProvider />
          <Toast />
        </LocalizationProvider>
      </SafeContainerProvider>
    </GestureHandlerRootView>
  );
};
