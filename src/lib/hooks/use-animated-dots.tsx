import {
  useState,
  useCallback,
  useEffect,
  memo,
  JSX,
  MemoExoticComponent
} from 'react';
import { Typography } from '@components/atoms';
import { FontFamily } from '@components/atoms/typography/types';
import { ANIMATION_DELAY, COLORS, FONT_SIZE } from '@constants';

const DOTS_ARRAY = ['.', '..', '...'];

type AnimatedDotsHook = {
  dotIndex: number;
  setIsAnimating: (isAnimating: boolean) => void;
  dots: string;
  DotsComponent: MemoExoticComponent<() => JSX.Element>;
};

type AnimatedDotsArgs = {
  fontSize?: number;
  color?: string;
  fontFamily?: FontFamily;
};

/**
 * Custom hook that manages animated dots for loading indicators by cycling
 * through a sequence of dots ('.', '..', '...').
 *
 * @param {AnimatedDotsArgs} args - Optional arguments to customize appearance
 * @returns {AnimatedDotsHook} An object containing the dot index, animation control,
 * current dots string, and a memoized component for rendering
 */
export function useAnimatedDots({
  fontSize = FONT_SIZE.default,
  fontFamily = 'Onest600SemiBold',
  color = COLORS.textPrimary
}: AnimatedDotsArgs = {}): AnimatedDotsHook {
  const [dotIndex, setDotIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateDots = useCallback(() => {
    if (isAnimating) setDotIndex((prev) => (prev + 1) % 3);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(animateDots, ANIMATION_DELAY);
    return () => clearInterval(interval);
  }, [animateDots]);

  const DotsComponent = memo(() => (
    <Typography fontSize={fontSize} fontFamily={fontFamily} color={color}>
      {DOTS_ARRAY[dotIndex]}
    </Typography>
  ));

  return {
    dotIndex,
    setIsAnimating,
    dots: DOTS_ARRAY[dotIndex],
    DotsComponent
  };
}
