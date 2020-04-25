import React from "react";

export default function Sidebar({ id, usersOnline, handlePing }) {
    return (
        <div className='left-container'>
            <div className='info-block'></div>
            <div className='online-list'>
                <ul>
                    <p>
                        ONLINE <strong>NOW</strong> ({usersOnline.length})
                    </p>
                    {/* <li>{id}</li> */}
                    {usersOnline.map((user) => {
                        let currentUserStyle =
                            user.username === id ? "user" : "";

                        return (
                            <li
                                key={user.id}
                                className={currentUserStyle}
                                onClick={() => handlePing(user)}
                            >
                                {user.username}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
