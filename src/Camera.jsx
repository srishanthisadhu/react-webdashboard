import React from 'react';

function Camera () {
    return (
        <div>
          <h1>Webcam feed for Dobot Robot</h1>
          <img 
            src="http://192.168.178.45:3000/webcam" 
            alt="Webcam feed for Dobot Robot" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
      );
}

export default Camera