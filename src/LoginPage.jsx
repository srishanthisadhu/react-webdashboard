import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css'
const hostname = 'http://192.168.178.150:3000';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Replacing useHistory with useNavigate

//   const handleLogin = async () => {
//     // Assume some authentication logic here
//     console.log(username)
//     console.log(password)
//     const isAuthenticated = username === 'user' && password === 'password'; // Example placeholder

//     if (isAuthenticated) {
//         const expires = new Date();
//         expires.setTime(expires.getTime() + (15 * 60 * 1000)); // Set expiration time to 15 minutes
//         localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, expires: expires.toISOString() }));
//         navigate('/home');
//     } else {
//         alert('Invalid credentials');
//     }
//   };

const handleLogin = async () => {
    try {
      const response = await fetch(`${hostname}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Authentication successful') {
        const expires = new Date();
        expires.setTime(expires.getTime() + (15 * 60 * 1000)); 
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, expires: expires.toISOString() }));
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('An error occurred during authentication. Please try again.');
      console.error(error); 
    }
  };

  // const handleLogin = async () => {
  //   const expires = new Date();
  //       expires.setTime(expires.getTime() + (15 * 60 * 1000)); 
  //       localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, expires: expires.toISOString() }));
  //       navigate('/home');
  // }

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
