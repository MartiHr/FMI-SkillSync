import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../public/static/images/logo.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

let cx = classNames.bind(styles);

export const Header = () => {

    //const { user } = useSelector((state) => state.auth);
    const { currentUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const openHeader = () => {
        setIsOpen((state) => !state)
    }

    const onHover = () => {

    }

    return (
        <header onMouseOver={() => { return setIsOpen(true) }} onMouseOut={() => { return setIsOpen(false) }} className={cx('header', isOpen ? '' : 'header-closed')} >
            <ul className={cx('header-list')}>
                <li className={cx('header-heading')}>
                    <img className={cx('header-logo')} src={logo} alt='The logo of the web application' />
                    <Link className={cx('header-heading-text')} to="/">FMI Skill Sync</Link>
                </li>
                <li>
                    <i className={cx('header-icon', 'fa-solid', 'fa-home')}></i>
                    <Link to="/">Home</Link>
                </li>
                {currentUser ?
                    <>
                        {/* TODO: Remove me */}
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')}></i>
                            <Link to="/chat-room/kotsev@gmail.com">Chat (Remove)</Link>
                        </li>
                        
                        {/* TODO: Remove me */}
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')}></i>
                            <Link to="/events">Events (Remove)</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')}></i>
                            <Link to="/forum">Forum</Link>
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
                    </>}
            </ul>
        </header>
    );
};