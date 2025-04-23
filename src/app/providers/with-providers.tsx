import { LocalizationProvider } from './localization';
import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <SafeContainerProvider>
      <LocalizationProvider>
        <NavigationProvider />
      </LocalizationProvider>
    </SafeContainerProvider>
  );
};
