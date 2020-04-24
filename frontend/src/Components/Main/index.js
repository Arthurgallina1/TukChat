import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";
import "./styles.css";

const socket = openSocket("http://localhost:8000");

export default function Main() {
    const { id, room } = useParams();
    console.log(id, room);
    const [usersOnline, setUsersOnline] = useState([]);
    const [msg, setMsg] = useState("");
    const [activeRooms, setActiveRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("connect", function () {
            // socket.join
            let connectionObj = {
                username: id,
                room,
            };
            socket.emit("newuser", connectionObj);
        });
    }, []);

    useEffect(() => {
        socket.on("message", (msg) => {
            // console.log('msg recebida ' + msg )
            setMessages([...messages, msg]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on("users", (users) => {
            // setUsersOnline([...usersOnline, user]);
            setUsersOnline([...users]);
        });
    }, [usersOnline]);

    function handleSubmit(e) {
        e.preventDefault();
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
                            {/* <li>{id}</li> */}
                            {usersOnline.map((user) => {
                                let currentUserStyle =
                                    user.username === id ? "user" : "";

                                return (
                                    <li
                                        key={user.id}
                                        className={currentUserStyle}
                                    >
                                        {user.username}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='chat-section'>
                        <div className='chat-box'>
                            {messages.map((msg) => {
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
                                onKeyPress={(e) =>
                                    e.key === "Enter" ? handleSubmit(e) : null
                                }
                            />
                            <button onClick={(e) => handleSubmit(e)}>
                                SEND
                            </button>
                        </div>
                    </div>
                    <div className='group-section'>
                        <p>ROOMS</p>
                        {activeRooms.map((room) => (
                            <li key={room}>{room}</li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
