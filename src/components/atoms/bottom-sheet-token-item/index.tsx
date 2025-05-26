import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { TokenLogo } from '@components/molecules';
import { COLORS, FONT_SIZE } from '@constants';
import { IToken } from '@types';
import { RowContainer } from '../row-container';
import { Typography } from '../typography';
import { styles } from './styles';

interface BottomSheetTokenItemProps {
  token: IToken;
  onPress: (token: IToken) => void;
}

export const BottomSheetTokenItem = memo(
  ({ token, onPress }: BottomSheetTokenItemProps) => {
    const onTokenPressHandle = useCallback(
      () => onPress(token),
      [onPress, token]
    );

    return (
      <TouchableOpacity onPress={onTokenPressHandle}>
        <RowContainer
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          style={styles.container}
        >
          <RowContainer gap={8}>
            <TokenLogo token={token.currencyCode} />

            <View style={styles.tokenInfoContainer}>
              <Typography
                fontSize={FONT_SIZE.body.lg}
                fontFamily="Onest500Medium"
                color={COLORS.textPrimary}
              >
                {token.currencyCode}
              </Typography>
              <Typography
                fontSize={FONT_SIZE.body.sm}
                fontFamily="Onest500Medium"
                color={COLORS.textSecondary}
              >
                350 USDC
              </Typography>
            </View>
          </RowContainer>

          <Typography
            fontSize={FONT_SIZE.body.lg}
            fontFamily="Onest500Medium"
            color={COLORS.textPrimary}
          >
            $100
          </Typography>
        </RowContainer>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.token.address === nextProps.token.address;
  }
);
