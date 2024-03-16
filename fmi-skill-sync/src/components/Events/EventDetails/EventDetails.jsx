import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Outlet, useParams } from 'react-router';
import { EventsContext } from '../../../contexts/EventsContext';
import { getProfilePictureByEmail } from '../../../services/userService.js';

let cx = classNames.bind(styles);

export const EventDetails = () => {
    const { currentUser } = useContext(AuthContext);
    const { eventSelect } = useContext(EventsContext);
    const { id } = useParams();
    const currentEvent = eventSelect(id);
    const [ownerImage, setOwnerImage] = useState([]);

    useEffect(() => {
        getProfilePictureByEmail(currentEvent?.email)
            .then(res => setOwnerImage(res))
            .catch(err => console.log(err));
    }, [currentEvent?.email]);

    return (
        <div className={cx("details-container")}>
            <div className={cx("details-box")}>
                <div className={cx("props-container")}>
                    <div className={cx("header-props-container")}>
                        <img className={cx("icon")} src={ownerImage} />
                        <div className={cx("title-box")}>
                            <h1>{currentEvent?.title}</h1>
                        </div>
                    </div>
                    <p>{currentEvent?.description}</p>
                    <div className={cx("pills-container")}>
                        <p>{currentEvent?.subject}</p>
                    </div>
                    <p className={cx("reward-text")}>Price: {currentEvent?.reward}</p>

                    <div className={cx("buttons-container")}>
                        {currentUser?.id === currentEvent?.ownerID ?
                            <>
                                <button className={cx("details-button", "button")}>Edit</button>
                                <button className={cx("delete-button", "button")}>Delete</button>
                                <button className={cx("choose-button", "button")}>Choose a teacher</button>
                            </>
                            :
                            <>
                                <button className={cx("choose-button", "button")}>
                                <i className={cx('hear-icon', 'fa-solid', 'fa-solid fa-graduation-cap')}></i>
                                    Send offer to teach
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}