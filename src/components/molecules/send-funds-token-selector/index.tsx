import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RowContainer, Typography } from '@components/atoms';
import { Arrow } from '@components/svgs';
import { BottomSheetTokensList } from '@components/templates/bottom-sheets';
import { COLORS, FONT_SIZE } from '@constants';
import { useWalletStore } from '@core/wallets';
import { IToken } from '@types';
import { styles } from './styles';
import { Button } from '../button';
import { TokenLogo } from '../token-logo';

interface SendFundsTokenSelectorProps {
  token: IToken;
  setSelectedToken: Dispatch<SetStateAction<IToken>>;
}

export const SendFundsTokenSelector = ({
  token,
  setSelectedToken
}: SendFundsTokenSelectorProps) => {
  const selectTokensBottomSheetRef = useRef<BottomSheetModal>(null);

  const { selectedWalletTokens } = useWalletStore();

  const onSelectToken = useCallback(
    (payload: IToken) => {
      setSelectedToken(payload);
      selectTokensBottomSheetRef.current?.close();
    },
    [setSelectedToken]
  );

  const onPresentSelectTokensBottomSheet = useCallback(() => {
    selectTokensBottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <RowContainer
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        style={styles.container}
      >
        <RowContainer alignItems="center" gap={8}>
          <TokenLogo token={token.currencyCode} scale={0.75} />

          <View style={styles.tokenInfoContainer}>
            <TouchableOpacity
              hitSlop={24}
              onPress={onPresentSelectTokensBottomSheet}
            >
              <RowContainer alignItems="center" gap={8}>
                <Typography
                  fontSize={16}
                  fontFamily="Onest600SemiBold"
                  color={COLORS.textPrimary}
                >
                  {token.currencyCode}
                </Typography>

                <Arrow
                  orientation="down"
                  scale={0.75}
                  color={COLORS.neutral500}
                />
              </RowContainer>
            </TouchableOpacity>
            <Typography
              fontSize={FONT_SIZE.body.sm}
              fontFamily="Onest500Medium"
              color={COLORS.textTertiary}
            >
              Balance: {token.usdBalance}
            </Typography>
          </View>
        </RowContainer>

        <Button style={styles.button}>
          <Typography
            fontSize={FONT_SIZE.body.sm}
            fontFamily="Onest500Medium"
            color={COLORS.neutral700}
          >
            Use Max
          </Typography>
        </Button>
      </RowContainer>

      <BottomSheetTokensList
        title="Select Token to Send"
        ref={selectTokensBottomSheetRef}
        tokens={selectedWalletTokens}
        onPress={onSelectToken}
      />
    </>
  );
};
