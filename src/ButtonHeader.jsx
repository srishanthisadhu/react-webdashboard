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
      toast.success(data.message);
      setSuccessMessage(data.message);
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
      toast.success(data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred');
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