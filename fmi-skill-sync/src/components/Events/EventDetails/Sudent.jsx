import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';

let cx = classNames.bind(styles);

export const Student = ({ name }) => {
    return (
        <div className={cx("name-box")}>
            <p className={cx("name-item")}>{name}</p>
        </div>
    )
}