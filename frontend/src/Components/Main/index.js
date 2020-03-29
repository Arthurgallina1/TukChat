import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useParams } from 'react-router-dom'
import './styles.css'

const socket = openSocket('http://localhost:8000');

export default function Main() {
    const { id } = useParams();
    const [ usersOnline, setUsersOnline ] = useState([]);
    const [msg, setMsg] = useState('');
    const [ chat, setChat ] = useState([{id: '', 'msg' : 'Welcome to the chat!'}]);

    useEffect(() => {
        socket.on('connect', function(){
            socket.emit('loginMessage', `${id}`);
        });

       
                //broadcast when a user connects
                // socket.broadcast.emit() //broadcast emit pra todo mundo menos que esta
    
    }, [])

    useEffect(() => {
        socket.on('message', ({msg, id}) => {
            console.log(msg, id)
            setChat([...chat, {msg, id}])
        })

    }, [chat])

    useEffect(() => {
        socket.on('userLogin', (user) => {
            setUsersOnline([...usersOnline, user])
        });
    }, [usersOnline])

    function handleSubmit(){
        socket.emit('message', ({id, msg}));
        setMsg('');
        
        console.log(chat)
    }


    return (
        <div>
            <div className="main">
                <h3>SocketChat</h3>
                <h4>Welcome, {id}!</h4>
                <div className="chat-wrapper">
                    <div className="online-section">
                        <ul>
                            <p>ONLINE NOW</p>
                            <li>{id}</li>
                            {
                                usersOnline.map(user => (
                                    <li key={user}>{user}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="chat-section">
                        <div className="chat-box">
                            {
                                chat.map(msg => (
                                    <p key={`${msg.id}${msg.msg}`}>{`${msg.id}: ${msg.msg}`}</p>
                                ))
                            }

                        </div>
                        <div className="form-section">
                            <input type="text" value={msg} onChange={(e)=> setMsg(e.target.value)}/>
                            <button onClick={() => handleSubmit()}>SEND</button>
                        </div>
                    </div>
                    <div className="group-section">c</div>
                </div>
                
            </div>
        </div>
    )
}
