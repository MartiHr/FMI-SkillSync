import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { EventsContext } from '../../../contexts/EventsContext';
import { getProfilePictureByEmail } from '../../../services/userService.js';
import * as requestService from '../../../services/requestsService.js';
import * as eventsService from '../../../services/eventsService.js';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils.js';
import { Student } from './Sudent.jsx';

let cx = classNames.bind(styles);

export const EventDetails = () => {
    const { currentUser } = useContext(AuthContext);
    const { eventSelect, eventDelete } = useContext(EventsContext);
    const { id } = useParams();
    const currentEvent = eventSelect(id);
    const [ownerImage, setOwnerImage] = useState("");
    const [teacherImage, setTeacherImage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProfilePictureByEmail(currentEvent?.email)
            .then(res => setOwnerImage(res))
            .catch(err => console.log(err));

        if (currentEvent?.teacherEmail) {
            getProfilePictureByEmail(currentEvent?.teacherEmail)
                .then(res => setTeacherImage(res))
                .catch(err => console.log(err));
        }

        requestService.exists(currentEvent?.email, currentUser?.email, currentEvent?.id)
            .then(res => {
                setIsSent(res);
            }).catch(err => console.log(err))

        setStudents(currentEvent?.students);
    }, [currentEvent?.email, currentUser?.email, currentEvent?.id, currentEvent?.teacherEmail, currentEvent?.students]);

    const sendRequest = () => {
        requestService.createRequest({
            to: currentEvent.email,
            from: currentUser.email,
            eventId: currentEvent.id,
            eventTitle: currentEvent.title
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

    const addStudentToState = (email) => {
        if (!students?.includes(email)) {
            setStudents(prevStudents => [...prevStudents, email]);
        }
    }

    const joinEvent = () => {
        if (!students?.includes(currentUser?.email)) {
            eventsService.addStudentToEvent(currentEvent?.id, currentUser?.email)
                .then(res => {
                    console.log("succes");

                    addStudentToState(currentUser?.email);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert("Already joined!");
        }
    }

    return (
        <div className={cx("details-container")}>
            <div className={cx("details-box")}>
                <div className={cx("props-container")}>
                    <p className={cx("owner-email")}>{currentEvent?.ownerEmail}</p>
                    <div className={cx("header-props-container")}>
                        {ownerImage ?
                            <img className={cx("icon")} src={ownerImage} /> :
                            <img className={cx("icon")} src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} />
                        }

                        <div className={cx("title-box")}>
                            <h1>{currentEvent?.title}</h1>
                        </div>
                    </div>
                    {currentUser?.email != currentEvent?.email && currentEvent?.teacherEmail ?
                        <button onClick={joinEvent} className={cx("join-button", "button")}>
                            <i className={cx('hear-icon', 'fa-solid', 'fa-solid fa-door-open')}></i>
                            {!students?.includes(currentUser?.email) ? "Join" : "Already joined"}
                        </button>
                        : <></>
                    }

                    <p>{currentEvent?.description}</p>
                    <div className={cx("pills-container")}>
                        <p>{currentEvent?.subject}</p>
                    </div>

                    <p className={cx("reward-text")}>Reward: {currentEvent?.reward}</p>

                    <div className={cx("buttons-container")}>
                        {currentUser?.email === currentEvent?.email ?
                            <>
                                <button className={cx("details-button", "button")} onClick={editHandler}>Edit</button>
                                <button className={cx("delete-button", "button")} onClick={deleteHandler}>Delete</button>
                            </>
                            :
                            <>
                                {
                                    currentEvent?.teacherEmail ?
                                        <>
                                            <div className={cx("teacher-info-container")}>
                                                {teacherImage ?
                                                    <img className={cx("teacher-icon")} src={teacherImage} /> :
                                                    <img className={cx("teacher-icon")} src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} />}
                                                <div className={cx("teacher-name-container")}>
                                                    <p className={cx("p-reset")}>Teacher: {extractUsernameFromEmail(currentEvent?.teacherEmail)}</p>
                                                    <Link to={`/chat-room/${currentEvent?.teacherEmail}`} className={cx("link-chat")}>Chat</Link>
                                                </div>
                                            </div>
                                            <div className={cx("event-date-container")}>
                                                <p className={cx("p-reset")}>Date: {currentEvent?.date}</p>
                                                <div className={cx("image-wrapper")}>
                                                    {currentEvent?.location == 1 ?
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Fzad325.jpg?alt=media&token=50c0e5b0-ae74-4016-b465-881347f87464" alt="no photo" /> :
                                                        currentEvent?.location == 2 ?
                                                            <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Fzad200.jpg?alt=media&token=252f1868-bdc6-4b15-b344-5bd0c413941f" alt="no photo" /> :
                                                            currentEvent?.location == 3 ?
                                                                <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Faquarium.jpg?alt=media&token=dd0ff6fb-b098-4a9a-be0d-a0f422783b74" alt="no photo" /> :
                                                                currentEvent?.location == 4 ?
                                                                    <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2F6tietaj.jpg?alt=media&token=1aaaee8a-b79c-4a68-8499-c1daaa7e8887" alt="no photo" /> :
                                                                    <></>
                                                    }
                                                </div>
                                            </div>
                                        </> :
                                        <button onClick={sendRequest} className={cx("choose-button", "button")}>
                                            <i className={cx('hear-icon', 'fa-solid', 'fa-solid fa-graduation-cap')}></i>
                                            {isSent ? "Request sent!" : "Send offer to teach"}
                                        </button>
                                }
                            </>
                        }
                    </div>
                </div>
                <div>
                    <p className={cx("students")}>Current Users: 19</p>
                    <div className={cx("name-list")}>
                        {students?.map((e, index) => <Student key={index} name={extractUsernameFromEmail(e)} />)}
                    </div>
                </div>
            </div>
        </div >
    )
}