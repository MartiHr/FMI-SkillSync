import classNames from 'classnames/bind';
import chatRooomStyles from './Message.module.css';
import { extractUsernameFromEmail } from '../../../../utils/usernameUtils';
import { getProfilePictureByEmail } from '../../../../services/userService.js';
import { useEffect, useState } from 'react';

let cx = classNames.bind(chatRooomStyles);

export const Message = ({ isYou, text, from, date }) => {
    const [urlPicture, setUrlPicture] = useState('');

    useEffect(() => {
        if(!isYou){
            getProfilePictureByEmail(from)
            .then(res => setUrlPicture(res))
            .catch(err => console.log(err));
        }
    }, []);

    return (
        <>
            {isYou ?
                <div className={cx("message-container")}>
                    <p className={cx("message-info")}>{extractUsernameFromEmail(from)} - {date.day}/{date.month}/{date.year} - {date.hours}:{date.minutes}:{date.seconds}</p>
                    <div className={cx("person-b")}>
                        <div className={cx("message")}>
                            {text}
                        </div>
                    </div>
                </div>
                :
                <div className={cx("message-container")}>
                    <p>{extractUsernameFromEmail(from)} - {date.day}/{date.month}/{date.year} - {date.hours}:{date.minutes}:{date.seconds}</p>
                    <div className={cx("person-a")}>
                        <img className={cx("icon")} src={urlPicture} />
                        <div className={cx("message")}>
                            {text}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}