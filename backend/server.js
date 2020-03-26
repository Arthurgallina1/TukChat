const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Client connection
io.on('connection', socket => {
    console.log(`New WS connection`);
})

const PORT = 8000 || process.ENV.PORT;

server.listen(PORT, () => console.log(`Server on ${PORT}`));