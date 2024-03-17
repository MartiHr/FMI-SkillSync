import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/static/images/logo.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import * as requestService from '../../services/requestsService';
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

let cx = classNames.bind(styles);

export const Header = () => {

    const { t } = useTranslation();

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

    useEffect(() => {
        requestService.incomingRequest(currentUser?.email)
            .then(res => {
                setHasRequests(res);
            })
            .catch(err => console.log(err));
    }, [currentUser?.email]);

    return (
        <header onClick={() => { return isOpen ? setIsOpen(false) : setIsOpen(true) }} className={cx('header', isOpen ? '' : 'header-closed')} >
            <ul className={cx('header-list')}>
                <li className={cx('header-heading')}>
                    <img className={cx('header-logo')} src={logo} alt='The logo of the web application' />
                    <Link className={cx('header-heading-text')} to="/">FMI Skill Sync</Link>
                </li>
                <li>
                    <i className={cx('header-icon', 'fa-solid', 'fa-home')} onClick={(event) => redirect('/', event)}></i>
                    <Link to="/">{t("HomeButtonText")}</Link>
                </li>
                {currentUser ?
                    <>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-bell', hasRequests ? 'header-requests' : '')} onClick={(event) => redirect('/my-requests', event)}></i>
                            <Link to="/my-requests">{t("RequestsButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-bars')} onClick={(event) => redirect('/events', event)}></i>
                            <Link to="/events">{t("EventsButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-calendar')} onClick={(event) => redirect('/events', event)}></i>
                            <Link to="/set-events">{t("SetEventsButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-comment')} onClick={(event) => redirect('/forum', event)}></i>
                            <Link to="/forum">{t("ForumButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-user')} onClick={(event) => redirect('/profile', event)}></i>
                            <Link to="/profile">{t("ProfileButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-door-open')} onClick={(event) => redirect('/logout', event)}></i>
                            <Link to="/logout">{t("LogoutButtonText")}</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-play')} onClick={(event) => redirect('/register', event)}></i>
                            <Link to="/register">{t("RegisterButtonText")}</Link>
                        </li>
                        <li>
                            <i className={cx('header-icon', 'fa-solid', 'fa-right-to-bracket')} onClick={(event) => redirect('/login', event)}></i>
                            <Link to="/login">{t("LoginButtonText")}</Link>
                        </li>
                    </>}
            </ul>
        </header>
    );
};