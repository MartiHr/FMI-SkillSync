import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MiniEventCard.module.css';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils';
import img1 from '../../../../public/static/images/colaborationLearning1.jpg' // relative path to image 

let cx = classNames.bind(styles);

export const MiniEventCard = ({ event }) => {
    return (
        <>
            <div className={cx('mini-card-item')}>
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
                    {/* Subject */}
                    <p className={cx('card-info-value')}>{event?.subject}</p>
                </div>
                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>{event?.numberOfPeople} people</p>
                </div>
                <div className={cx('card-info')}>
                    {/* User */}
                    <p className={cx('card-info-value')}>{extractUsernameFromEmail(event?.email)}</p>
                </div>
            </div>
        </>
    );
}