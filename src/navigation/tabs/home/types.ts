import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabsParamsList } from '@navigation/tabs-stacks';

export type HomeTabParamsList = {
  HomeScreen: undefined;
  DEXScreen: undefined;
};

export enum HOME_STACK_ROUTES {
  HomeScreen = 'HomeScreen',
  DEXScreen = 'DEXScreen'
}
export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamsList>,
  NativeStackNavigationProp<HomeTabParamsList>
>;
