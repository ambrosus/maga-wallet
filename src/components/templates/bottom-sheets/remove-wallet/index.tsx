import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { PrimaryButton, SecondaryButton } from '@components/molecules';
import { BottomSheet } from '@components/organisms';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { useForwardedRef } from '@lib/hooks';
import { scale, verticalScale } from '@utils';
import { styles } from './styles';

interface BottomSheetConfirmModalProps {
  title: string;
  description: string;
  onApprove: () => void;
  onCancel: () => void;
}

export const BottomSheetConfirmModal = forwardRef<
  BottomSheetModal,
  BottomSheetConfirmModalProps
>(({ title, description, onApprove, onCancel }, ref) => {
  const { t } = useTranslation();

  const bottomSheetRef = useForwardedRef<BottomSheetModal>(ref);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      maxDynamicContentSize={DEVICE_HEIGHT * 0.6}
      swiperIconVisible={false}
    >
      <View style={styles.contentWrapper}>
        <Spacer value={verticalScale(6)} />
        <Typography
          color={COLORS.textPrimary}
          align="center"
          fontSize={scale(18)}
        >
          {title}
        </Typography>
        <Spacer value={verticalScale(16)} />
        <Typography
          fontSize={scale(14)}
          align="center"
          color={COLORS.textPrimary}
        >
          {description}
        </Typography>
        <RowContainer
          justifyContent="space-between"
          style={styles.buttonsRowContainer}
        >
          <SecondaryButton
            title={t('buttons.cancel')}
            onPress={onCancel}
            style={[styles.buttonStyle, styles.secondaryButton]}
          />
          <PrimaryButton
            title={t('buttons.remove')}
            onPress={onApprove}
            style={[styles.buttonStyle, styles.primaryButton]}
          />
        </RowContainer>
      </View>
    </BottomSheet>
  );
});
