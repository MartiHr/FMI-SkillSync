import classNames from 'classnames/bind';
// import { ProfileCard } from "./ProfileCard/ProfileCard";
import { useEventsContext } from '../../contexts/EventsContext';

import * as eventsService from '../../services/eventsService'

import styles from './Profile.module.css';
import { Link } from 'react-router-dom';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { MiniEventCard } from './MiniEventCard/MiniEventCard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

let cx = classNames.bind(styles);

export const Profile = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);

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

    return (
        <>
            <p>Chats</p>
            <div className={cx("header-container")}>
                <h1>My profile</h1>
            </div>

            <div className={cx('profile-wrapper')}>
                <section className={cx('profile-card-wrapper')}>
                    <h3>Chats</h3>
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    {/* {events.map((e, index) => <EventCard key={index} event={e} />)} */}
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