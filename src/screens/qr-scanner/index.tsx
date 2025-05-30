import { useCallback, useRef, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Camera, CameraApi, CameraType } from 'react-native-camera-kit';
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps';
import { QrScannerDebugger } from '@components/atoms';
import { useQRScanner } from '@lib';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { styles } from './styles';

export const QRScannerScreen = ({
  navigation
}: RootNavigationScreenProps<'QRScanner'>) => {
  const cameraRef = useRef<CameraApi>(null);
  const hasScanned = useRef(false);
  const { qrCallback, setQRCallback } = useQRScanner();

  useEffect(() => {
    return () => {
      hasScanned.current = false;
    };
  }, []);

  const onScannedHandle = useCallback(
    (event: OnReadCodeData) => {
      if (hasScanned.current) return;
      hasScanned.current = true;

      if (!event?.nativeEvent?.codeStringValue)
        return Alert.alert('Scan Error', 'Could not read QR code data');

      const scannedValue = event.nativeEvent.codeStringValue;

      if (qrCallback && typeof qrCallback === 'function') {
        try {
          qrCallback(scannedValue);
        } finally {
          setQRCallback(null);
        }
      }

      navigation.goBack();
    },
    [navigation, qrCallback, setQRCallback]
  );

  return (
    <View style={styles.container}>
      <QrScannerDebugger onScannedHandle={onScannedHandle} />

      <Camera
        ref={cameraRef}
        cameraType={CameraType.Back}
        style={styles.camera}
        scanBarcode
        ratioOverlay="1:1"
        onReadCode={onScannedHandle}
        flashMode="auto"
      />
    </View>
  );
};
