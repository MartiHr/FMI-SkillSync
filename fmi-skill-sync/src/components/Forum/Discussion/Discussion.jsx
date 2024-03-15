import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Discussion.module.css';
import { Comment } from './Comment/Comment.jsx'
import { Publication } from './Publication/Publication.jsx';
import { useForumContext } from '../../../contexts/ForumContext';

let cx = classNames.bind(styles);

export const Discussion = () => {

    const { topicSelect } = useForumContext();
    const { id } = useParams();
    const topic = topicSelect(id);

    return (
        <>
        <div className={cx('comments-container')}>
            <Publication key={id}></Publication>
            <h1>Comments</h1>
            <div className={cx('comments')}>
                {/* <div className={cx('comment')}>
                    <img src="https://i.imgur.com/yTFUilP.jpg" alt="Profile picture"/>
                    <div className={cx('comment-details')}>
                        <h4>Jhon Doe</h4>
                        <span>- 20 October, 2018</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                </div>
                <div className={cx('comment')}>
                    <img src="https://i.imgur.com/CFpa3nK.jpg" alt="Profile picture"/>
                    <div className={cx('comment-details')}>
                        <h4>Rob Simpson</h4>
                        <span>- 20 October, 2018</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?</p>
                    </div>
                </div> */}

                <h1>Comments</h1>
                {topic.comments?.length > 0 ? topic.comments.map((x, index) => <Comment key={index + 1} comment={x.comment} />)
                                            : <h1>No comments yet</h1>}
            </div>
            <div className={cx('comment-form')}>
                <form id="align-form">
                    <h4>Leave a comment</h4>
                    <div className={cx('form-group')}>
                        <label for="message">Message</label>
                        <textarea name="msg" id="msg" cols="30" rows="5" placeholder="Write your comment.."></textarea>
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