import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <div>
            {
                <form>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type='text'
                        onChange={(e) => setRoom(e.target.value)}
                        value={room}
                    />
                    <Link to={`/dash/${room}/${name}`}>
                        <button>Enviar</button>
                    </Link>
                </form>
            }
        </div>
    );
}
