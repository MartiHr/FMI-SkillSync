import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './EventCard.module.css';
import img1 from '../../../../public/static/images/colaborationLearning1.jpg' // relative path to image 
import img2 from '../../../../public/static/images/colaborationLearning2.jpg' // relative path to image 
import img3 from '../../../../public/static/images/colaborationLearning3.jpg' // relative path to image 

let cx = classNames.bind(styles);

export const EventCard = ({ event }) => {
    return (
        <>
            <div className={cx('card-item')}>
                <div className={cx('card-image-wrapper')}>
                    {/* <img src={'https://picsum.photos/200/300'} className={cx('card-image')} alt="" /> */}
                    <img src={img1} className={cx('card-image')} alt="" />
                    <p className={cx('card-title')}>BMW</p>
                </div>

                <Link to={`/details`} className={cx('details-button-wrapper')}>
                    <div className={cx('button-shape')}></div>
                    <p className={cx('button-text')}>+</p>
                </Link>

                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>Subject: Math</p>
                </div>
                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>Number of people: 3</p>
                </div>
                <div className={cx('card-info')}>
                    <p className={cx('card-info-value')}>User: vladi</p>
                </div>
            </div>
        </>
    );
}