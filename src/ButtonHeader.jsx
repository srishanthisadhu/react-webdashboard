import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./css/ButtonHeader.css";
import PickupDropForm from './PickupDropForm';

function ButtonHeader({ setPositions, setErrorMessage, setSuccessMessage }) {
  const [showPickupDropForm, setShowPickupDropForm] = useState(false);

  const handleHome = async () => {
    console.log(setPositions);
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);
    try {
      const response = await fetch('http://192.168.178.150:3050/home', {
        method: 'GET',
        signal: signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
      // toast.success(data.message);
      toast.success('The homing procedure has started. Wait until the arm stops moving and the led stops flashing blue and turns green.')
      setSuccessMessage(data.message);
      setPositions({ x: 0, y: 0, z: 0, r: 0 });
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

  // const fetchInitialPositions = async () => {
  //   // Create an AbortController instance
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   // Create a timeout that aborts the fetch request after 20 seconds
  //   const timeoutId = setTimeout(() => {
  //     controller.abort(); // Aborts the fetch request
  //   }, 20000);
  //   try {
  //     // Make the fetch request with the signal from AbortController
  //     const response = await fetch('http://192.168.178.150:3050/getHome', {
  //       signal: signal, // Attach the signal to the fetch request
  //     });
  //     // Clear the timeout once the response is received
  //     clearTimeout(timeoutId);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setPositions({
  //       x: Math.round(data.x),
  //       y: Math.round(data.y),
  //       z: Math.round(data.z),
  //       r: Math.round(data.r),
  //     });
  //     // toast.success('Fetched Robot position successfully!');
  //     // setSuccessMessage('');
  //     // setErrorMessage('');
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       console.error('Fetch aborted due to timeout');
  //       toast.error('Could not fetch Robot position || Timeout.');
  //       // setErrorMessage('Request timed out');
  //     } else {
  //       console.error('Fetch initial positions error:', error);
  //       toast.error('Failed to fetch robot positions.');
  //       setErrorMessage(error.message);
  //     }
  //     // setSuccessMessage('');
  //   }
  // };

  const onStopClick = async () => {
    console.log("Stop clicked");
    try {
      const response = await fetch('http://192.168.178.150:3050/cancel_goal', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
      toast.success('Robot movement stopped successfully.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occured while stopping robot.');
    }
  };

  const onPickupDropClick = () => {
    setShowPickupDropForm((prev) => !prev); 
  };

  const handleFormSubmit = () => {
    console.log("Form submitted, closing form");
    setShowPickupDropForm(false);
  };

  return (
    <div>
      <div className="button-header">
        <div className="button-container">
          <img src="src/assets/home-icon.png" alt="Home" className="button-icon" onClick={handleHome} />
          <label className="label">Home</label>
        </div>
        <div className="button-container">
          <img src="src/assets/emergency-stop.png" alt="Emergency Stop" className="button-icon" onClick={onStopClick} />
          <label className="label">Emergency Stop</label>
        </div>
        <div className="button-container">
          <img
            src="src/assets/pickup-drop.png" alt="Pick/Place" className="button-icon" onClick={onPickupDropClick} />
          <label className="label">Pick/Place</label>
        </div>
      </div>
      {showPickupDropForm && (
        <PickupDropForm onSubmit={handleFormSubmit} /> 
      )}
    </div>
  );
}

export default ButtonHeader;