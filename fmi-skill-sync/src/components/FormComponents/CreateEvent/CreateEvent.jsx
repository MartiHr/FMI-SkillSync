import styles from './CreateEvent.module.css';
import formStyles from '../../FormComponents/Form.module.css';
import classnames from 'classnames/bind';

import * as forumService from '../../../services/forumService.js'

import { useState } from 'react';
import { getErrorMessage } from '../../../utils/errorUtil.js';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useForumContext } from '../../../contexts/ForumContext.jsx';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils.js'

const cx = classnames.bind(styles);
const cxForms = classnames.bind(formStyles);

export const CreateEvent = () => {
    const { topicCreate } = useForumContext();
    const { currentUser } = useAuthContext();

    const [values, setValues] = useState({
        subject: '',
        title: '',
        description: '',
        reward: '',
        privateSession: false,
        numberOfPeople: 1
    });

    const [errors, setErrors] = useState({
        subjectError: false,
        titleError: false,
        descriptionError: false,
        rewardError: false,
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

        if (Object.values(errors).some(error => error.length !== 0 || error === false)) {
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
                <h3>Create an event</h3>

                <label htmlFor="subject">Subject</label>
                <input type="text" placeholder="Enter the subject" id="subject" name='subject' value={values.subject} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.subjectError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.subjectError}</span>

                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Enter the title" id="title" name='title' value={values.title} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.titleError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.titleError}</span>

                <label htmlFor="description">Description</label>
                <textarea placeholder="Write a description" id="description" rows="10" cols="50" name='description' value={values.description} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.descriptionError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.descriptionError}</span>

                <label htmlFor="reward">Reward</label>
                <input type="text" placeholder="Enter the reward" id="reward" name='reward' value={values.reward} onChange={changeHandler} onBlur={onErrorHandler} className={cxForms(`${errors.rewardError.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.rewardError}</span>

                <label>Session type</label>
                <div className="radio">
                    <label>
                        <input type="radio" name="privateSession" value="option1" checked={values.privateSession} onChange={changeHandler} />
                        Option 1
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="privateSession" value="option2" checked={!values.privateSession} onChange={changeHandler} />
                        Option 2
                    </label>
                </div>

                <button className={cx('create-button')}>Create</button>
            </form>
        </>
    );
}