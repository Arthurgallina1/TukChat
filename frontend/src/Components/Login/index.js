import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client';



export default function Login() {
    const socket = openSocket('http://localhost:8000');
    const [name, setName] = useState('');
    const [login, setLogin] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
            
            function socketOn(){
                socket.on('connect', function(){
                    socket.emit('msg', 'can your hear me?');
                });

                socket.on('message', message => {
                    console.log(message)
                })


                //broadcast when a user connects
                // socket.broadcast.emit() //broadcast emit pra todo mundo menos que esta
        }
        socketOn();
    })

    
    function handleClick() {
        setLogin(true);



    }

    function handleMsgSubmit(e){
        e.preventDefault();
        socket.emit('chatMessage', msg);
    }
    return (
        <>
                <div>
                    {
                        !login ? ( 
                        <form>
                            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} />
                            <button onClick={handleClick}>Login</button>
                        </form>
                        ) : ''

                    }
                </div>

                <div className="">
                    { 
                        login ? ( 
                            <div className="lower-body">
                                <h4>Bem vindo, {name}!</h4> 
                                <form onSubmit={handleMsgSubmit}>
                                    <input type="text" onChange={(e)=>setMsg(e.target.value)} value={msg} />
                                    <button>Enviar</button>
                                </form>
                            </div>
                        
                        
                        
                        
                        
                        
                        
                        ) : ''

                        
                    
                    
                    }
                </div>
        </>
    )
}
