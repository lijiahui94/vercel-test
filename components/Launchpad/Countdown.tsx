"use client";
// import { getLaunchOptionList } from '@/hooks/useLaunchpad';
import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetTimestamp: number; // 预定的时间戳
}

const Countdown: React.FC<CountdownProps> = ({ targetTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳
      const timeDifference = targetTimestamp - currentTime; // 计算时间差

      if (timeDifference <= 0) {
        clearInterval(interval); // 倒计时结束，清除定时器
        setRemainingTime(0);
        if (timeDifference == 0) {
          // getLaunchOptionList();
        }
      } else {
        // getLaunchOptionList();
        setRemainingTime(timeDifference); // 更新剩余时间
      }
    }, 1000);

    return () => {
      clearInterval(interval); // 组件卸载时清除定时器
    };
  }, [targetTimestamp]);

  // 格式化时间
  const formatTime = (time: number): string => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
  };
  return (
    <div className="text-app text-right font-medium">
      {formatTime(remainingTime)}
    </div>
  );
};

export default Countdown;
