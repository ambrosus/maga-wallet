import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from '@components/molecules';
import { FLEX_FULL_SIZE } from '@constants';
import { SwapContextProvider } from '@core/dex/context';
import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <GestureHandlerRootView style={FLEX_FULL_SIZE}>
      <BottomSheetModalProvider>
        <SafeContainerProvider>
          <LocalizationProvider>
            <SwapContextProvider>
              <NavigationProvider />
              <Toast />
            </SwapContextProvider>
          </LocalizationProvider>
        </SafeContainerProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
