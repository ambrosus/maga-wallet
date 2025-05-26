import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  AccountActionPressableContainer,
  RowContainer
} from '@components/atoms';
import { BottomSheetTokensList } from '@components/templates/bottom-sheets';
import { useWalletStore } from '@core/wallets';
import { HOME_STACK_ROUTES } from '@navigation';
import { HomeNavigationProp } from '@navigation/types';
import { IToken } from '@types';
import { delayNavigationAction } from '@utils';

export const AccountActionsContainer = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const selectTokensBottomSheetRef = useRef<BottomSheetModal>(null);

  const { selectedWalletTokens } = useWalletStore();

  const onNavigateToSwap = () =>
    navigation.navigate(HOME_STACK_ROUTES.DEXScreen);

  const onNavigateToSendFunds = () => {
    selectTokensBottomSheetRef.current?.present();
  };

  const onPressToken = (token: IToken) => {
    selectTokensBottomSheetRef.current?.close();
    delayNavigationAction(() =>
      navigation.navigate(HOME_STACK_ROUTES.SendFundsScreen, {
        token
      })
    );
  };

  return (
    <>
      <RowContainer gap={16}>
        <AccountActionPressableContainer
          type="send"
          onActionPress={onNavigateToSendFunds}
        />
        <AccountActionPressableContainer
          type="swap"
          onActionPress={onNavigateToSwap}
        />
        <AccountActionPressableContainer
          type="receive"
          onActionPress={() => {}}
        />
      </RowContainer>

      <BottomSheetTokensList
        ref={selectTokensBottomSheetRef}
        title="Select Tokens to Send"
        tokens={selectedWalletTokens}
        onPress={onPressToken}
      />
    </>
  );
};
