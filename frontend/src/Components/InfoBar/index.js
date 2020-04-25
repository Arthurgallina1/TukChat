import React from "react";
import "./index.css";
import onlineIcon from "../../Assets/onlineIcon.png";
import closeIcon from "../../Assets/closeIcon.png";

export default function InfoBar({ room }) {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'></div>
            <div className='rightInnerContainer'>
                <a href='/'>
                    <img src={closeIcon} alt='close icon' />
                </a>
            </div>
        </div>
    );
}
