import React from 'react';
import { toast } from 'react-toastify';
import "./css/ButtonHeader.css"

function ButtonHeader({ setPositions, setErrorMessage, setSuccessMessage }) {
  const handleHome = async () => {
    console.log(setPositions);
    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;
  
    // Create a timeout that aborts the fetch request after 20 seconds
    const timeoutId = setTimeout(() => {
      controller.abort(); // Aborts the fetch request
    }, 20000);
    try {
      // Make the fetch request with the signal from AbortController
      const response = await fetch('http://192.168.178.150:3050/home', {
        method: 'GET',
        signal: signal,  // Attach the signal to the fetch request
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
      toast.success(data.message);
      setSuccessMessage(data.message); // Set success message from response
      setPositions({ x: 150, y: 0, z: 100, r: 0 });
      setErrorMessage('');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch aborted due to timeout');
        toast.error('Failed to perform homing due to timeout');
      } else {
        console.error('Error:', error);
        toast.error(error.message || 'An error occurred');
      }
    }
  };

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