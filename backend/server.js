const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = express.Router();
const PORT = 8000 || process.ENV.PORT;

router.get("/", (req, res) => {
    res.send("Server running on " + PORT).status(200);
});
//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(router);
app.use(cors());
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
    });

    //Receive and transmit
    socket.on("message", (data) => {
        io.to(data.room).emit("message", data);
    });

    //Receive and transmit pokes
    socket.on("poke", (data) => {
        const pokedUser = users.find((user) => user.id == data.socketid);
        socket.emit("private message", {
            id: "Private",
            msg: `You have poked ${pokedUser.username}`,
        });
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
            msg: `Welcome to the server! You're currently in room ${socket.room}, you can poke other users clicking on theirs names.`,
        });
        const getUsersInRoom = users.filter((user) => user.room === room);
        io.to(room).emit("users", getUsersInRoom);
        io.emit("rooms", rooms);
        socket.to(room).emit("message", {
            id: "Server",
            msg: `User ${data.username} has joined room ${room}`,
        });
    });
});

server.listen(PORT, () => console.log(`Server on ${PORT}`));
