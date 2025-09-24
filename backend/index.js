// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", // React app's URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
});

// Serve static files from React app
app.use(express.static('client/build'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');

    // Send a welcome message to the new user
    socket.emit('message', 'Welcome to the socket.io server!');

    // Listen for messages from clients
    socket.on('send_message', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('message', message); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
