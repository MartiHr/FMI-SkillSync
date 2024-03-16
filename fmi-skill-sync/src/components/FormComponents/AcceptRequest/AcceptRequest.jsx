import styles from './AcceptRequest.module.css';
import formStyles from '../../FormComponents/Form.module.css';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { RadioButtonGroup } from './RadioButtonGroup';

const cx = classnames.bind(styles);
const cxForms = classnames.bind(formStyles);

export const AcceptRequest = () => {
    const [values, setValues] = useState({
        location: '1',
    });

    const [selectedOption, setSelectedOption] = useState('1');

    function handleChange(event) {
        setSelectedOption(event.target.value);
    }

    return (
        <>
            <form className={cx('create-form')} onSubmit={console.log('Fix')}>
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