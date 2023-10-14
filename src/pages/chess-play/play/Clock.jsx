import React, { useState, useEffect } from 'react';

const Clock = ({ initialTime, isRunning, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    let timer;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      onTimeout(); // Call the callback function when the time runs out
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime, onTimeout]);

  return (
    <div className="chess-clock">
      <p>Time Remaining: {Math.floor(remainingTime / 60)} minutes {remainingTime % 60} seconds</p>
    </div>
  );
};

export default Clock;