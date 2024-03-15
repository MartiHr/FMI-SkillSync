import styles from './CreateTopic.module.css';
import formStyles from '../../FormComponents/Form.module.css';
import classnames from 'classnames/bind';

import * as forumService from '../../../services/forumService'

import { useState } from 'react';
import { getErrorMessage } from '../../../utils/errorUtil';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useForumContext } from '../../../contexts/ForumContext';
import {extractUsernameFromEmail} from '../../../utils/usernameUtils.js'

const cx = classnames.bind(styles);
let cxForms = classnames.bind(formStyles);

export const CreateTopic = () => {
    const { topicCreate } = useForumContext();
    const { currentUser } = useAuthContext();

    const [values, setValues] = useState({
        title: '',
        comment: '',
        subject: '',
    });

    const [errors, setErrors] = useState({
        titleError: false,
        commentError: false,
        subjectError: false,
    });

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

    const onCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        let topicData = Object.fromEntries(formData);
        topicData.ownerID = currentUser.uid;
        topicData.comments = [];
        topicData.name = extractUsernameFromEmail(currentUser.email);

        Object.keys(topicData).forEach(key => setError(key, topicData[key]));

        if (Object.values(errors).some(error => error.length !== 0  || error === false)) {
            return;
        } else {
            forumService.createTopic(topicData)
                .then(result => topicCreate(result))
                .catch(error => alert(error));

            e.target.reset();
        }
    }

    return (
        <>
            {/* <img src={'/static/images/space-radiance.png'} className={cx('radiance-background')} alt="" /> */}
            <form className={cx('create-form')} onSubmit={onCreate}>
                <h3>Create a publication</h3>

                <label htmlFor="subject">Subject</label>
                <input type="text" placeholder="Enter the subject" id="subject" name='subject' value={values.subject} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.subjectError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.subjectError}</span>

                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Enter the title" id="title" name='title' value={values.title} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.titleError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.titleError}</span>

                <label htmlFor="comment">Comment</label>
                <textarea placeholder="Comment" id="comment" rows="10" cols="50" name='comment' value={values.description} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.commentError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.commentError}</span>

                {/* <label htmlFor="type">Vehicle type</label>
                <input type="text" placeholder="Vehicle type" id="type" name='type' value={values.type} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.typeError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.typeError}</span>

                <label htmlFor="model">Model</label>
                <input type="text" placeholder="Enter the model" id="model" name='model' value={values.model} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.modelError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.modelError}</span>

                <label htmlFor="image">Image</label>
                <input type="text" placeholder="Image url" id="image" name='imgUrl' value={values.imgUrl} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.imgUrlError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.imgUrlError}</span>

                <label htmlFor="price">Price</label>
                <input type="number" placeholder="Price in $" id="price" name='price' value={values.price} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.priceError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.priceError}</span>

                <label htmlFor="info">Description</label>
                <textarea placeholder="Description" id="info" rows="10" cols="50" name='description' value={values.description} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.descriptionError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.descriptionError}</span> */}

                <button className={cx('create-button')}>Create</button>
            </form>
        </>
    );
}