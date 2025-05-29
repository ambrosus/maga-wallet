import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RowContainer } from '@components/atoms';
import { HomeHeaderButton } from '@components/molecules';
import { BottomSheetWalletSelector } from '@components/templates';
import { useWalletStore } from '@core/wallets';

export const HomeHeader = () => {
  const { selectedWallet } = useWalletStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onPressWalletSelector = () => {
    bottomSheetRef?.current?.present();
  };

  return (
    <>
      <RowContainer justifyContent="space-between">
        <HomeHeaderButton
          onPress={onPressWalletSelector}
          title={selectedWallet.name}
        />
      </RowContainer>
      <BottomSheetWalletSelector ref={bottomSheetRef} />
    </>
  );
};
