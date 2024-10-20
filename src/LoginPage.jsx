import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/LoginPage.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Replacing useHistory with useNavigate

const handleLogin = async () => {
  // Create an AbortController instance
  const controller = new AbortController();
  const { signal } = controller;

  // Create a timeout that aborts the fetch request after 20 seconds
  const timeoutId = setTimeout(() => {
    controller.abort(); // Aborts the fetch request
  }, 10000);

  try {
    const response = await fetch('http://192.168.178.150:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      signal: signal, // Attach the signal to the fetch request
    });

    // Clear the timeout once the response is received
    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.ok && data.message === 'Authentication successful') {
      const expires = new Date();
      expires.setTime(expires.getTime() + 15 * 60 * 1000); // Set 15-minute expiry
      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: true, expires: expires.toISOString() })
      );
      toast.success('Login successful!');
      navigate('/home'); // Navigate to home on success
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      toast.error('Login request timed out after 20 seconds.');
    } else {
      toast.error('An error occurred during authentication. Please try again.');
      console.error('Login error:', error);
    }
  }
};

return (
    <div className="login-container">
      <div className="logo-container">
        <img src="src\assets\logo.png" alt="University Logo" className="login-logo" />
      </div>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin} className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
