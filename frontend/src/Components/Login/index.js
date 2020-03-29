import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Login() {
    const [name, setName] = useState('');
    return (
                <div>
                    {
                        <form>
                            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} />
                            <Link to={`/dash/${name}`}><button>Enviar</button></Link>
                        </form>
                    }
                </div>
    )
}
