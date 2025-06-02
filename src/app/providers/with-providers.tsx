import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from '@components/molecules';
import { FLEX_FULL_SIZE } from '@constants';
import { QRScannerProvider } from '@contexts/qr-scanner';
import { SwapContextProvider } from '@core/dex/context';
import { ApolloClientProvider } from './apollo-client';
import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { TanstackQueryClientProvider } from './query-client';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <GestureHandlerRootView style={FLEX_FULL_SIZE}>
      <SafeContainerProvider>
        <LocalizationProvider>
          <TanstackQueryClientProvider>
            <ApolloClientProvider>
              <SwapContextProvider>
                <QRScannerProvider>
                  <BottomSheetModalProvider>
                    <NavigationProvider />
                    <Toast />
                  </BottomSheetModalProvider>
                </QRScannerProvider>
              </SwapContextProvider>
            </ApolloClientProvider>
          </TanstackQueryClientProvider>
        </LocalizationProvider>
      </SafeContainerProvider>
    </GestureHandlerRootView>
  );
};
