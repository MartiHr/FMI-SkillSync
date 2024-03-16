import styles from './EditTopic.module.css';
import formStyles from '../../FormComponents/Form.module.css';
import classnames from 'classnames/bind';

import * as forumService from '../../../services/forumService.js'

import { useState } from 'react';
import { getErrorMessage } from '../../../utils/errorUtil.js';
import { useForumContext } from '../../../contexts/ForumContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classnames.bind(styles);
const cxForms = classnames.bind(formStyles);

export const EditTopic = () => {
    const { topicEdit, topicSelect } = useForumContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const currentTopic = topicSelect(id);

    const [values, setValues] = useState({
        title: currentTopic.title,
        comment: currentTopic.comment,
        subject: currentTopic.subject,
    });

    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const setError = (errorField, value) => {
        const errorMsg = getErrorMessage(errorField, value);

        setErrors(state => ({
            ...state,
            [`${errorField}Error`]: errorMsg,
        }));
    }

    const onErrorHandler = (e) => {
        const errorField = e.target.name;
        const value = e.target.value;

        setError(errorField, value)
    }

    const editHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        let topicData = Object.fromEntries(formData);

        forumService.updateTopic(id, topicData)
            .then(result => topicEdit(id, result))
            .catch(error => alert(error));
            
        navigate(`/discussion/${id}`);
    }

    return (
        <>
            {/* <img src={'/static/images/space-radiance.png'} className={cx('radiance-background')} alt="" /> */}
            <form className={cx('create-form')} onSubmit={editHandler}>
                <h3>Edit a publication</h3>

                <label htmlFor="subject">Subject</label>
                <input type="text" placeholder="Enter the subject" id="subject" name='subject' value={values.subject} onChange={changeHandler} onBlur={onErrorHandler} />
                <span>{errors.subjectError}</span>

                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Enter the title" id="title" name='title' value={values.title} onChange={changeHandler} onBlur={onErrorHandler}  />
                <span>{errors.titleError}</span>

                <label htmlFor="comment">Comment</label>
                <textarea placeholder="Comment" id="comment" rows="10" cols="50" name='comment' value={values.comment} onChange={changeHandler} onBlur={onErrorHandler}  />
                <span>{errors.commentError}</span>
                <button className={cx('create-button')}>Edit</button>
            </form>
        </> 
    );
}