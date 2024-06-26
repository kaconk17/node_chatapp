const { createServer } = require('http');
const { fileURLToPath } = require('url');
const { dirname, join } = require('path');
const { Server } = require('socket.io');

const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);




//const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname,'chat.html'));
});

io.on('connection', async (Socket)=>{
    console.log('a user connected');
    Socket.on('chat', (msg)=>{
        console.log('Message: '+msg);
    });
    Socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});