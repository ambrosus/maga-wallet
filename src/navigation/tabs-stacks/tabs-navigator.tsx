import { useCallback, useMemo } from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { useKeyboardHeight } from '@lib';
import TabBar from '@navigation/components/tab-bar';
import DiscoverStack from '@navigation/tabs/discover/discover-stack';
import HomeStack from '@navigation/tabs/home/home-stack';
import SettingsStack from '@navigation/tabs/settings/setting-stack';
import { TABS_STACK_ROUTES } from './routes';
import { TabsParamsList } from './types';

const BottomTabs = createBottomTabNavigator<TabsParamsList>();

export const TabsNavigator = () => {
  const keyboardHeight = useKeyboardHeight();

  const renderTabBarComponent = useCallback((props: BottomTabBarProps) => {
    return <TabBar {...props} />;
  }, []);

  const screenOptions: BottomTabNavigationOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarStyle: { display: keyboardHeight > 0 ? 'none' : 'flex' }
    }),
    [keyboardHeight]
  );

  return (
    <>
      <BottomTabs.Navigator
        initialRouteName={TABS_STACK_ROUTES.Home}
        screenOptions={screenOptions}
        tabBar={renderTabBarComponent}
      >
        <BottomTabs.Screen
          name={TABS_STACK_ROUTES.Home}
          component={HomeStack}
        />
        <BottomTabs.Screen
          name={TABS_STACK_ROUTES.Discover}
          component={DiscoverStack}
        />
        <BottomTabs.Screen
          name={TABS_STACK_ROUTES.Settings}
          component={SettingsStack}
        />
      </BottomTabs.Navigator>
    </>
  );
};
