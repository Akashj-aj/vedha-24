import React from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

const Whiteboard = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Excalidraw Whiteboard</h1>
      <div style={{ height: "80vh", border: "1px solid #ccc" }}>
        <Excalidraw />
      </div>
    </>
  );
};

export default Whiteboard;