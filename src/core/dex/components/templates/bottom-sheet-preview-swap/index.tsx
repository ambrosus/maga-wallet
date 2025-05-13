import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Spacer } from '@components/atoms';
import { BottomSheet } from '@components/organisms';
import { FIELD } from '@core/dex/types';
import { useForwardedRef } from '@lib';
import { scale } from '@utils';
import { styles } from './styles';
import { BottomSheetReviewTokenItem } from '../../atoms';
import { PreviewInformation } from '../../molecules';
import { SubmitSwapActions } from '../../organisms';

export const BottomSheetPreviewSwap = forwardRef<BottomSheetModal, unknown>(
  (_, ref) => {
    const bottomSheetRef = useForwardedRef(ref);

    // const isPreview = useMemo(
    //   () => bottomSheetSwapStatus === BottomSheetStatus.PREVIEW,
    //   [bottomSheetSwapStatus]
    // );

    // const onSuccessBottomSheetDismiss = useCallback(() => {
    //   onChangeBottomSheetSwapStatus(BottomSheetStatus.PREVIEW);
    //   if (bottomSheetSwapStatus === BottomSheetStatus.SUCCESS) {
    //     onReviewSwapDismiss();
    //     delayNavigationAction(() =>
    //       navigation.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [{ name: 'HomeScreen' }]
    //         })
    //       )
    //     );
    //   }
    // }, [
    //   bottomSheetSwapStatus,
    //   navigation,
    //   onChangeBottomSheetSwapStatus,
    //   onReviewSwapDismiss
    // ]);

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
