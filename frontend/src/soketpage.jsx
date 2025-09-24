// src/App.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the server
const socket = io('http://localhost:5000');

export function SoketUi() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the connection when component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    // Send a message to the server
    socket.emit('send_message', message);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Socket.io Chat</h1>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

