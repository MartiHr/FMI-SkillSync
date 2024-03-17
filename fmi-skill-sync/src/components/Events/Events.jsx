import classNames from 'classnames/bind';
import { EventCard } from "./EventCard/EventCard";
import { useEventsContext } from '../../contexts/EventsContext';

import styles from './Events.module.css';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

export const Events = () => {
    const { events } = useEventsContext();  
    const filteredEvents = events.filter(event => !event.teacherEmail);

    return (
        <>
            <div className={cx("header-container")}>
                <h1>Events</h1>
                <div className={cx('btn-container')}>
                    <button>
                        <Link to="/create-event">Create event</Link>
                    </button>
                </div>
            </div>
            <section className={cx('event-wrapper')}>
                {filteredEvents.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}