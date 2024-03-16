import styles from './Publication.module.css';
import classNames from 'classnames/bind';
import { extractUsernameFromEmail } from '../../../../utils/usernameUtils.js'
import { calculateTime } from '../../../../utils/calculateTime';

let cx = classNames.bind(styles);

export const Publication = ( {topic, email} ) => {

    const {title, subject, comment, createdAt} = topic;

    return (
        <>
            {/* title, subject, creator, creation date */}
            <div className={cx('publication-view')}>
                <div className={cx('details')}>
                    <span className={cx('label')}>Title:</span>
                    <span className={cx('value')}>{title}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Comment:</span>
                    <span className={cx('value')}>{comment}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Subject:</span>
                    <span className={cx('value')}>{subject}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Creator:</span>
                    <span className={cx('value')}>{extractUsernameFromEmail(email)}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Creation Date:</span>
                    <span className={cx('value')}>{calculateTime(createdAt)}</span>
                </div>
                <div className={cx('btn-container')}>
                    <button className={cx('btn-edit')}>Edit</button>
                    <button className={cx('btn-delete')}>Delete</button>
                </div>
            </div>
        </>
    );
}