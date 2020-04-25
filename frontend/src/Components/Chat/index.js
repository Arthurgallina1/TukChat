import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";
import "./index.css";
import MessageBox from "../MessageBox";
import Input from "../Input";
import InfoBar from "../InfoBar";
import Sidebar from "../SideBar";
const socket = openSocket("https://tu-socket-chat.herokuapp.com");

export default function Chat() {
    const { id, room } = useParams();
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
        socket.on("rooms", (rooms) => {
            // console.log('msg recebida ' + msg )
            setActiveRooms([...rooms]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on("private message", (msg) => {
            setMessages([...messages, msg]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on("users", (users) => {
            // setUsersOnline([...usersOnline, user]);
            setUsersOnline([...users]);
        });
    }, [usersOnline]);

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit("message", { id, msg, room });
        setMsg("");
    };
    function handlePoke(user) {
        const socketid = user.id;
        if (user.username !== id) {
            socket.emit("poke", { socketid, id });
        }
    }

    function changeRoom(room) {
        console.log(room);
    }

    return (
        <div className='chat-container'>
            {/* <h3>Welcome</h3> */}
            <div className='outerContainer'>
                <Sidebar
                    id={id}
                    usersOnline={usersOnline}
                    handlePoke={handlePoke}
                    room={room}
                    activeRooms={activeRooms}
                />
                <div className='container'>
                    <InfoBar room={room} />
                    <MessageBox messages={messages} handlePoke={handlePoke} />
                    <Input
                        message={msg}
                        setMessage={setMsg}
                        sendMessage={handleSubmit}
                    />
                </div>
                {/* <TextContainer users={users}/> */}
            </div>
        </div>
    );
}
