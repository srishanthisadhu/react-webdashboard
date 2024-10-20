import React from 'react';
import "./css/ButtonHeader.css"

function ButtonHeader({ setPositions, setErrorMessage, setSuccessMessage }) {
  const handleHome = async () => {
    console.log(setPositions)
    try {
      const response = await fetch('http://192.168.178.150:3000/home', {
        method: 'GET',
      });
      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccessMessage(data.message); // Set success message from response
      setPositions({ x: 150 , y: 0, z: 100, r: 0 });
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const onStopClick = async () => {
    console.log("Stop clicked")
    alert("Stopping all process on robot")
  }

  return (
    <div className="button-header">
      <div className="button-container">
        <img src="src/assets/home-icon.png" alt="Home" onClick={handleHome} />
        <label className="label">Home</label>
      </div>
      <div className="button-container">
        <img src="src/assets/emergency-stop.png" alt="Emergency Stop" onClick={onStopClick} />
        <label className="label">Emergency Stop</label>
      </div>
    </div>
  );
}

export default ButtonHeader;