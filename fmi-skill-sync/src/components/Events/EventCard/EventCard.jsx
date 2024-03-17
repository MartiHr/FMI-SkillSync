import classNames from 'classnames/bind';
import { Link, Outlet } from 'react-router-dom';
import styles from './EventCard.module.css';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils';
import img1 from '../../../../public/static/images/colaborationLearning1.jpg' // relative path to image 

let cx = classNames.bind(styles);

export const EventCard = ({ event }) => {
    return (
        <>
            <div className={cx('card-item')}>
                <div className={cx('card-image-wrapper')}>
                    {/* <img src={'https://picsum.photos/200/300'} className={cx('card-image')} alt="" /> */}
                    <img src={img1} className={cx('card-image')} alt="" />
                    <p className={cx('card-title')}>{event?.title}</p>
                </div>

                <Link to={`/events/details/${event?.id}`} className={cx('details-button-wrapper')}>
                    <div className={cx('button-shape')}></div>
                    <p className={cx('button-text')}>+</p>
                </Link>

                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>Subject: {event?.subject}</p>
                </div>
                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>Number of people: {event?.numberOfPeople}</p>
                </div>
                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>User: {extractUsernameFromEmail(event?.email)}</p>
                </div>
                {
                    event?.teacherEmail ?
                        <div className={cx('card-info')}>
                            <p className={cx('card-info-value')}>Teacher: {extractUsernameFromEmail(event?.teacherEmail)}</p>
                        </div> :
                        <Outlet />
                }
            </div>
        </>
    );
}