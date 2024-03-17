import classNames from 'classnames/bind';
import { EventCard } from "./EventCard/EventCard";
import { useEventsContext } from '../../contexts/EventsContext';

import styles from './Events.module.css';
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

export const Events = () => {
    const { events } = useEventsContext();  
    const filteredEvents = events.filter(event => !event.teacherEmail);

    const navigate = useNavigate();

    const redirect = (path, event) => {
        event.stopPropagation();
        navigate(path);
    }

    return (
        <>
            <div className={cx("header-container")}>
                <h1>Events</h1>
                <div className={cx('btn-container')}>
                    <button onClick={(event) => redirect("/create-event", event)}>Create event</button>
                </div>
            </div>
            <section className={cx('event-wrapper')}>
                {filteredEvents.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}