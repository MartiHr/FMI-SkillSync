import classNames from 'classnames/bind';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { EventCard } from "./EventCard/EventCard";
import { useEventsContext } from '../../contexts/EventsContext';

import styles from './Event.module.css';

let cx = classNames.bind(styles);

export const Events = () => {
    const { currentUser } = useContext(AuthContext);
    const { events } = useEventsContext();

    return (
        <>
            <h1>Events</h1>
            <section className={cx('event-wrapper')}>
                {events.map(e => <EventCard event={e}/>)}
            </section>
        </>
    )
}