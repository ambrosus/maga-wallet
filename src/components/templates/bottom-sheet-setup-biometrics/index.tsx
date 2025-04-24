import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { IconContainer, Typography } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { WarningIcon } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { styles } from './styles';

export const BottomSheetSetupBiometrics = forwardRef<BottomSheetModal>(
  ({}, bottomSheetRef) => {
    return (
      <BottomSheet ref={bottomSheetRef}>
        <View style={styles.container}>
          <IconContainer size={80} backgroundColor={COLORS.warning50}>
            <WarningIcon />
          </IconContainer>

          <Typography
            fontSize={FONT_SIZE.heading.lg}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
          >
            Are you sure?
          </Typography>
        </View>
      </BottomSheet>
    );
  }
);
