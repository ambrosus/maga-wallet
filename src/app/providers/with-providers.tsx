import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from '@components/molecules';
import { SwapContextProvider } from '@core/dex/context';
import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

export const WrappedAppWithProviders = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
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
