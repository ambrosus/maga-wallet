import { useCallback, useRef, useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraApi, CameraType } from 'react-native-camera-kit';
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CameraSquare,
  QrScannerDebugger,
  RowContainer,
  Typography
} from '@components/atoms';
import { CloseIcon } from '@components/svgs';
import { CameraPermissionView } from '@components/templates';
import { COLORS, FONT_SIZE } from '@constants';
import { PermissionKeys, Permissions, useQRScanner } from '@lib';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { styles } from './styles';

export const QRScannerScreen = ({
  navigation
}: RootNavigationScreenProps<'QRScanner'>) => {
  const { top } = useSafeAreaInsets();
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] =
    useState(false);

  const onHandleCameraPermission = useCallback(async () => {
    const result = await Permissions.check(PermissionKeys.CAMERA);
    setIsCameraPermissionGranted(result === 'granted');
  }, []);

  useEffect(() => {
    onHandleCameraPermission();
  }, [onHandleCameraPermission]);

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

  if (!isCameraPermissionGranted) {
    return (
      <CameraPermissionView
        setIsCameraPermissionGranted={setIsCameraPermissionGranted}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { top }]}>
        <RowContainer alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={navigation.goBack}>
            <CloseIcon color={COLORS.white} />
          </TouchableOpacity>

          <Typography
            fontSize={FONT_SIZE.heading.xl}
            fontFamily="Onest600SemiBold"
            color={COLORS.white}
          >
            Scan an Address
          </Typography>

          <View />
        </RowContainer>
      </View>
      <QrScannerDebugger onScannedHandle={onScannedHandle} />

      <CameraSquare />

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
