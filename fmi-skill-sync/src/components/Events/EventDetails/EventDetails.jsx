import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Outlet, useParams } from 'react-router';
import { EventsContext } from '../../../contexts/EventsContext';

let cx = classNames.bind(styles);

export const EventDetails = () => {
    const { currentUser } = useContext(AuthContext);
    const { eventSelect } = useContext(EventsContext);
    const { id } = useParams();
    const currentEvent = eventSelect(id);

    return (
        <div className={cx("details-container")}>
            <div className={cx("details-box")}>
                <div className={cx("props-container")}>
                    <div className={cx("header-props-container")}>
                        <img className={cx("icon")} src={"https://wallpapers.com/images/hd/cool-picture-art-of-lion-rlst9ftvz1dvvn37.jpg"} />
                        <div className={cx("title-box")}>
                            <h1>{currentEvent.title}</h1>
                        </div>
                    </div>
                    <p>{currentEvent.description}</p>
                    <div className={cx("pills-container")}>
                        <p>{currentEvent.subject}</p>
                    </div>
                    <p className={cx("reward-text")}>Price: {currentEvent.reward}</p>
                    {currentUser.id === currentEvent.ownerID ?
                        <div className={cx("buttons-container")}>
                            <button className={cx("details-button", "button")}>Edit</button>
                            <button className={cx("delete-button", "button")}>Delete</button>
                            <button className={cx("choose-button", "button")}>Choose a teacher</button>
                        </div> :
                        <Outlet />}
                </div>
            </div>
        </div>
    )
}