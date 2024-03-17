import classNames from 'classnames/bind';

import * as eventsService from '../../services/eventsService'
import * as chatService from '../../services/chatService'

import styles from './Profile.module.css';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { MiniEventCard } from './MiniEventCard/MiniEventCard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

let cx = classNames.bind(styles);

export const Profile = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        eventsService.getAllEventsForUser(currentUser?.uid)
            .then(res => {
                setMyEvents(res);
            })
            .catch(err => {
                console.log(err);
            })

        // eventsService.getJoinedEventsForUser(currentUser?.uid)
        //     .then(res => {
        //         setJoinedEvents(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }, [currentUser?.uid])

    useEffect(() => {
        chatService.getAllChatRooms()
            .then(res => {
                // Filter chat rooms to include only the ones where the current user is a participant
                const userChats = res.filter(chatRoom => chatRoom.users.includes(currentUser?.email));
                setChats(userChats);
            })
            .catch(err => {
                console.log(err);
            });
    }, [currentUser?.email]);

    return (
        <>
            <p>Chats</p>
            <div className={cx("header-container")}>
                <h1>My profile</h1>
            </div>

            <div className={cx('profile-wrapper')}>
                <section className={cx('profile-card-wrapper')}>
                    <h3>Chats</h3>
                    {chats.map((chat) => (
                        <ProfileCard key={chat.id} email={chat.users[0] === currentUser?.email ? chat.users[1] : chat.users[0]} />
                    ))}
                </section>

                <div className={cx("outer")}>
                    <h3>My events</h3>
                    <section className={cx('my-events-wrapper')}>
                        {myEvents.map((e, index) => <MiniEventCard key={index} event={e} />)}
                    </section>
                </div>

                <div className={cx("outer")}>
                    <h3>Joined events</h3>
                    <section className={cx('my-events-wrapper')}>
                        {joinedEvents.map((e, index) => <MiniEventCard key={index} event={e} />)}
                    </section>
                </div>
            </div>
        </>
    )
}