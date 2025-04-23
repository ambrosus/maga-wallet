import { NavigationProvider } from './navigation';
import { SafeContainerProvider } from './safe-area';

export const WrappedAppWithProviders = () => {
  return (
    <SafeContainerProvider>
      <NavigationProvider />
    </SafeContainerProvider>
  );
};
