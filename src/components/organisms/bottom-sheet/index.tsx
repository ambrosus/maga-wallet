import { forwardRef, PropsWithChildren, useCallback, useMemo } from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@components/atoms';
import { COLORS, DEVICE_HEIGHT } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';

type BottomSheetProps = PropsWithChildren &
  BottomSheetModalProps & {
    swiperIconVisible?: boolean;
    contentContainerStyle?: ViewStyle;
    modalStyles?: ViewStyle;
    title?: string;
    onChange?: (index: number) => void;
  };

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      maxDynamicContentSize,
      contentContainerStyle = {},
      swiperIconVisible = true,
      modalStyles = {},
      title,
      children,
      onChange
    },
    ref
  ) => {
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
        backgroundStyle={[styles.background, modalStyles]}
        handleIndicatorStyle={
          swiperIconVisible ? styles.indicator : styles.indicatorHidden
        }
        maxDynamicContentSize={maxDynamicContentSizeCalc}
        onChange={onChange}
      >
        <BottomSheetView
          style={[
            styles.container,
            contentContainerStyle,
            { paddingBottom: paddingBottom === 0 ? 64 : paddingBottom }
          ]}
        >
          {title && (
            <Typography
              fontSize={scale(20)}
              fontFamily="Onest600SemiBold"
              color={COLORS.textPrimary}
              align="center"
            >
              {title}
            </Typography>
          )}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
