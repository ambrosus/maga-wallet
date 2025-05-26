import { forwardRef, useCallback } from 'react';
import { ListRenderItemInfo, Platform } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetTokenItem, Spacer } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { DEVICE_HEIGHT } from '@constants';
import { useSafeViewController } from '@lib';
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
  const { bottom } = useSafeViewController();

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
      <Spacer value={8} />
      <BottomSheetFlatList
        data={tokens}
        renderItem={renderListCurrencyItem}
        keyExtractor={(item) => item.address}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: Platform.select({
            ios: bottom,
            android: bottom * 2
          })
        }}
      />
    </BottomSheet>
  );
});
