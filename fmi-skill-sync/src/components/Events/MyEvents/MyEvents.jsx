import classNames from 'classnames/bind';
import { useContext } from "react";
import { EventCard } from '../EventCard/EventCard';
import { AuthContext } from '../../../contexts/AuthContext';

import styles from './MyEvents.module.css';

let cx = classNames.bind(styles);

export const MyEvents = () => {
    // const { currentUser } = useContext(AuthContext);
    // const { events } = useEventsContext();

    const { currentUser } = useContext(AuthContext);    
    const { events } = useEventsContext();

    return (
        <>
            <div className={cx("header-container")}>
                <h1>Events</h1>
            </div>
            <section className={cx('event-wrapper')}>
                {events.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}