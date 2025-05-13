import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from '@utils';
import { AlertBanner } from './alert-banner';
import { TOAST_DEFAULT_DURATION } from './constants';
import { ToastOptions, ToastType } from './types';

export const ToastWrapper = forwardRef((_, ref) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { height: WINDOW_HEIGHT } = useWindowDimensions();
  const INITIAL_POSITION = WINDOW_HEIGHT + scale(100);
  const VISIBLE_POSITION = WINDOW_HEIGHT - scale(56) - bottomInset;

  const defaultOptions: Omit<ToastOptions, 'duration'> = useMemo(
    () => ({
      text: '',
      type: ToastType.Success
    }),
    []
  );

  const [toastVisible, setToastVisible] = useState(false);
  const [options, setOptions] =
    useState<Omit<ToastOptions, 'duration'>>(defaultOptions);
  const duration = useRef(TOAST_DEFAULT_DURATION);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const translateY = useSharedValue(INITIAL_POSITION);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const hide = useCallback(() => {
    translateY.value = withSpring(
      INITIAL_POSITION,
      {
        damping: 15,
        stiffness: 150
      },
      () => {
        runOnJS(setToastVisible)(false);
        runOnJS(setOptions)(defaultOptions);
      }
    );
    clearTimer();
  }, [clearTimer, defaultOptions, translateY, INITIAL_POSITION]);

  const startTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      hide();
    }, duration.current);
  }, [duration, hide]);

  const show = useCallback(
    (params: ToastOptions) => {
      setOptions({ ...defaultOptions, ...params });
      duration.current = params.duration || TOAST_DEFAULT_DURATION;
      setToastVisible(true);
      translateY.value = withSpring(VISIBLE_POSITION, {
        damping: 15,
        stiffness: 150
      });
      startTimer();
    },
    [VISIBLE_POSITION, defaultOptions, startTimer, translateY]
  );

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide
      }),
      [hide, show]
    )
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  if (!toastVisible) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 1000
        },
        animatedStyle
      ]}
    >
      <AlertBanner {...options} />
    </Animated.View>
  );
});
