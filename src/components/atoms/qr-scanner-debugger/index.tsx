import { View } from 'react-native';
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps';
import { Button } from '@components/molecules';
import { COLORS } from '@constants';
import { styles } from './styles';
import { Typography } from '../typography';

// Sample Ethereum address for testing
const MOCK_ADDRESS = 'ethereum:0xF51452e37eEbf3226BcBB25FA4f9F570f176484e';
const PLAIN_ETH_ADDRESS = '0xF51452e37eEbf3226BcBB25FA4f9F570f176484e';

interface QrScannerDebuggerProps {
  onScannedHandle: (event: OnReadCodeData) => void;
}

export const QrScannerDebugger = ({
  onScannedHandle
}: QrScannerDebuggerProps) => {
  // Only show debugger in development mode
  return (
    __DEV__ && (
      <View style={styles.container}>
        <Button
          onPress={() =>
            onScannedHandle({
              nativeEvent: {
                codeStringValue: MOCK_ADDRESS,
                codeFormat: 'qr'
              }
            })
          }
        >
          <Typography color={COLORS.success400}>
            Test with URI format
          </Typography>
        </Button>
        <Button
          onPress={() =>
            onScannedHandle({
              nativeEvent: {
                codeStringValue: PLAIN_ETH_ADDRESS,
                codeFormat: 'qr'
              }
            })
          }
        >
          <Typography color={COLORS.success400}>
            Test with plain address
          </Typography>
        </Button>
        <Button
          onPress={() =>
            onScannedHandle({
              nativeEvent: {
                codeStringValue: 'failing address',
                codeFormat: 'qr'
              }
            })
          }
        >
          <Typography color={COLORS.destructive400}>
            Test with invalid address
          </Typography>
        </Button>
      </View>
    )
  );
};
