import { ListRenderItemInfo, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { ChartPrice, TokenLogo } from '@components/molecules';
import { COLORS, FONT_SIZE } from '@constants';
import { useWalletStore } from '@core/wallets';
import { IToken } from '@types';
import { NumberUtils, scale } from '@utils';
import { styles } from './styles';

export const TokensList = () => {
  const { selectedWalletTokens, formatTokenBalance } = useWalletStore();

  const renderItem = ({ item, index }: ListRenderItemInfo<IToken>) => {
    // TODO: Implement real price change data from API
    const percentChange = index % 2 === 0 ? index * 1.5 : index * -1 * 1.5;
    const priceUSD = index % 2 === 0 ? index * 1.3 : index * 1.3;
    const usdBalance = NumberUtils.formatNumber(+item.usdBalance);
    const tokenBalance = NumberUtils.formatNumber(+formatTokenBalance(item));

    return (
      <RowContainer
        style={styles.main}
        justifyContent="space-between"
        alignItems="center"
      >
        <RowContainer alignItems="center">
          <TokenLogo scale={1.1} token={item.currencyCode} />
          <Spacer horizontal value={scale(10)} />
          <View>
            <Typography fontWeight="500" color={COLORS.textPrimary}>
              {item.currencyCode}
            </Typography>
            <ChartPrice percentChange={percentChange} priceUSD={priceUSD} />
          </View>
        </RowContainer>
        <View>
          <Typography fontWeight="500" color={COLORS.textPrimary} align="right">
            ${usdBalance}
          </Typography>
          <Spacer value={scale(4)} />
          <Typography
            color={COLORS.neutral400}
            fontSize={FONT_SIZE.tertiary.lg}
            align="right"
          >
            {tokenBalance} {item.currencyCode}
          </Typography>
        </View>
      </RowContainer>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={selectedWalletTokens}
        renderItem={renderItem}
      />
    </View>
  );
};
