import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SwapContextProvider } from '@core/dex/context';
import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <GestureHandlerRootView>
      <SafeContainerProvider>
        <LocalizationProvider>
          <SwapContextProvider>
            <BottomSheetModalProvider>
              <NavigationProvider />
            </BottomSheetModalProvider>
          </SwapContextProvider>
        </LocalizationProvider>
      </SafeContainerProvider>
    </GestureHandlerRootView>
  );
};
