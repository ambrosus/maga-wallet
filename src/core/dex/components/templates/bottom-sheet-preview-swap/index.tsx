import { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BottomSheet, Spacer } from '@components';
import { useSwapContextSelector } from '@core/dex/context';
import { useSwapBottomSheetHandler } from '@core/dex/lib/hooks';
import { BottomSheetStatus, FIELD } from '@core/dex/types';
import { useForwardedRef } from '@lib';
import { delayNavigationAction, scale } from '@utils';
import { styles } from './styles';
import { BottomSheetReviewTokenItem } from '../../base';
import { PreviewInformation } from '../../composite';
import { SubmitSwapActions } from '../../modular';

export const BottomSheetPreviewSwap = forwardRef<BottomSheetModal, unknown>(
  (_, ref) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const bottomSheetRef = useForwardedRef(ref);
    const { isProcessingSwap } = useSwapContextSelector();
    const {
      bottomSheetSwapStatus,
      onReviewSwapDismiss,
      onChangeBottomSheetSwapStatus
    } = useSwapBottomSheetHandler();

    const isPreview = useMemo(
      () => bottomSheetSwapStatus === BottomSheetStatus.PREVIEW,
      [bottomSheetSwapStatus]
    );

    const onSuccessBottomSheetDismiss = useCallback(() => {
      onChangeBottomSheetSwapStatus(BottomSheetStatus.PREVIEW);
      if (bottomSheetSwapStatus === BottomSheetStatus.SUCCESS) {
        onReviewSwapDismiss();
        delayNavigationAction(() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }]
            })
          )
        );
      }
    }, [
      bottomSheetSwapStatus,
      navigation,
      onChangeBottomSheetSwapStatus,
      onReviewSwapDismiss
    ]);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        // title={isPreview ? t('common.review') : undefined}
        // swiperIconVisible={false}
        // closeOnBackPress={!isProcessingSwap}
        // onBackdropPress={onSuccessBottomSheetDismiss}
        // onCustomCrossPress={onSuccessBottomSheetDismiss}
        // swipingEnabled={false}
      >
        <View style={styles.container}>
          <View style={styles.preview}>
            <BottomSheetReviewTokenItem type={FIELD.TOKEN_A} />
            <View style={styles.divider} />
            <BottomSheetReviewTokenItem type={FIELD.TOKEN_B} />
          </View>

          <PreviewInformation />

          <Spacer value={scale(24)} />
          <SubmitSwapActions />
        </View>

        <Spacer value={scale(40)} />
      </BottomSheet>
    );
  }
);
