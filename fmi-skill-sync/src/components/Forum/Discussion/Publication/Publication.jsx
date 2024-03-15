import styles from './Publication.module.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export const Publication = () => {

    const publication = { //to delete
        title: 'Sample Publication',
        subject: 'React Development',
        creator: 'John Doe',
        creationDate: '2024-03-15',
    };

    return (
        <>
            {/* title, subject, creator, creation date */}
            <div className={cx('publication-view')}>
                <div className={cx('details')}>
                    <span className={cx('label')}>Title:</span>
                    <span className={cx('value')}>{publication.title}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Subject:</span>
                    <span className={cx('value')}>{publication.subject}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Creator:</span>
                    <span className={cx('value')}>{publication.creator}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Creation Date:</span>
                    <span className={cx('value')}>{publication.creationDate}</span>
                </div>
            </div>
        </>
    );
}