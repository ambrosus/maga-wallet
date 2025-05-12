import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Spacer } from '@components/atoms';
import { Button } from '@components/molecules';
import { SwapOppositeArrowsIcon } from '@components/svgs';
import { COLORS } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import {
  useSwapFieldsHandler,
  useSwapSelectTokens,
  useSwapTokens
} from '@core/dex/lib/hooks';
import { styles } from './styles';

export const SwapReverseTokens = () => {
  const { onReverseSelectedTokens } = useSwapSelectTokens();
  const { updateReceivedTokensOutput } = useSwapFieldsHandler();
  const { setIsExactIn, isLockedAfterReverse, setIsLockedAfterReverse } =
    useSwapContextSelector();
  const { tokenToSell, tokenToReceive } = useSwapTokens();

  const onReverseSelectedTokensPress = useCallback(() => {
    setIsExactIn((prevState) => !prevState);
    setIsLockedAfterReverse(true);
    onReverseSelectedTokens();

    if (tokenToSell.TOKEN && tokenToReceive.TOKEN) {
      setTimeout(async () => {
        await updateReceivedTokensOutput();
      });
    }
  }, [
    onReverseSelectedTokens,
    setIsExactIn,
    setIsLockedAfterReverse,
    tokenToReceive.TOKEN,
    tokenToSell.TOKEN,
    updateReceivedTokensOutput
  ]);

  useEffect(() => {
    if (isLockedAfterReverse) {
      const timeout = setTimeout(() => setIsLockedAfterReverse(false), 7000);

      return () => clearTimeout(timeout);
    }
  }, [isLockedAfterReverse, setIsLockedAfterReverse]);

  return (
    <>
      <Spacer value={2} />
      <View style={styles.container}>
        <Button onPress={onReverseSelectedTokensPress} style={styles.button}>
          <SwapOppositeArrowsIcon scale={0.75} color={COLORS.neutral400} />
        </Button>
      </View>
      <Spacer value={2} />
    </>
  );
};
