import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";
import "./index.css";

export default function MessageBox({ messages }) {
    return (
        <ScrollToBottom className='messages'>
            {messages.map((msg) => {
                return (
                    <p key={`${msg.id}${msg.msg}`}>
                        <span>{msg.id}</span>
                        <small>{msg.msg}</small>
                    </p>
                );
            })}
        </ScrollToBottom>
    );
}
