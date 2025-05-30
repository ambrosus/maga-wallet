import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DEXScreen, SendFundsScreen } from '@screens';
import {
  DexReviewSwapScreen,
  DexSettingsScreen,
  DexTxStatusScreen
} from '@screens/dex/screens';
import { HomeScreen } from '@screens/home';
import {
  SendFundsReceiptScreen,
  SendFundsReviewScreen
} from '@screens/send-funds/screens';
import { ReceiveScreen } from '@screens/receive';
import { HOME_STACK_ROUTES, HomeTabParamsList } from './types';

export const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeTabParamsList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName={HOME_STACK_ROUTES.HomeScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={HOME_STACK_ROUTES.HomeScreen}
          component={HomeScreen}
        />
        <Stack.Group>
          <Stack.Screen
            name={HOME_STACK_ROUTES.DEXScreen}
            component={DEXScreen}
            options={{
              animation: 'slide_from_bottom'
            }}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.DexReviewSwapScreen}
            component={DexReviewSwapScreen}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.DexSettingsScreen}
            component={DexSettingsScreen}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.DexTxStatusScreen}
            component={DexTxStatusScreen}
            options={{
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.ReceiveScreen}
            component={ReceiveScreen}
            options={{
              animation: 'slide_from_bottom'
            }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name={HOME_STACK_ROUTES.SendFundsScreen}
            component={SendFundsScreen}
            options={{
              animation: 'slide_from_bottom'
            }}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.SendFundsReceiptScreen}
            component={SendFundsReceiptScreen}
          />
          <Stack.Screen
            name={HOME_STACK_ROUTES.SendFundsReviewScreen}
            component={SendFundsReviewScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
