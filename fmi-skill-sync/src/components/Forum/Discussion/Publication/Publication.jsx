import styles from './Publication.module.css';
import classNames from 'classnames/bind';
import { extractUsernameFromEmail } from '../../../../utils/usernameUtils.js'
import { calculateTime } from '../../../../utils/calculateTime';
import { useForumContext } from '../../../../contexts/ForumContext.jsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext.jsx';
import * as forumService from '../../../../services/forumService.js';
import { useEffect } from 'react';

let cx = classNames.bind(styles);

export const Publication = ({ topic}) => {

    const { currentUser } = useAuthContext();
    const {id} = useParams();
    const { topicDelete } = useForumContext();

    const { title, subject, comment, createdAt, name } = topic;
    const navigate = useNavigate();
  
    const onEdit = () => {
        navigate(`/editTopic/${id}`);
    }

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            forumService.deleteTopic(id)
                .then(() => {
                    topicDelete(id)
                });
            navigate(`/forum`);
        }
    }

    return (
        <>
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
                    <span className={cx('value')}>{name}</span>
                </div>
                <div className={cx('details')}>
                    <span className={cx('label')}>Creation Date:</span>
                    <span className={cx('value')}>{calculateTime(createdAt)}</span>
                </div>
                <div className={cx('btn-container')}>
                    {name == extractUsernameFromEmail(currentUser?.email) ?
                        <>
                            <button className={cx('btn-edit')} onClick={onEdit}>Edit</button>
                            <button className={cx('btn-delete')} onClick={onDelete}>Delete</button>
                        </>
                        : <Outlet />
                    }
                </div>
            </div>
        </>
    );
}