import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getProfilePictureByEmail } from '../../../services/userService.js';
import requestItemStyles from './RequestItem.module.css';
import { Link } from 'react-router-dom';

let cx = classNames.bind(requestItemStyles);

export const RequestItem = ({ id, onClickHandler, from, eventTitle, deleteRequest, acceptRequest }) => {
    const [ownerImage, setOwnerImage] = useState("");

    useEffect(() => {
        getProfilePictureByEmail(from)
            .then(res => setOwnerImage(res))
            .catch(err => console.log(err));
    }, [from])
    return (
        <div className={cx('request')}>
            <img src={ownerImage} alt="Profile picture" />
            <div className={cx('req-teacher-name')}>
                <span>{from}</span>
                <hr></hr>
                <span>{eventTitle}</span>
            </div>
            <div className={cx('req-event-name')}>

            </div>
            <div className={cx('btn-container')}>
                <button className={cx('accept-button')} onClick={() => acceptRequest(id)}>
                    Accept request
                </button>
                <button className={cx('decline-button')} onClick={() => deleteRequest(id)}>
                    Decline request
                </button>
                <Link to={`/chat-room/${from}`} className={cx('chat-button')} >
                    Chat
                </Link>
            </div>
        </div>
    )
} 
