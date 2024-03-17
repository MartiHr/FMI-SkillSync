import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';

let cx = classNames.bind(styles);

export const Student = ({ name }) => {
    return (
        <>
            <p className={cx("name-item")}>{name}</p>
        </>
    )
}