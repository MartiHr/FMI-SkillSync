import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import requestItemStyles from './RequestItem.module.css';

let cx = classNames.bind(requestItemStyles);

export const RequestItem = ({ onClickHandler, req }) => {



    return (
        <div className={cx('request')}>
            <img src="https://i.imgur.com/CFpa3nK.jpg" alt="Profile picture" />
            <div className={cx('req-teacher-name')}>
                <span>Daniel steancasdc</span>
                {/* <h4>{req.from}</h4>
                <span> {req.time} </span> */}
                <hr></hr>
                <span>Event name</span>
            </div>
            <div className={cx('req-event-name')}>

            </div>
            <button onClick={onClickHandler}>
                Accept request
            </button>
        </div>
    )
} 
