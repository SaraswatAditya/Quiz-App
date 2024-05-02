import React, { useEffect, useRef } from "react";

// Helper function to check if the browser is in full-screen mode
const isFullScreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};

// Helper function to check if the window is minimized (or tab is hidden)
const isWindowMinimized = () => {
  return document.hidden;
};

function WindowStatusCheck() {
  const violationCountRef = useRef(0); // Use ref to track violation count

  useEffect(() => {
    // Function to handle full-screen mode changes
    const handleFullScreenChange = () => {
      if (!isFullScreen()) {
        alert("The window is not in full-screen mode. Please enter full-screen mode.");
      }
    };

    // Function to handle visibility changes (minimized state)
    const handleVisibilityChange = () => {
      if (isWindowMinimized()) {
        violationCountRef.current++; // Increment the ref-based violation count
        alert(
          `The window has been minimized or the tab is not active. You have violated the rules ${violationCountRef.current} times.`
        );
      }
    };

    // Add event listeners
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial checks on component mount
    handleFullScreenChange(); // Check full-screen status
    handleVisibilityChange(); // Check if window is minimized

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeventListener("fullscreenchange", handleFullScreenChange);
      document.removeventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Empty dependency array to ensure effect runs once on component mount

  return null; // This component doesn't need to render anything visually
}

export default WindowStatusCheck;
