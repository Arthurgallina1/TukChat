import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";
import "./styles.css";

const socket = openSocket("http://localhost:8000");

export default function Main() {
    const { id } = useParams();
    const [usersOnline, setUsersOnline] = useState([]);
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("connect", function () {
            // socket.join
            socket.emit("newuser", `${id}`);

            // socket.on("message", ({ msg, id }) => {
            //     console.log("msg rcved" + msg);
            //     setChat([...chat, { msg, id }]);
            // });

            // socket.on("event", () => {
            //     console.log("entrei na room ");
            // });
            // socket.on("loginMessage", (userlist) => {
            //     setUsersOnline([userlist]);
            //     console.debug("User List", userlist);
            // });

            // socket.on("userLogin", (user) => {
            //     console.debug("userLogin", `user ${user} has logged`);
            //     // setUsersOnline(...usersOnline, id);
            //     setUsersOnline([...usersOnline, user]);
            // });

            // socket.on("message", ({ msg, id }) => {
            //     setChat([...chat, { msg, id }]);
            // });
        });

        //broadcast when a user connects
        // socket.broadcast.emit() //broadcast emit pra todo mundo menos que esta
    }, []);

    useEffect(() => {
        socket.on("message", ({ msg, id }) => {
            // console.log('msg recebida ' + msg )
            setChat([...chat, { msg, id }]);
        });
    }, [chat]);

    useEffect(() => {
        socket.on("user connected", (users) => {
            // setUsersOnline([...usersOnline, user]);
            setUsersOnline([users]);
        });
    }, [usersOnline]);

    function handleSubmit() {
        socket.emit("message", { id, msg });
        setMsg("");
    }

    return (
        <div>
            <div className='main'>
                <h3>SocketChat</h3>
                <h4>Welcome, {id}!</h4>
                <div className='chat-wrapper'>
                    <div className='online-section'>
                        <ul>
                            <p>ONLINE NOW</p>
                            <li>{id}</li>
                            {usersOnline.map((user) => (
                                <li key={user}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='chat-section'>
                        <div className='chat-box'>
                            {chat.map((msg) => {
                                return (
                                    <p key={`${msg.id}${msg.msg}`}>
                                        <span>{msg.id}</span>
                                        <small>{msg.msg}</small>
                                    </p>
                                );
                            })}
                        </div>
                        <div className='form-section'>
                            <input
                                type='text'
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                            <button onClick={() => handleSubmit()}>SEND</button>
                        </div>
                    </div>
                    <div className='group-section'>
                        <p>ROOM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
