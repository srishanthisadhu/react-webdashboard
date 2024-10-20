import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for styling
import './css/App.css'
import Camera from './Camera'
import PositionForm from './PositionForm'
import LoginPage from './LoginPage'
import ProtectedRoute from './ProtectedRoute'
import WebSocket from './WebSocket';
import NavBar from './NavBar';
import ButtonHeader from './ButtonHeader';


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
  const [positions, setPositions] = useState({ x: 0, y: 0, z: 0, r: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
            <ButtonHeader
        setPositions={setPositions}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />

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
              <WebSocket />

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

export default App
