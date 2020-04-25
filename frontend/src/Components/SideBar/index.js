import React from "react";
import onlineIcon from "../../Assets/onlineIcon.png";
import "./index.css";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Sidebar({
    id,
    usersOnline,
    handlePoke,
    room,
    activeRooms,
}) {
    return (
        <div className='left-container'>
            <div className='info-block'>
                <img
                    className='onlineIcon'
                    src={onlineIcon}
                    alt='online icon'
                />
                <h3>{room}</h3>
            </div>
            <ScrollToBottom className='online-list'>
                <ul>
                    <p>
                        <img
                            className='onlineIcon'
                            src={onlineIcon}
                            alt='online icon'
                        />
                        ONLINE <strong className='roxo'>NOW</strong> (
                        {usersOnline.length})
                    </p>
                    {/* <li>{id}</li> */}
                    {usersOnline.map((user) => {
                        let currentUserStyle =
                            user.username === id ? "user" : "";

                        return (
                            <li
                                key={user.id}
                                className={currentUserStyle}
                                onClick={() => handlePoke(user)}
                            >
                                {user.username}
                            </li>
                        );
                    })}
                </ul>
            </ScrollToBottom>
            <div className='rooms-available'>
                <ul>
                    <p>
                        <img
                            className='onlineIcon'
                            src={onlineIcon}
                            alt='online icon'
                        />
                        ROOMS <strong className='roxo'>AVAILABLE</strong> (
                        {activeRooms.length})
                    </p>
                    {/* <li>{id}</li> */}
                    {activeRooms.map((rm) => {
                        let currentUserStyle = rm === room ? "user" : "";

                        return (
                            <li key={rm} className={currentUserStyle}>
                                {rm}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
