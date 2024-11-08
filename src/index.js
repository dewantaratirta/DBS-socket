const express = require('express');
const { createServer } = require('node:http');
const dotenv = require('dotenv');
const { join } = require('node:path');
const { Server } = require('socket.io');
const socketController = require('./socket-controller');

const app = express();
const server = createServer(app);
const ENV = dotenv.config().parsed;
const io =  new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(ENV.port, () => {
  console.log(`server running at http://localhost:${ENV.port}`);
});

var user = 0;
io.on('connection', (socket) => {
    user++;
    console.log('a user connected. total_user ' + user);
    socketController(socket, io);

    socket.on('disconnect', () => {
        user--;
        console.log('user disconnected. total_user ' + user);
    });
});