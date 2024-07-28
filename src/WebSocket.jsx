import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./css/WebSocket.css"
const SOCKET_IO_URL = "http://192.168.178.45:3000/bash";
function WebSocket () {

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_IO_URL, { transports: ['websocket'] });
    newSocket.on('connect', () => console.log('Connected to WebSocket server!'));
    newSocket.on('bash_output', message => {
      setMessages(prevMessages => [...prevMessages, message.data]);
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const handleConnect = async () => {
    try {
      const response = await fetch('http://192.168.178.45:3000/connect2robot');
      if (response.ok) {
        setConnected(true);
        console.log('Connected to robot successfully');
      } else {
        throw new Error('Failed to connect');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.emit('disconnect_request');
      setConnected(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-header">ROS Process Output</h1>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <p key={index} className="message-item">{msg}</p>
        ))}
      </div>
      <div className="button-container">
        <button 
          className={`connect-button ${connected ? 'connected' : ''}`} 
          onClick={handleConnect}
          disabled={connected}
        >
          Connect
        </button>
        <button 
          className="disconnect-button" 
          onClick={handleDisconnect}
          disabled={!connected}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default WebSocket