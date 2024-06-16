import React, { useState, useEffect  } from 'react';

function PositionForm() {
    const [positions, setPositions] = useState({
        x: 0.0,
        y: 0.0,
        z: 0.0,
        r: 0.0
      });

      const [errorMessage, setErrorMessage] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      
      
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input Validation (Basic) - adjusted for parseFloat
    if (!value || (name !== 'r' && isNaN(parseFloat(value)))) {
      setErrorMessage(`${name.toUpperCase()} must be a number.`);
      return; // Don't update if invalid
    }

    setErrorMessage(''); // Clear error on valid input
    setPositions({
      ...positions,
      [name]: parseFloat(value) // Parse immediately
    });
  };

  const handleMove = async () => {
    const payload = {
      x: parseFloat(positions.x),
      y: parseFloat(positions.y),
      z: parseFloat(positions.z),
      r: parseFloat(positions.r) 
    };
    console.log(payload)
    try {
      const response = await fetch('http://192.168.178.45:3000/move2point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      setErrorMessage(error.message); // Display error to user
      setSuccessMessage('');
    }
  };

  const handleReset = () => {
    setPositions({ x: '', y: '', z: '', r: '' });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div>
      <h1>Robot Arm Position</h1>
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

  {/* Error message and buttons */}
  {errorMessage && <div className="error">{errorMessage}</div>} 
  {successMessage && <div className="success">{successMessage}</div>}
  <div>
    <button type="button" onClick={handleMove}>Move</button>
    <button type="button" onClick={handleReset}>Reset</button>
  </div>
</form>

    </div>
  );
}

export default PositionForm;
