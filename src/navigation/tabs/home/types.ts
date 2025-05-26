import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SwapToken } from '@core/dex/types';
import { TabsParamsList } from '@navigation/tabs-stacks';

export type HomeTabParamsList = {
  HomeScreen: undefined;
  DEXScreen: { tokenA?: SwapToken; tokenB?: SwapToken } | undefined;
  DexReviewSwapScreen: undefined;
  DexSettingsScreen: undefined;
  DexTxStatusScreen:
    | { status: 'success' | 'error'; amount?: string; token?: string }
    | undefined;
};

export enum HOME_STACK_ROUTES {
  HomeScreen = 'HomeScreen',
  DEXScreen = 'DEXScreen',
  DexReviewSwapScreen = 'DexReviewSwapScreen',
  DexSettingsScreen = 'DexSettingsScreen',
  DexTxStatusScreen = 'DexTxStatusScreen'
}
export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamsList>,
  NativeStackNavigationProp<HomeTabParamsList>
>;
