import { useMemo, useRef } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { FontFamily } from '@components/atoms/typography/types';
import { Arrow } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { useWalletStore } from '@core/wallets';
import { scale } from '@utils';
import { BottomSheetWalletSelector } from '../bottom-sheets';
import { styles } from './styles';

interface WalletSelectorProps {
  title?: string;
  bottomSheetTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  typographyStyle?: {
    fontSize?: number;
    fontFamily?: FontFamily;
    color?: string;
  };
  settingsButton?: boolean;
}

export const WalletSelector = ({
  title,
  bottomSheetTitle,
  containerStyle,
  typographyStyle = {
    fontSize: FONT_SIZE.body.md,
    fontFamily: 'Onest500Medium',
    color: COLORS.textPrimary
  },
  settingsButton = false
}: WalletSelectorProps) => {
  const { selectedWallet } = useWalletStore();

  const bottomSheetWalletsRef = useRef<BottomSheetModal>(null);

  const label = useMemo(() => {
    const value = title ?? selectedWallet.name;

    return value.length > 10 ? `${value.slice(0, 7)}...` : value;
  }, [selectedWallet.name, title]);

  const onPressWalletSelector = () => bottomSheetWalletsRef.current?.present();

  return (
    <>
      <TouchableOpacity
        onPress={onPressWalletSelector}
        style={[styles.container, containerStyle]}
      >
        <RowContainer justifyContent="space-between" alignItems="center">
          <Typography {...typographyStyle}>{label}</Typography>
          <Spacer horizontal value={scale(10)} />
          <Arrow color={COLORS.black} orientation="down" />
        </RowContainer>
      </TouchableOpacity>

      <BottomSheetWalletSelector
        title={bottomSheetTitle}
        ref={bottomSheetWalletsRef}
        settingsButton={settingsButton}
      />
    </>
  );
};
