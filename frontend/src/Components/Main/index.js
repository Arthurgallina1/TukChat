import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';


export default function Main() {
    const socket = openSocket('http://localhost:8000');
    const [counter, setCounter] = useState(0);
    function handleClick(){

    }

  

    useEffect(() => {
        
        function socketOn(){
            socket.on('connect', function(){
                socket.emit('msg', 'can your hear me?');
            });

            socket.on('message', message => {
                console.log(message)
            })


            //broadcast when a user connects
            socket.broadcost.emit() //broadcast emit pra todo mundo menos que esta
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
