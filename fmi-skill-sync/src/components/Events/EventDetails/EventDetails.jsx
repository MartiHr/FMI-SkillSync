import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { EventsContext } from '../../../contexts/EventsContext';
import { getProfilePictureByEmail } from '../../../services/userService.js';
import * as requestService from '../../../services/requestsService.js';
import * as eventsService from '../../../services/eventsService.js';

let cx = classNames.bind(styles);

export const EventDetails = () => {
    const { currentUser } = useContext(AuthContext);
    const { eventSelect, eventDelete } = useContext(EventsContext);
    const { id } = useParams();
    const currentEvent = eventSelect(id);
    const [ownerImage, setOwnerImage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProfilePictureByEmail(currentEvent?.email)
            .then(res => setOwnerImage(res))
            .catch(err => console.log(err));

        requestService.exists(currentEvent?.email, currentUser?.email, currentEvent?.id)
            .then(res => {
                setIsSent(res);
            }).catch(err => console.log(err))
    }, [currentEvent?.email, currentUser?.email, currentEvent?.id]);

    const sendRequest = () => {
        requestService.createRequest({
            to: currentEvent.email,
            from: currentUser.email,
            eventId: currentEvent.id,
            eventTitle : currentEvent.title
        })
            .then(res => {
                setIsSent(true);
            })
            .catch()
    }

    const editHandler = () => {
        navigate(`/editHandler/${id}`);
    }

    const deleteHandler = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            eventsService.deleteEvent(id)
                .then(() => eventDelete(id))
                .catch(err => console.log(err));
            navigate('/events');
        }   
    }


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
                        {currentUser?.email === currentEvent?.email ?
                            <>
                                <button className={cx("details-button", "button")}  onClick={editHandler}>Edit</button>
                                <button className={cx("delete-button", "button")} onClick={deleteHandler}>Delete</button>
                                <button className={cx("choose-button", "button")}>Choose a teacher</button>
                            </>
                            :
                            <>
                                <button onClick={sendRequest} className={cx("choose-button", "button")}>
                                    <i className={cx('hear-icon', 'fa-solid', 'fa-solid fa-graduation-cap')}></i>
                                    {isSent ? "Request sent!" : "Send offer to teach"}
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}