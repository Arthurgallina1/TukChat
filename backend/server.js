const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// const adminNamespace = io.of('/admin');

//Set static folder
app.use(express.static(path.join(__dirname, "public")));
//Client connection
let connections = [];
let users = [];
let rooms = [];

io.on("connection", (socket) => {
    connections.push(socket.id);

    console.log(`${connections.length} Online ATM!!!`);

    //Disconnect
    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf(socket.username), 1);
        socket.broadcast.emit("users", users);
        console.log(users);
        // console.log(`Disconnect ${connections.length} Online ATM!!!`);
        // console.log(users);
    });

    //Receive and transmit
    socket.on("message", (data) => {
        io.to(data.room).emit("message", data);
    });

    //Receive and transmit
    socket.on("poke", (data) => {
        console.log(data);
        const pokedUser = users.find((user) => user.id == data.socketid);
        // io.to(pokedUser.room).emit("message", {
        //     id: "Server",
        //     msg: `User ${data.id} has poked ${pokedUser.username}`,
        // });
        io.to(data.socketid).emit("private message", {
            id: "Private",
            msg: `User ${data.id} has poked you`,
        });
    });

    // New User
    socket.on("newuser", (data) => {
        let room = data.room;
        if (!rooms.includes(room)) {
            rooms.push(room);
        }
        socket.username = data.username;
        socket.room = room;
        socket.join(room);
        users.push({
            username: socket.username,
            id: socket.id,
            room: socket.room,
        });
        socket.emit("message", {
            id: "Server",
            msg:
                "Welcome to the server! You're currently in room " +
                socket.room,
        });
        const getUsersInRoom = users.filter((user) => user.room === room);
        io.to(room).emit("users", getUsersInRoom);
        io.emit("rooms", rooms);
        io.emit("message", {
            id: "Server",
            msg: `User ${data.username} has joined room ${room}`,
        });
    });
});

const PORT = 8000 || process.ENV.PORT;

server.listen(PORT, () => console.log(`Server on ${PORT}`));
