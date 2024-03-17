import classNames from 'classnames/bind';
import styles from './SetEvents.module.css';
import { EventCard } from '../EventCard/EventCard';
import { useEventsContext } from '../../../contexts/EventsContext';

let cx = classNames.bind(styles);

export const SetEvents = () => {
    const { events } = useEventsContext();  
    const filteredEvents = events.filter(event => !event.isPrivate && event.teacherEmail);

    return (
        <>
            <div className={cx("header-container")}>
                <h1>Open events with teacher</h1>
            </div>
            <section className={cx('event-wrapper')}>
                {filteredEvents.map((e, index) => <EventCard key={index} event={e} />)}
            </section>
        </>
    )
}