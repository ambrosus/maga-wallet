import { useCallback } from 'react';
import { View } from 'react-native';
import { SafeViewContainer, Typography } from '@components/atoms';
import { Button, Header } from '@components/molecules';
import { COLORS, FONT_SIZE } from '@constants';
import { Permissions, PermissionKeys } from '@lib';
import { styles } from './styles';

interface CameraPermissionViewProps {
  setIsCameraPermissionGranted: (value: boolean) => void;
}

export const CameraPermissionView = ({
  setIsCameraPermissionGranted
}: CameraPermissionViewProps) => {
  const getCameraPermissions = useCallback(async () => {
    const permission = await Permissions.check(PermissionKeys.CAMERA, {
      requestAgain: true,
      openSettings: true
    });

    if (permission) {
      setIsCameraPermissionGranted(true);
    }
  }, [setIsCameraPermissionGranted]);

  return (
    <SafeViewContainer style={styles.container}>
      <Header backIconVisible={false} closeIconVisible />
      <View style={styles.innerContainer}>
        <Typography fontFamily="Onest600SemiBold" color={COLORS.neutral700}>
          No access to camera
        </Typography>

        <Button
          activeOpacity={0.75}
          style={styles.button}
          onPress={getCameraPermissions}
        >
          <Typography
            fontSize={FONT_SIZE.body.sm}
            fontFamily="Onest600SemiBold"
            color={COLORS.white}
          >
            Give permission
          </Typography>
        </Button>
      </View>
    </SafeViewContainer>
  );
};
