import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from "react";
import { EventCard } from '../EventCard/EventCard';
import { AuthContext } from '../../../contexts/AuthContext';

import * as eventsService from '../../../services/eventsService'

import styles from './MyEvents.module.css';
let cx = classNames.bind(styles);

export const MyEvents = () => {
    const { currentUser } = useContext(AuthContext);

    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        eventsService.getAllEventsForUser(currentUser?.uid)
            .then(res => {
                setMyEvents(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentUser?.uid])

    return (
        <>
            <div className={cx("header-container")}>
                <h1>My Events</h1>
            </div>
            <section className={cx('event-wrapper')}>
                {myEvents.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}