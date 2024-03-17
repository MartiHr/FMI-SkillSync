import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Discussion.module.css';
import { Comment } from './Comment/Comment.jsx'
import { Publication } from './Publication/Publication.jsx';
import { useForumContext } from '../../../contexts/ForumContext';
import * as forumService from '../../../services/forumService.js'
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils.js'

let cx = classNames.bind(styles);

export const Discussion = () => {

    const { currentUser } = useAuthContext();
    const { topicSelect, topicEdit, topicDetails } = useForumContext();
    const { id } = useParams();
    const currentTopic = topicSelect(id);
    const [description, setComment] = useState('');

    const [values, setValues] = useState({
        comment: '',
    });

    const [errors, setErrors] = useState({
        commentError: false,
    });

    const changeHandler = (e) => {
        
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        
        setComment(e.target.value); 
    }

    const handleComment = (e) => {
        e.preventDefault();

        const comment = { comment: { description: description, name: currentUser?.email, ownerId: currentUser.uid } };
        forumService.commentTopic(id, comment, currentTopic.comments)
            .then(comments => topicEdit(id, { ...currentTopic, comments }));

        setComment('');
    }

    const onChange = () => {

    }

    return (
        <>
            <div className={cx('comments-container')}>
                <div className={cx('comment-post')}>
                <Publication key={id} topic={currentTopic}></Publication>
                    <div className={cx('comments')}>
                        <h1>Comments</h1>
                        {currentTopic.comments?.length > 0 
                             ? currentTopic.comments
                                        .sort((a,b) => b.comment.createdAt.seconds - a.comment.createdAt.seconds)
                                        .map((x, index) => <Comment key={index + 1} comment={x.comment} />)
                            : <h1>No comments yet</h1>}
                    </div>

                </div>
                <div className={cx('comment-form')}>
                    <form id="align-form" onSubmit={handleComment}>
                        <h4>Leave a comment</h4>
                        <div className={cx('form-group')}>
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="msg" cols="30" rows="5" placeholder="Write your comment.." value={description} onChange={changeHandler}></textarea>
                            <span></span>
                        </div>
                        <div className={cx('form-group')}>
                            <button>Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}