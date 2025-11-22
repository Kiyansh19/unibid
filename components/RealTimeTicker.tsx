import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
  onEnd?: () => void;
}

const RealTimeTicker: React.FC<Props> = ({ targetDate, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState<string>('Loading...');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Urgency: less than 1 hour
        setIsUrgent(difference < 3600000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          // Show seconds when under an hour
          setTimeLeft(`${minutes}m ${seconds.toString().padStart(2, '0')}s`);
        }
      } else {
        setTimeLeft('Ended');
        if (onEnd) onEnd();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onEnd]);

  return (
    <span className={`font-mono font-bold tracking-tight ${
      timeLeft === 'Ended' 
        ? 'text-slate-400' 
        : isUrgent 
          ? 'text-secondary-600 dark:text-secondary-400 animate-pulse' 
          : 'text-slate-700 dark:text-slate-200'
    }`}>
      {timeLeft}
    </span>
  );
};

export default RealTimeTicker;