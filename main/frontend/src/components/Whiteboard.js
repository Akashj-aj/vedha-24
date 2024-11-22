import React from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

const Whiteboard = () => {
  return (
    <div style={{ 
      height: "100vh",  // Changed from 80vh to 100vh
      width: "100vw",   // Added full viewport width
      margin: 0,        // Remove any margins
      padding: 0,       // Remove any padding
      position: "fixed", // Fix position to prevent scrolling
      top: 0,
      left: 0
    }}>
      <Excalidraw />
    </div>
  );
};

export default Whiteboard;