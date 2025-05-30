import { View } from 'react-native';
import { TokenLogo } from '@components/molecules';
import { Config } from '@constants';
import { styles } from './styles';

interface Token {
  address: string;
  symbol: string;
}

export const SupportedTokensList = () => {
  const tokens: Token[] = Config.TOKENS.slice(0, 7);

  return (
    <View style={styles.container}>
      <View style={styles.tokensContainer}>
        {tokens.map((item, index) => (
          <View
            key={item.address}
            style={[
              styles.tokenWrapper,
              index === 0 && styles.firstToken,
              { zIndex: tokens.length - index }
            ]}
          >
            <TokenLogo scale={0.7} token={item.symbol} />
          </View>
        ))}
      </View>
    </View>
  );
};
