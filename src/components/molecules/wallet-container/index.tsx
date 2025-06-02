import { ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet
} from 'react-native';
import { Typography } from '@components/atoms';
import { CheckboxCircle } from '@components/svgs';
import { COLORS } from '@constants';
import { useWalletStore } from '@core/wallets';
import { IWallet } from '@types';
import { NumberUtils } from '@utils';
import { styles } from './styles';

interface WalletContainerProps {
  item: IWallet;
  onPress?: (wallet: IWallet) => void;
  disabled?: boolean;
  contentRight?: null | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const WalletContainer = ({
  item,
  onPress = () => {},
  disabled = false,
  contentRight = null,
  containerStyle = {}
}: WalletContainerProps) => {
  const { selectedWallet, getTokensByWalletAddress, calculateTotalUsdBalance } =
    useWalletStore();
  const isSelected = selectedWallet.id === item.id;
  const tokens = getTokensByWalletAddress(item.address);
  const usdBalance = calculateTotalUsdBalance(tokens);

  const finalStyle = StyleSheet.flatten([styles.walletItem, containerStyle]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(item)}
      style={finalStyle}
    >
      <View>
        <Typography color={COLORS.textPrimary}>{item.name}</Typography>
        <Typography style={styles.balanceText}>
          ${NumberUtils.formatNumber(usdBalance)}
        </Typography>
      </View>
      {contentRight ? (
        contentRight
      ) : (
        <View>{isSelected && <CheckboxCircle />}</View>
      )}
    </TouchableOpacity>
  );
};
