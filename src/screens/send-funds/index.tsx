import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { parseEther } from 'viem';
import { AutoResizeAmount } from '@components/animated/auto-resize-amount';
import { SafeViewContainer, Spacer } from '@components/atoms';
import {
  Header,
  PrimaryButton,
  SendFundsTokenSelector,
  TextOrSpinner
} from '@components/molecules';
import { Keyboard } from '@components/organisms';
import { COLORS, FONT_SIZE, KEYBOARD_PRESETS } from '@constants';
import { useKeyboardHandler } from '@core/send-funds/lib';
import { useSendFundsStore } from '@core/send-funds/model';
import { HOME_STACK_ROUTES } from '@navigation';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { IToken } from '@types';
import { delay } from '@utils';
import { styles } from './styles';

export const SendFundsScreen = ({
  navigation,
  route
}: RootNavigationScreenProps<'SendFundsScreen'>) => {
  const { amount } = useSendFundsStore();
  const [selectedTokenInstance, setSelectedTokenInstance] = useState<IToken>(
    route.params.token
  );

  const [isLoading, setIsLoading] = useState(false);

  const {
    onKeyboardButtonPressHandle,
    onKeyboardRemoveTap,
    handleRemoveButtonPressIn,
    handleRemoveButtonPressOut
  } = useKeyboardHandler();

  const onReviewTranasctionScreen = useCallback(async () => {
    try {
      setIsLoading(true);
      await delay(2500);
      navigation.navigate(HOME_STACK_ROUTES.SendFundsReceiptScreen, {
        token: selectedTokenInstance
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigation, selectedTokenInstance]);

  const isInsufficientBalance = useMemo(() => {
    const bnAmount = parseEther(amount);

    return bnAmount > parseEther(selectedTokenInstance.usdBalance);
  }, [amount, selectedTokenInstance.usdBalance]);

  const disabled = useMemo(
    () => isLoading || isInsufficientBalance || !amount,
    [isLoading, isInsufficientBalance, amount]
  );

  return (
    <SafeViewContainer>
      <Header title="Send" closeIconVisible backIconVisible={false} />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <AutoResizeAmount
            amount={amount}
            token={selectedTokenInstance.currencyCode}
            isInsufficientBalance={isInsufficientBalance}
          />

          <SendFundsTokenSelector
            token={selectedTokenInstance}
            setSelectedToken={setSelectedTokenInstance}
          />
          <Spacer value={24} />
          <Keyboard
            buttons={KEYBOARD_PRESETS.BUTTONS_WITH_DECIMALS}
            buttonContainerStyle={styles.keyboardButtonContainer}
            onRemoveTap={onKeyboardRemoveTap}
            onButtonPress={onKeyboardButtonPressHandle}
            onRemovePressIn={handleRemoveButtonPressIn}
            onRemovePressOut={handleRemoveButtonPressOut}
          />
        </View>

        <PrimaryButton disabled={disabled} onPress={onReviewTranasctionScreen}>
          <TextOrSpinner
            loading={isLoading}
            label="Continue"
            spinnerColor={COLORS.white}
            styles={{
              active: {
                fontSize: FONT_SIZE.body.lg,
                fontFamily: 'Onest600SemiBold',
                color: COLORS[disabled ? 'primary100' : 'white']
              }
            }}
          />
        </PrimaryButton>
      </View>
    </SafeViewContainer>
  );
};
