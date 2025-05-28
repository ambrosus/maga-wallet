import { useState } from 'react';
import { View } from 'react-native';
import { SendFundsAnimatedAmount } from '@components/animated';
import { SafeViewContainer, Spacer, Typography } from '@components/atoms';
import {
  Header,
  PrimaryButton,
  SendFundsTokenSelector
} from '@components/molecules';
import { Keyboard } from '@components/organisms';
import { KEYBOARD_PRESETS } from '@constants';
import { useKeyboardHandler } from '@core/send-funds/lib';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { IToken } from '@types';
import { styles } from './styles';

export const SendFundsScreen = ({
  route
}: RootNavigationScreenProps<'SendFundsScreen'>) => {
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
          <SendFundsAnimatedAmount />

          <SendFundsTokenSelector
            token={selectedTokenInstance}
            setSelectedToken={setSelectedTokenInstance}
          />
          <Spacer value={24} />
          <Keyboard
            buttons={KEYBOARD_PRESETS.BUTTONS_WITH_DECIMALS}
            buttonContainerStyle={{ width: '30%' }}
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
