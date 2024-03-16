import styles from './AcceptRequest.module.css';
import classnames from 'classnames/bind';
import { useContext, useState } from 'react';
import { RadioButtonGroup } from './RadioButtonGroup';
import * as eventService from '../../../services/eventsService';
import { EventsContext } from '../../../contexts/EventsContext';
import { useNavigate, useParams } from 'react-router';

const cx = classnames.bind(styles);

export const AcceptRequest = () => {
    const [values, setValues] = useState({
        location: '1',
    });

    const [selectedOption, setSelectedOption] = useState('1');
    const { id } = useParams();
    const { eventSelect } = useContext(EventsContext);
    const currentEvent = eventSelect(id);
    const navigate = useNavigate();

    function handleChange(event) {
        setSelectedOption(event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Access values from FormData
        const date = formData.get('date');

        // Now you can use these values as needed, such as sending them to an API or performing other actions.
        console.log("Selected location:", selectedOption);
        console.log("Selected date:", date);

        eventService.setDateAndLocationToEvent(id, selectedOption, date)
            .then(res => {
                if (currentEvent?.privateSession !== ' ') {
                    navigate(`/my-events`);
                }
                else {
                    navigate(`/open-events`);
                }
            })
            .catch(err => {
                console.log('error')
            })
    }

    return (
        <>
            <form className={cx('create-form')} onSubmit={submit}>
                <h3>Accept request</h3>

                <p>Choose location:</p>
                <div className={cx('image-wrapper')}>
                    <RadioButtonGroup selectedOption={selectedOption} handleChange={handleChange} />
                </div>

                <label htmlFor="date">Date</label>
                <input type="date" placeholder="Enter the date" id="date" name='date' onClick={(e) => e.currentTarget.showPicker()} value={values.date} />

                <button className={cx('create-button')}>Accept</button>
            </form>
        </>
    );
}