import React, { useState, useEffect  } from 'react';
import { toast } from 'react-toastify';

function PositionForm({ positions, setPositions, errorMessage, successMessage, setErrorMessage, setSuccessMessage }) {
    useEffect(() => {
        fetchInitialPositions();
    }, []); 
  
  // Function to fetch initial positions
  const fetchInitialPositions = async () => {
    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;
    // Create a timeout that aborts the fetch request after 20 seconds
    const timeoutId = setTimeout(() => {
      controller.abort(); // Aborts the fetch request
    }, 20000);
    try {
      // Make the fetch request with the signal from AbortController
      const response = await fetch('http://192.168.178.150:3000/getHome', {
        signal: signal, // Attach the signal to the fetch request
      });
      // Clear the timeout once the response is received
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPositions({
        x: Math.round(data.x),
        y: Math.round(data.y),
        z: Math.round(data.z),
        r: Math.round(data.r),
      });
      toast.success('Fetched Robot position successfully!');
      // setSuccessMessage('');
      // setErrorMessage('');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch aborted due to timeout');
        toast.error('Could not fetch Robot position || Timeout.');
        // setErrorMessage('Request timed out');
      } else {
        console.error('Fetch initial positions error:', error);
        toast.error('Failed to fetch robot positions.');
        setErrorMessage(error.message);
      }
      // setSuccessMessage('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Directly store the input value to state without parsing it as a number
    setPositions(prevPositions => ({
      ...prevPositions,
      [name]: value // Store the value as string temporarily
    }));
  
    // Validate the input: Check if it's either empty, a valid floating number, or a lone minus sign
    if (value !== '' && value !== '-' && isNaN(parseFloat(value))) {
      setErrorMessage(`${name.toUpperCase()} must be a number.`);
    } else {
      setErrorMessage(''); // Clear error if the current input is potentially valid
    }
  };
    
  const handleMove = async () => {
    const payload = {
      x: parseFloat(positions.x),
      y: parseFloat(positions.y),
      z: parseFloat(positions.z),
      r: parseFloat(positions.r),
    };
    console.log(payload);
    // Create an AbortController instance
    const controller = new AbortController();
    const { signal } = controller;
    // Create a timeout that aborts the fetch request after 20 seconds
    const timeoutId = setTimeout(() => {
      controller.abort(); // Aborts the fetch request
    }, 20000);
    try {
      // Make the fetch request with the signal from AbortController
      const response = await fetch('http://192.168.178.150:3000/move2point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: signal, // Attach the signal to the fetch request
      });
      // Clear the timeout once the response is received
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      // setSuccessMessage(data.message); // Set success message from response
      toast.success('Successfully moved to the set position!')
      // setErrorMessage('');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch aborted due to timeout');
        // setErrorMessage('Request timed out');
        toast.error('Failed to move 2 point | Timeout')
      } else {
        console.error('Error:', error);
        // setErrorMessage('Could not move to Set position. Coordinates out of scope.');
        toast.error('Could not move to Set position. Coordinates out of scope.')
      }
      setSuccessMessage('');
    }
  };  

  const handleReset = () => {
    fetchInitialPositions();
    // setPositions({ x: '', y: '', z: '', r: '' });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div>
      <h2>Robot Arm Position</h2>
      <form>
  <div>
    <label htmlFor="x">X:</label>
    <input type="number" id="x" name="x" value={positions.x} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="y">Y:</label>
    <input type="number" id="y" name="y" value={positions.y} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="z">Z:</label>
    <input type="number" id="z" name="z" value={positions.z} onChange={handleChange} />
  </div>
  <div>
    <label htmlFor="r">R:</label>
    <input type="number" id="r" name="r" value={positions.r} onChange={handleChange} /> 
  </div>
  <div>
    <button type="button" onClick={handleMove}>Move</button>
    {/* <button type="button" onClick={handleHome}>Home</button> */}
    <button type="button" onClick={handleReset}>Current Position</button>
  </div>
</form>
{/* Toast container for displaying notifications */}
{/* <ToastContainer /> */}

    </div>
  );
}

export default PositionForm;
