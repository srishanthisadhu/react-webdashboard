import React from 'react';
import "./css/ButtonHeader.css"

function ButtonHeader() {
  const onHomeClick = async () => {
    console.log("Home clicked");
    alert("Homing procedure started")
  };
  const onStopClick = async () => {
    console.log("Stop clicked")
    alert("Stopping all process on robot")
  }

  return (
    <div className="button-header">
      <div className="button-container">
        <img src="src/assets/home-icon.png" alt="Home" onClick={onHomeClick} />
        <label className="label">Home</label>
      </div>
      <div className="button-container">
        <img src="src/assets/emergency-stop.png" alt="Emergency Stop" onClick={onHomeClick} />
        <label className="label">Emergency Stop</label>
      </div>
    </div>
  );
}

export default ButtonHeader;