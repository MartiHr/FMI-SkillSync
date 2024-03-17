import classNames from 'classnames/bind';
import { EventCard } from "./EventCard/EventCard";
import { useEventsContext } from '../../contexts/EventsContext';

import styles from './Events.module.css';

let cx = classNames.bind(styles);

export const Events = () => {
    const { events } = useEventsContext();

    return (
        <>
            <div className={cx("header-container")}>
                <h1>Events</h1>
                <div className={cx('btn-container')}>
                    <button>
                        Create Event
                    </button>
                </div>
            </div>
            <section className={cx('event-wrapper')}>
                {events.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}