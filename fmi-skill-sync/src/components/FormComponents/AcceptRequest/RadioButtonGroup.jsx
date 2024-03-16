import styles from './AcceptRequest.module.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export const RadioButtonGroup = (props) => {
    return (
        <>
            <div className={cx('image-wrapper')}>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Fzad325.jpg?alt=media&token=50c0e5b0-ae74-4016-b465-881347f87464" alt="no photo" />
                    <label><input type='radio' name="first" value="1" onChange={props.handleChange} checked={props.selectedOption === '1'} ></input>Behind 325</label>
                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Fzad200.jpg?alt=media&token=252f1868-bdc6-4b15-b344-5bd0c413941f" alt="no photo" />
                    <label><input type='radio' name="second" value="2" onChange={props.handleChange} checked={props.selectedOption === '2'}></input>Behind 200</label>

                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Faquarium.jpg?alt=media&token=dd0ff6fb-b098-4a9a-be0d-a0f422783b74" alt="no photo" />
                    <label><input type='radio' name="third" value="3" onChange={props.handleChange} checked={props.selectedOption === '3'}></input>The aquarium</label>

                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2F6tietaj.jpg?alt=media&token=1aaaee8a-b79c-4a68-8499-c1daaa7e8887" alt="no photo" />
                    <label><input type='radio' name="fourth" value="4" onChange={props.handleChange} checked={props.selectedOption === '4'}></input>The 6th floor</label>
                </div>
            </div>
        </>
    );
}