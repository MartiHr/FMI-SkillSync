import styles from './CreateEvent.module.css';
import formStyles from '../../FormComponents/Form.module.css';
import classnames from 'classnames/bind';

import * as eventService from '../../../services/eventsService.js'

import { useState } from 'react';
import { getErrorMessage } from '../../../utils/errorUtil.js';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { extractUsernameFromEmail } from '../../../utils/usernameUtils.js'
import { useEventsContext } from '../../../contexts/EventsContext.jsx';

const cx = classnames.bind(styles);
const cxForms = classnames.bind(formStyles);

export const CreateEvent = () => {
    const { topicCreate } = useEventsContext();
    const { currentUser } = useAuthContext();

    const [values, setValues] = useState({
        subject: '',
        title: '',
        description: '',
        reward: '',
        privateSession: true,
        numberOfPeople: 1
    });

    const [errors, setErrors] = useState({
        subjectError: false,
        titleError: false,
        descriptionError: false,
        rewardError: false,
        numberOfPeopleError: false,
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

        let eventData = Object.fromEntries(formData);
        eventData.ownerID = currentUser.uid;
        // Implement if you have time
        // eventData.subjects = [];
        eventData.email = currentUser.email;

        console.log(eventData);

        Object.keys(eventData).forEach(key => setError(key, eventData[key]));

        if (Object.values(errors).some(error => error.length !== 0 || error === false)) {
            return;
        } else {
            eventService.createEvent(eventData)
                .then(result => console.log(result))
                .then(result => topicCreate(result))
                .catch(error => alert(error));

            e.target.reset();
        }
    }

    return (
        <>
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

                <label htmlFor="">{values.privateSession}</label>
                <label htmlFor='privateSession'>Private session</label>
                <input type="checkbox" id='privateSession' name='privateSession' defaultChecked={values.privateSession} value={values.privateSession} />

                <label htmlFor="numberOfPeople">Number of people</label>
                <input type="number" placeholder="Enter the number of people" id="numberOfPeople" min="1" max="20" name='numberOfPeople' value={values.numberOfPeople} onChange={changeHandler} onBlur={onErrorHandler}  className={cxForms(`${errors.numberOfPeopleError?.length > 0 ? 'is-invalid' : ''}`)} />
                <span>{errors.numberOfPeopleError}</span>

                <button className={cx('create-button')}>Create</button>
            </form>
        </>
    );
}