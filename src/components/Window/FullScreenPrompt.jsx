import React, { useEffect } from "react";
import "../Window/Window.scss";

// Helper function to enable full-screen mode
const requestFullScreen = () => {
  const element = document.documentElement; // Selects the entire document

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
};

// Helper function to check if the browser is in full-screen mode
const isFullScreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};

function FullScreenPrompt({ onFullScreenClick }) {
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!isFullScreen()) {
        alert(
          "You've exited full-screen mode. Please enter full-screen again for the best experience."
        );
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange); // Corrected cleanup
    };
  }, []); // Empty dependency array to ensure this effect runs once on component mount

  return (
    <button
      className="promptButton"
      onClick={() => {
        requestFullScreen(); // Enable full-screen mode
        if (typeof onFullScreenClick === "function") {
          onFullScreenClick(); // Call the prop callback, if provided
        }
      }}
    >
      Click here to enter full-screen mode
    </button>
  );
}

export default FullScreenPrompt;
