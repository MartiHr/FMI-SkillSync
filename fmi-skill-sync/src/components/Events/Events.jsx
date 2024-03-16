import classNames from 'classnames/bind';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { EventCard } from "./EventCard/EventCard";

import styles from './Event.module.css';

let cx = classNames.bind(styles);

export const Events = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <h1>Events</h1>
            <section className={cx('event-wrapper')}>
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </section>
        </>
    )
}