import React, { useEffect, useRef, useState } from "react";
import "./AnswerTimer.scss";

const AnswerTimer = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0); // Initialize the counter
  const [progressLoaded, setProgressLoaded] = useState(0); // Progress percentage
  const intervalRef = useRef(null); // Reference to store the interval ID

  useEffect(() => {
    // Set up the interval to increment the counter every second
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 0.1); // Correct incrementing logic
    }, 100);

    // Cleanup to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // Run once on component mount

  useEffect(() => {
    // Update the progress bar based on the counter
    setProgressLoaded(100 * (counter / duration)); // Calculate the progress percentage

    // When the counter reaches the duration, trigger the onTimeUp event
    if (counter >= duration) {
      clearInterval(intervalRef.current); // Stop the interval
      onTimeUp(); // Trigger the time-up callback
    }
  }, [counter]); // Dependencies ensure reactivity when state changes

  return (
    <div className="answer-timer-container">
      {/* Display the progress as a visual representation of the timer */}
      <div
        className="progress"
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 70
              ? "orange"
              : "red"
          }`,
        }}
      />
    </div>
  );
};

export default AnswerTimer;
