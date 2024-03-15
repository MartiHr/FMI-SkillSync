import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../public/static/images/logo.png'
import { useState } from 'react';

let cx = classNames.bind(styles);

export const Header = () => {

    //const { user } = useSelector((state) => state.auth);
    const { user } = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const openHeader = () => {
        setIsOpen((state) => !state)
    }

    return (
        <header onClick={() => { return isOpen ? setIsOpen(false) : null }} className={cx('header', isOpen ? '' : 'header-closed')}>
            <ul className={cx('header-list')}>
                <li className={cx('header-heading')}>
                    <img onClick={openHeader} className={cx('header-logo')} src={logo} alt='The logo of the web application' />
                    <Link className={cx('header-heading-text')} to="/">FMI Skill Sync</Link>
                </li>
                {user ?
                    <>
                        <li>
                            <Link to="/review"><i className={cx('header-icon', 'fa-solid', 'fa-code')}></i></Link>
                            <Link to="/review">Review</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-door-open')}></i>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-play')}></i>
                            <Link to="/register">Start now</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-right-to-bracket')}></i>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-home')}></i>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')}></i>
                            <Link to="/forum">Forum</Link>
                        </li>
                    </>}
            </ul>
        </header>
    );
};