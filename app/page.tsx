"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
// import Lottie from "lottie-react";
// import heroAnim from "../public/hero.json";

const TARGET_DATE = new Date("2025-08-05T10:00:00").getTime();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isArrived, setIsArrived] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        setIsArrived(true);
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    };

    updateTime(); // initial calculation
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 flex flex-col items-center justify-center text-white px-4 py-8 text-center space-y-6">
      {isArrived ? (
        <>
          <Confetti width={width} height={height} />
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-lg">
            <h1 className="text-4xl font-bold animate-pulse">
              🎉 The wait is over!
            </h1>
            <br />
            <p className="text-2xl"> Pursharth has arrived in BLR! ✈️🏙️</p>
          </div>
        </>
      ) : timeLeft === null ? (
        <p className="text-xl animate-pulse opacity-70">Loading countdown...</p>
      ) : (
        <>
          {/* <Lottie animationData={heroAnim} className="w-48 sm:w-64 mb-4" /> */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Countdown to Pursharth's Arrival ✨
            </h1>
            <br />
            <p className="text-4xl font-mono text-yellow-400">
              {formatTime(timeLeft)}
            </p>
            <p className="text-lg opacity-80">
              Until he lands in our city Bangalore🌆
            </p>
          </div>
        </>
      )}
    </main>
  );
}
