import { useCallback, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native';
import { RouterProvider } from '@contexts/navigation';

export const NavigationProvider = () => {
  const [route, setRoute] = useState('SplashScreen');

  const navigationRouteRef = useRef<NavigationContainerRef<any>>(null);
  const routeNameRef = useRef<string>('');

  const onNavigationReady = useCallback(() => {
    const currentRoute = navigationRouteRef.current?.getCurrentRoute();

    if (currentRoute) {
      routeNameRef.current = currentRoute.name;
    }
  }, []);

  const onNavigationStateChange = useCallback(() => {
    const currentRoute = navigationRouteRef.current?.getCurrentRoute();

    if (currentRoute && routeNameRef.current !== currentRoute.name) {
      routeNameRef.current = currentRoute.name;
      setRoute(currentRoute.name);
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRouteRef}
      onReady={onNavigationReady}
      onStateChange={onNavigationStateChange}
    >
      <RouterProvider route={route}>
        <StatusBar />
      </RouterProvider>
    </NavigationContainer>
  );
};
