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
let messages = [];
let users = [];

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
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });

    // New User
    socket.on("newuser", (data) => {
        socket.username = data;
        users.push({ username: socket.username, id: socket.id });
        socket.emit("message", {
            username: "Server",
            msg: "Welcome to the server",
        });
        io.emit("users", users);
        console.log(users);
    });
});

//default namespace
// io.on("connection", (socket) => {
//     socket.emit("message", { id: "Server", msg: "Welcome to the chat" });
//     socket.emit("loginMessage", onlineList);
//     socket.join("room", () => {
//         let rooms = Object.keys(socket.rooms);
//         // console.debug("Rooms", rooms);
//     });
//     socket.to("room").emit("event", "someroom");
//     //broadcast when a user connects
//     socket.on("loginMessage", (id) => {
//         onlineList.push(id);
//         console.debug("Logados: ", onlineList);
//         // socket.broadcast.emit("onlineList", onlineList);
//         socket.broadcast.emit("userLogin", `${id}`);
//     });

//     socket.on("message", ({ id, msg }) => {
//         messages.push({ id, msg });
//         console.log("received message: " + id + " : " + msg);
//         io.emit("message", { id, msg });
//     });

//     socket.on("disconnect", () => {
//         //io.emit pra todos
//         console.log(`user ${socket.id} has disconnected`);
//         io.emit("message", "User Joao has left the chat");
//     });
//     // console.log(onlineList)
// });

const PORT = 8000 || process.ENV.PORT;

server.listen(PORT, () => console.log(`Server on ${PORT}`));
