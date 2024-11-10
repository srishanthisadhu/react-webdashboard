import React from 'react';

function Camera () {
    return (
        <div>
          <h2>Webcam feed for Dobot Robot</h2>
          <img 
            src="http://192.168.178.150:3051/video_feed" 
            alt="Webcam feed for Dobot Robot" 
            // style={{ width: '100%', height: 'auto' }} 
            style={{ width: '600px', height: '450px' }}
          />
        </div>
      );
}

export default Camera