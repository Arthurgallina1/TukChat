import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Login() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <div className='login-page'>
            <div className='login-box'>
                <h2>
                    Socket <strong>Chat</strong>
                </h2>
                {
                    <form>
                        <input
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Username'
                        />
                        <input
                            type='text'
                            onChange={(e) => setRoom(e.target.value)}
                            value={room}
                            placeholder='Room'
                        />
                        <Link to={`/dash/${room}/${name}`}>
                            <button>Join</button>
                        </Link>
                    </form>
                }
            </div>
        </div>
    );
}
