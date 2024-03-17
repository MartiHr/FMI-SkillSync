import classNames from 'classnames/bind';
import styles from './Comment.module.css';
import { calculateTime } from '../../../../utils/calculateTime';
import { useEffect, useState } from 'react';
import { getProfilePictureByEmail } from '../../../../services/userService.js'
import { extractUsernameFromEmail } from '../../../../utils/usernameUtils';

let cx = classNames.bind(styles);

export const Comment = ({ comment }) => {

    const { name, createdAt, description } = comment;
    const [ownerImage, setOwnerImage] = useState("");

    useEffect(() => {
        getProfilePictureByEmail(name)
            .then(res => setOwnerImage(res))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className={cx('comment')}>
            <img src={ownerImage} alt="Profile picture" />
            <div className={cx('comment-details')}>
                <h4>{extractUsernameFromEmail(name)}</h4>
                <span> {calculateTime(createdAt)} </span>
                <p>{description}</p>
            </div>
        </div>
    )
}