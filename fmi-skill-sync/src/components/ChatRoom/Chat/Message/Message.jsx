import classNames from 'classnames/bind';
import chatRooomStyles from './Message.module.css';
import { extractUsernameFromEmail } from '../../../../utils/usernameUtils';

let cx = classNames.bind(chatRooomStyles);

export const Message = ({ isYou, text, from, date }) => {
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
                        <div className={cx("icon")}></div> {/* icon*/}
                        <div className={cx("message")}>
                            {text}
                        </div>
                    </div>
                </div>
                }
        </>
    )
}