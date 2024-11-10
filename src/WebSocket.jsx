import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import "./css/WebSocket.css";

const SOCKET_IO_URL = "http://192.168.178.150:3050/bash";

function WebSocket() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_IO_URL, { transports: ['websocket'] });
    newSocket.on('connect', () => console.log('Connected to WebSocket server!'));
    
    // Handle WebSocket messages
    newSocket.on('bash_output', message => {
      setMessages(prevMessages => [...prevMessages, message.data]);

      // Check if the message contains "Device started"
      if (message.data.includes('Dobot Magician control stack has been launched correctly')) {
        toast.success('Connected to Robot');
      }
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const handleConnect = async () => {
    try {
      const response = await fetch('http://192.168.178.150:3050/connect2robot');
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

  const clearLog = () => {
    setMessages([]); // Reset the messages state to clear the terminal window
  };

    return (
    <div className="app-container">
      <div className="header-container">
        <h2 className="app-header">Dobot Connection Logs</h2>
        <button className="clear-log-button" onClick={clearLog}>
          Clear Log
        </button>
      </div>
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

export default WebSocket;