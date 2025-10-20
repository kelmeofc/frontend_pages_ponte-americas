import { useState, useEffect, useCallback } from 'react';

interface UseCountdownTimerProps {
  initialMinutes: number;
  onExpire?: () => void;
}

export const useCountdownTimer = ({ initialMinutes, onExpire }: UseCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(true);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Garante largura fixa com padding para minutos também
    return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(initialMinutes * 60);
    setIsActive(true);
  }, [initialMinutes]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            onExpire?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, onExpire]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired: timeLeft === 0,
    isActive,
    reset,
    pause,
    resume,
  };
};