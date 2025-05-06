import React, { useCallback, useRef, useState } from 'react';

interface UseTimerOptions {
  duration: number; // on seconds
  onStart?: () => void;
  onEnd?: () => void;
}

export function useTimer({ duration, onStart, onEnd }: UseTimerOptions) {
  const [timer, setTimer] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const startTimestampRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimeLeft = useCallback(() => {
    if (!startTimestampRef.current) return duration;
    const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
    return Math.max(duration - elapsed, 0);
  }, [duration]);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimerInterval();
    setIsActive(false);
    startTimestampRef.current = null;
  }, [clearTimerInterval]);

  const start = useCallback(() => {
    clearTimerInterval();
    setTimer(duration);
    setIsActive(true);
    startTimestampRef.current = Date.now();
    if (onStart) onStart();
    intervalRef.current = setInterval(() => {
      const left = getTimeLeft();
      setTimer(left);
      if (left === 0) {
        setIsActive(false);
        clearTimerInterval();
        if (onEnd) onEnd();
      }
    }, 250);
  }, [clearTimerInterval, duration, getTimeLeft, onEnd, onStart]);

  // Clean up on unmount
  React.useEffect(() => () => clearTimerInterval(), [clearTimerInterval]);

  const min = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timer % 60).toString().padStart(2, '0');

  return { min, sec, timer, isActive, start, stop };
}
