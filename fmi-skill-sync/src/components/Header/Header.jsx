import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/static/images/logo.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import * as requestService from '../../services/requestsService';

let cx = classNames.bind(styles);

export const Header = () => {

    //const { user } = useSelector((state) => state.auth);
    const { currentUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [hasRequests, setHasRequests] = useState(false);

    const openHeader = () => {
        setIsOpen((state) => !state)
    }

    const navigate = useNavigate();

    const redirect = (path, event) => {
        event.stopPropagation();
        navigate(path);
    }

    useState(() => {
        requestService.incomingRequest(currentUser?.email)
            .then(res => {
                setHasRequests(res);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <header onClick={() => { return isOpen ? setIsOpen(false) : setIsOpen(true) }} className={cx('header', isOpen ? '' : 'header-closed')} >
            <ul className={cx('header-list')}>
                <li className={cx('header-heading')}>
                    <img className={cx('header-logo')} src={logo} alt='The logo of the web application' />
                    <Link className={cx('header-heading-text')} to="/">FMI Skill Sync</Link>
                </li>
                <li>
                    <i className={cx('header-icon', 'fa-solid', 'fa-home')} onClick={(event) => redirect('/', event)}></i>
                    <Link to="/">Home</Link>
                </li>
                {currentUser ?
                    <>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-bell', hasRequests ? 'header-requests' : '')} onClick={(event) => redirect('/events', event)}></i>
                            <Link to="/my-requests">Requests</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-bars')} onClick={(event) => redirect('/events', event)}></i>
                            <Link to="/events">Events</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')} onClick={(event) => redirect('/forum', event)}></i>
                            <Link to="/forum">Forum</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-door-open')} onClick={(event) => redirect('/logout', event)}></i>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-play')} onClick={(event) => redirect('/register', event)}></i>
                            <Link to="/register">Start now</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-right-to-bracket')} onClick={(event) => redirect('/login', event)}></i>
                            <Link to="/login">Login</Link>
                        </li>
                    </>}
            </ul>
        </header>
    );
};