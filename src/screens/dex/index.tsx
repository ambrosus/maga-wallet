import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FLEX_FULL_SIZE } from '@constants';
import {
  SwapForm,
  BottomSheetTokensList,
  BottomSheetPreviewSwap
} from '@core/dex/components/templates';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapAllBalances, useAllLiquidityPools } from '@core/dex/lib/hooks';
import { FIELD } from '@core/dex/types';
import { useEffectOnce } from '@lib';
import { HomeTabParamsList } from '@navigation';
import { NavigationScreenProps } from '@navigation/types';

type Props = NavigationScreenProps<HomeTabParamsList, 'DEXScreen'>;

export const DEXScreen = ({}: Props) => {
  //   const { t } = useTranslation();

  useSwapAllBalances();

  const { getAllPoolsCount } = useAllLiquidityPools();
  const {
    bottomSheetTokenARef,
    bottomSheetTokenBRef,
    bottomSheetPreviewSwapRef
    // reset
  } = useSwapContextSelector();

  useEffectOnce(() => {
    getAllPoolsCount();
  });

  //   useFocusEffect(
  //     useCallback(() => {
  //       const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //         const resetActions = ['RESET', 'GO_BACK'];
  //         if (resetActions.includes(e.data.action.type)) reset();
  //       });

  //       return unsubscribe;
  //     }, [navigation, reset])
  //   );

  //   const onNavigateToSwapSettings = useCallback(
  //     () => navigation.navigate('SwapSettingsScreen'),
  //     [navigation]
  //   );

  //   const renderHeaderRightContent = useMemo(() => {
  //     return (
  //       <Button onPress={onNavigateToSwapSettings}>
  //         <SettingsFilledIcon color={COLORS.neutral400} />
  //       </Button>
  //     );
  //   }, [onNavigateToSwapSettings]);

  return (
    <SafeAreaView style={FLEX_FULL_SIZE}>
      {/* <Header
        bottomBorder
        title={t('account.actions.swap')}
        contentRight={renderHeaderRightContent}
      /> */}

      <SwapForm />

      <BottomSheetTokensList ref={bottomSheetTokenARef} type={FIELD.TOKEN_A} />
      <BottomSheetTokensList ref={bottomSheetTokenBRef} type={FIELD.TOKEN_B} />
      {/* <BottomSheetPreviewSwap ref={bottomSheetPreviewSwapRef} /> */}
    </SafeAreaView>
  );
};
