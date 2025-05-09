import { forwardRef, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet, Spacer, Typography } from '@components';
import { bnZERO, DEVICE_HEIGHT } from '@constants';
import { BottomSheetTokenItem } from '@core/dex/components/modular';
import { SWAP_SUPPORTED_TOKENS } from '@core/dex/entities';
import { useSwapAllBalances } from '@core/dex/lib/hooks';
import { FIELD, SelectedTokensKeys, SwapToken } from '@core/dex/types';
// import { transformTokensObject } from '@core/dex/utils';
import { useForwardedRef } from '@lib';
import { scale } from '@utils';
import { styles } from './styles';

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
    (args: ListRenderItemInfo<SwapToken>) => {
      const balanceEntry = balances.find(
        (balance) => Object.keys(balance)[0] === args.item.address
      );

      return (
        <BottomSheetTokenItem
          token={args.item}
          bnBalance={balanceEntry?.[args.item.address] ?? bnZERO}
          type={type}
        />
      );
    },
    [balances, type]
  );

  return (
    <BottomSheet ref={bottomSheetRef}>
      <Spacer value={scale(16)} />
      <Typography>hello world</Typography>
      {/* <View style={{ maxHeight: DEVICE_HEIGHT / 2.25 }}>
        <FlatList
          maxToRenderPerBatch={4}
          data={SWAP_SUPPORTED_TOKENS.tokens.testnet}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyExtractor={(item) => item.symbol}
          renderItem={renderListCurrencyItem}
        />
      </View> */}
      <Spacer value={scale(bottom === 0 ? 20 : bottom)} />
    </BottomSheet>
  );
});
