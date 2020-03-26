import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';


export default function Main() {
    const socket = openSocket('http://localhost:8000');
    const [counter, setCounter] = useState(0);
    function handleClick(){

    }

    function handleClick(){
        setCounter(counter+1);
        socket.emit(counter);
    }
    useEffect(() => {
        
        function socketOn(){
            socket.on('connect', function(){
                socket.emit('hello');
            });
        }
        socketOn();
    }, [])
    return (
        <div>
            <div className="main">
                <button onClick={handleClick}>+</button>
            </div>
        </div>
    )
}
