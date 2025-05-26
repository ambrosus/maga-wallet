import { forwardRef, useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { BottomSheetTokenItem, Spacer } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { DEVICE_HEIGHT } from '@constants';
import { IToken } from '@types';

interface BottomSheetTokensListProps {
  title: string;
  tokens: IToken[];
  onPress: (token: IToken) => void;
}

export const BottomSheetTokensList = forwardRef<
  BottomSheetModal,
  BottomSheetTokensListProps
>(({ title, tokens, onPress }, ref) => {
  const renderListCurrencyItem = useCallback(
    ({ item }: ListRenderItemInfo<IToken>) => {
      return <BottomSheetTokenItem token={item} onPress={onPress} />;
    },
    [onPress]
  );

  return (
    <BottomSheet
      ref={ref}
      title={title}
      maxDynamicContentSize={DEVICE_HEIGHT / 2}
    >
      <Spacer value={20} />
      <FlatList
        data={tokens}
        renderItem={renderListCurrencyItem}
        keyExtractor={(item) => item.address}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
});
