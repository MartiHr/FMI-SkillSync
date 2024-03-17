import classNames from 'classnames/bind';
import { Link, Outlet } from 'react-router-dom';
import styles from './ProfileCard.module.css';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils';
import img1 from '../../../../public/static/images/colaborationLearning1.jpg' // relative path to image 

let cx = classNames.bind(styles);

export const ProfileCard = ({ event }) => {
    return (
        <>
            <div className={cx('card-item')}>
                <div className={cx('card-image-wrapper')}>
                    {/* <img src={'https://picsum.photos/200/300'} className={cx('card-image')} alt="" /> */}
                    <img src={img1} className={cx('card-image')} alt="" />
                    <p className={cx('card-title')}>{event?.title}</p>
                </div>
                <div className={cx('card-info')}>
                    {/* <p className={cx('card-info-value')}>User: {extractUsernameFromEmail(event?.email)}</p>S */}
                    <p className={cx('card-info-value')}>User 123</p>
                </div>
            </div>
        </>
    );
}