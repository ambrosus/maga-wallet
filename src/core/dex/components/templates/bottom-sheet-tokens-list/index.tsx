import { forwardRef, useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer } from '@components/atoms';
import { bnZERO, Config, DEVICE_HEIGHT } from '@constants';
import { BottomSheetTokenItem } from '@core/dex/components/modular';
import { useSwapAllBalances } from '@core/dex/lib/hooks';
import { FIELD, SelectedTokensKeys, SwapToken } from '@core/dex/types';
// import { transformTokensObject } from '@core/dex/utils';
import { useForwardedRef } from '@lib';
import { scale } from '@utils';
import { BottomSheet } from '@components/organisms';

interface BottomSheetTokensListProps {
  type: SelectedTokensKeys;
}

export const BottomSheetTokensList = forwardRef<
  BottomSheetModal,
  BottomSheetTokensListProps
>(({ type }, ref) => {
  const { t } = useTranslation();
  const bottomSheetRef = useForwardedRef(ref);
  const { balances } = useSwapAllBalances();

  // const { tokens } = useRodeoTokensListQuery();

  const label = type === FIELD.TOKEN_A ? t('swap.pay') : t('swap.receive');

  const { bottom } = useSafeAreaInsets();

  const renderListCurrencyItem = useCallback(
    ({ item }: ListRenderItemInfo<SwapToken>) => {
      const { address } = item;

      const balanceEntry = balances.find(
        (balance) => Object.keys(balance)[0] === address
      );

      return (
        <BottomSheetTokenItem
          token={item}
          bnBalance={balanceEntry?.[address] ?? bnZERO}
          type={type}
        />
      );
    },
    [balances, type]
  );

  return (
    <BottomSheet ref={bottomSheetRef} title={label}>
      <Spacer value={scale(16)} />

      <View style={{ maxHeight: DEVICE_HEIGHT / 2.25 }}>
        <BottomSheetFlatList
          maxToRenderPerBatch={4}
          data={Config.SWAP_TOKENS}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.symbol}
          renderItem={renderListCurrencyItem}
        />
      </View>
      <Spacer value={scale(bottom === 0 ? 20 : bottom)} />
    </BottomSheet>
  );
});
