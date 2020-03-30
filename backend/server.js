const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// const adminNamespace = io.of('/admin');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Client connection
let connectionList = [];

//default namespace
io.on('connection', socket => {

    socket.emit('message', ({id: 'Server', msg: 'Welcome to the chat'}));

    socket.join('room', () => {
        let rooms = Object.keys(socket.rooms)
        console.log(rooms)
    })
    socket.to('room').emit('event', 'someroom')
    //broadcast when a user connects
    socket.on('loginMessage', (id) => {
        connectionList.push(id)
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
    // console.log(connectionList)

})



const PORT = 8000 || process.ENV.PORT;

server.listen(PORT, () => console.log(`Server on ${PORT}`));