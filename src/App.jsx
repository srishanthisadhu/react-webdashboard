import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Camera from './Camera'
import PositionForm from './PositionForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PositionForm/>
        <Camera />
      </header>
    </div>
  );
}

export default App
