import { forwardRef, PropsWithChildren, useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE_HEIGHT } from '@constants';
import { styles } from './styles';

type BottomSheetProps = PropsWithChildren & BottomSheetModalProps;

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ maxDynamicContentSize, children }, ref) => {
    const { bottom: paddingBottom } = useSafeAreaInsets();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    const maxDynamicContentSizeCalc = useMemo(() => {
      if (maxDynamicContentSize) return maxDynamicContentSize;

      // Calculate the maximum dynamic content size based on the device height and status bar height
      const statusBarHeight = StatusBar?.currentHeight ?? paddingBottom;
      return DEVICE_HEIGHT - statusBarHeight - paddingBottom;
    }, [maxDynamicContentSize, paddingBottom]);

    return (
      <BottomSheetModal
        detached
        ref={ref}
        index={1}
        snapPoints={[1]}
        enablePanDownToClose
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
        maxDynamicContentSize={maxDynamicContentSizeCalc}
      >
        <BottomSheetView
          style={{
            ...styles.container,
            paddingBottom: paddingBottom === 0 ? 64 : paddingBottom
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
