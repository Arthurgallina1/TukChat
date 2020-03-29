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
    socket.emit('message', 'Welcome to Chat');
    //broadcast when a user connects
    socket.on('loginMessage', (id) => {
        console.log(id + ' logou')
        socket.broadcast.emit('userLogin', `${id}`);
    })
    
    socket.on('message', ({id, msg}) => {
        console.log('received message: '+ id + ' : ' + msg);
        io.emit('message', ({id, msg}));
    })

    socket.on('disconnect', () => {
        //io.emit pra todos
        console.log('user disconnected')
        io.emit('message', 'User Joao has left the chat');
    })

    //Listen chatmsgs
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })





})



const PORT = 8000 || process.ENV.PORT;

server.listen(PORT, () => console.log(`Server on ${PORT}`));