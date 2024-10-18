import React, { useState, useEffect } from 'react';

// Define the global hostname property
const hostname = 'http://192.168.178.150:3000';

function PositionForm() {
  const [positions, setPositions] = useState({
    x: 0.0,
    y: 0.0,
    z: 0.0,
    r: 0.0,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchInitialPositions();
  }, []);

  // Function to fetch initial positions
  const fetchInitialPositions = async () => {
    try {
      const response = await fetch(`${hostname}/getHome`);
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
      setSuccessMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Fetch initial positions error:', error);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  const handleMove = async (field, delta) => {
    const updatedPositions = { ...positions };

    // Update the specific field based on the delta
    updatedPositions[field] = parseFloat(positions[field]) + delta;

    // Input validation (can be improved)
    if (isNaN(updatedPositions[field])) {
      setErrorMessage(`${field.toUpperCase()} must be a number.`);
      return;
    }

    setPositions(updatedPositions);

    try {
      const response = await fetch(`${hostname}/move2point`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPositions),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccessMessage(data.message); // Set success message from response
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("Could not move to Set position. Coordinates out of scope."); // Display error to user
      setSuccessMessage('');
    }
  };

  const handleHome = async () => {
    try {
      const response = await fetch(`${hostname}/home`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccessMessage(data.message); // Set success message from response
      setPositions({ x: 150, y: 0, z: 100, r: 0 });
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    fetchInitialPositions();
  };

  return (
    <div>
      <h2>Robot Arm Position</h2>
      <form>
        {Object.keys(positions).map((field) => (
          <div key={field}>
            <button onClick={(e) => { handleMove(field, -1); e.preventDefault(); }}>-</button>
            <label htmlFor={field}>{field.toUpperCase()}</label>
            <button onClick={(e) => { handleMove(field, 1); e.preventDefault(); }}>+</button>
            <input
              type="number"
              id={field}
              name={field}
              value={positions[field]}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                if (!isNaN(newValue)) {
                  setPositions({ ...positions, [field]: newValue });
                }
              }}
              className="input-width"
            />
          </div>
        ))}

        {/* Error message and buttons */}
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <div>
          <button type="button" onClick={handleMove}>Move</button>
          <button type="button" onClick={handleHome}>Home</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default PositionForm;