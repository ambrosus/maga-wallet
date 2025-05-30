import { useState } from 'react';
import { View } from 'react-native';
import { AutoResizeAmount } from '@components/animated/auto-resize-amount';
import { SafeViewContainer, Spacer, Typography } from '@components/atoms';
import {
  Header,
  PrimaryButton,
  SendFundsTokenSelector
} from '@components/molecules';
import { Keyboard } from '@components/organisms';
import { KEYBOARD_PRESETS } from '@constants';
import { useKeyboardHandler } from '@core/send-funds/lib';
import { useSendFundsStore } from '@core/send-funds/model';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { IToken } from '@types';
import { styles } from './styles';

export const SendFundsScreen = ({
  route
}: RootNavigationScreenProps<'SendFundsScreen'>) => {
  const { amount } = useSendFundsStore();
  const [selectedTokenInstance, setSelectedTokenInstance] = useState<IToken>(
    route.params.token
  );

  const {
    onKeyboardButtonPressHandle,
    onKeyboardRemoveTap,
    handleRemoveButtonPressIn,
    handleRemoveButtonPressOut
  } = useKeyboardHandler();

  return (
    <SafeViewContainer>
      <Header title="Send" closeIconVisible backIconVisible={false} />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <AutoResizeAmount amount={amount} />

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

        <PrimaryButton disabled onPress={() => null}>
          <Typography>Continue</Typography>
        </PrimaryButton>
      </View>
    </SafeViewContainer>
  );
};
