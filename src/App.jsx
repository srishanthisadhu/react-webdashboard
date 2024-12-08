import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import Camera from './Camera';
import PositionForm from './PositionForm';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute';
import WebSocket from './WebSocket';
import NavBar from './NavBar';
import ButtonHeader from './ButtonHeader';
import AdminPanel from './AdminPanel';
import ChangePassword from './ChangePassword';


function App() {
  const [positions, setPositions] = useState({ x: 0, y: 0, z: 0, r: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <Router>
      <div id="root">
        {/* NavBar appears on all pages where user is authenticated */}
        {localStorage.getItem('auth') && <NavBar />}

        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Home Route */}

          <Route path="/home" element={
            <ProtectedRoute>
              <div className="App-content">
                <ButtonHeader
                  setPositions={setPositions}
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                />
                <WebSocket />
                <header className="App-header">
                  <PositionForm
                    positions={positions}
                    setPositions={setPositions}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                  <Camera />
                </header>
                
              </div>
            </ProtectedRoute>
          } />

          {/* Protected Admin Route */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <div className="App-content">
                <AdminPanel />
              </div>
            </ProtectedRoute>
          } />
          {/* Protected Change Password Route */}
          <Route path="/change-password" element={
            <ProtectedRoute>
              <div className="App-content">
                <ChangePassword />
              </div>
            </ProtectedRoute>
          } />
        </Routes>


        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
