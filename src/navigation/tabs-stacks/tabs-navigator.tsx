import { useMemo } from 'react';
import { Text } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { useKeyboardHeight } from '@lib';
import DiscoverStack from '@navigation/tabs/discover/discover-stack';
import HomeStack from '@navigation/tabs/home/home-stack';
import SettingsStack from '@navigation/tabs/settings/setting-stack';
import { TABS_STACK_ROTES } from './routes';
import { TabsParamsList } from './types';

const BottomTabs = createBottomTabNavigator<TabsParamsList>();

export const TabsNavigator = () => {
  const keyboardHeight = useKeyboardHeight();

  const renderTabBarComponent = () => <Text>1</Text>;

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
        initialRouteName={TABS_STACK_ROTES.Home}
        screenOptions={screenOptions}
        tabBar={renderTabBarComponent}
      >
        <BottomTabs.Screen name={TABS_STACK_ROTES.Home} component={HomeStack} />
        <BottomTabs.Screen
          name={TABS_STACK_ROTES.Discover}
          component={DiscoverStack}
        />
        <BottomTabs.Screen
          name={TABS_STACK_ROTES.Settings}
          component={SettingsStack}
        />
      </BottomTabs.Navigator>
    </>
  );
};
