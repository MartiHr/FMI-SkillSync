import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import myGif from '../../../public/static/images/404.gif';
import notFoundStyles from './NotFound.module.css';

let cx = classNames.bind(notFoundStyles);

export const NotFound = () => {
    return (
        <div className={cx("error-page")}>
            <div className={cx("error-page-container")}>
                <img className={cx("error-page-gif")} src={myGif} alt="GIF" />

                <p className={cx("error-page-text")}>Oops! Page not found</p>
                <Link to="/" className={cx("error-page-link")}>
                    <button className={cx("error-page-button")}>
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};
