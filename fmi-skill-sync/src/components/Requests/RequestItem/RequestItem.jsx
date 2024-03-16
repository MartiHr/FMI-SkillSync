import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getProfilePictureByEmail } from '../../../services/userService.js';
import requestItemStyles from './RequestItem.module.css';

let cx = classNames.bind(requestItemStyles);

export const RequestItem = ({ onClickHandler, from, eventTitle }) => {
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
            <button className={cx('accept-button')} onClick={onClickHandler}>
                Accept request
            </button>
            <button className={cx('decline-button')} onClick={onClickHandler}>
                Decline request
            </button>
            <button className={cx('chat-button')} onClick={onClickHandler}>
                Chat
            </button>
        </div>
    )
} 
