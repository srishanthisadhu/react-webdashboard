import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/App.css'
import Camera from './Camera'
import PositionForm from './PositionForm'
import LoginPage from './LoginPage'
import ProtectedRoute from './ProtectedRoute'
import WebSocket from './WebSocket';
import NavBar from './NavBar';


// function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <PositionForm/>
  //       <Camera />
  //     </header>
  //   </div>
  // );
// }

function App() {
  return (
    <Router>
      <div id="root">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <NavBar/>
            <div className="App-content">
              
              <header className="App-header">
                <PositionForm />
                <Camera />
                <WebSocket />
              </header>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
      </div>
    </Router>
  );
}

export default App
