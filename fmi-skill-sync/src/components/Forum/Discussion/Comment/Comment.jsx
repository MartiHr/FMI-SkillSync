import classNames from 'classnames/bind';
import styles from './Comment.module.css';
import { calculateTime } from '../../../../utils/calculateTime';

let cx = classNames.bind(styles);

export const Comment = ({ comment }) => {

    const { name, createdAt, description } = comment;

    return (
        <div className={cx('comment')}>
            <img src="https://i.imgur.com/CFpa3nK.jpg" alt="Profile picture" />
            <div className={cx('comment-details')}>
                <h4>{name}</h4>
                <span> {calculateTime(createdAt)} </span>
                <p>{description}</p>
            </div>
        </div>
    )
}