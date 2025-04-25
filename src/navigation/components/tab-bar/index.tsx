import { useLayoutEffect, useMemo, useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer, Typography } from '@components';
import { COLORS } from '@constants';
import { useCurrentRoute } from '@contexts/navigation';
import { MAIN_TABS } from '@navigation/constants';
import { RoutesModel } from '@navigation/tabs-stacks/types';
import { scale, verticalScale, NavigationUtils } from '@utils';
import { styles } from './styles';

interface TabBarMethodModel {
  tabs: Record<
    string,
    { activeIcon: React.ReactNode; inactiveIcon: React.ReactNode }
  >;
  visibility: (tab: RoutesModel) => boolean;
}

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { t } = useTranslation();
  const bottomSafeArea = useSafeAreaInsets().bottom;

  const tabsMethods = useMemo<TabBarMethodModel>(
    () => ({
      tabs: MAIN_TABS,
      visibility: NavigationUtils.getTabBarVisibility
    }),
    []
  );

  const currentRoute = useCurrentRoute() as RoutesModel;
  const tabBarVisible = tabsMethods.visibility(currentRoute);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    setIsReady(true);
  }, []);

  const bottomContainerStyle: StyleProp<ViewStyle> = useMemo(() => {
    if (bottomSafeArea === 0) {
      return { ...styles.mainItemContainer, marginTop: 8, marginBottom: 16 };
    }

    return {
      ...styles.mainItemContainer,
      marginVertical: 8
    };
  }, [bottomSafeArea]);

  if (!isReady || !tabBarVisible) return <></>;

  return (
    <View
      style={[
        styles.mainContainer,
        {
          paddingBottom: bottomSafeArea
        }
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const icon =
          tabsMethods.tabs[route.name][
            isFocused ? 'activeIcon' : 'inactiveIcon'
          ];

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={index}
            hitSlop={scale(24)}
            style={[
              bottomContainerStyle,
              {
                paddingTop: verticalScale(5)
              }
            ]}
            onPress={onPress}
          >
            {icon}
            <Spacer value={scale(8)} />
            <Typography
              fontSize={scale(15)}
              color={COLORS[isFocused ? 'primary500' : 'neutral500']}
            >
              {t(`tabs.${route.name}`)}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
