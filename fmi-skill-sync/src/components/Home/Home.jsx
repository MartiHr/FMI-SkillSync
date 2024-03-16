import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import classNames from 'classnames/bind';
import homeStyles from './Home.module.css';
import { getProfilePictureByEmail } from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

let cx = classNames.bind(homeStyles);

export const Home = () => {
    const { t } = useTranslation();

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [urlPicture, setUrlPicture] = useState('');

    useEffect(() => {
        if (currentUser) {
            getProfilePictureByEmail(currentUser.email)
                .then(res => setUrlPicture(res))
                .catch(err => console.log(err));
        }
    });

    const slides = [
        { url: "https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2FfmiEnter.jpeg?alt=media&token=a97ef0d3-641e-4ccd-9abd-77ed33159ff5", title: "fmi enter" },
        { url: "https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Ffmi100.jpg?alt=media&token=7d922615-67b3-48e8-9283-51d9a50d8962", title: "fmi 100" },
        { url: "https://firebasestorage.googleapis.com/v0/b/fmi-codes-a71a1.appspot.com/o/images%2Ffmi200.jpg?alt=media&token=b7bbce4f-2de8-45a0-8d76-4c6332f1f6b7", title: "fmi 200" },
    ];

    return (
        <div className={cx('home-main-container')}>
            <div className={cx("home-header")}>
                <p className={cx("home-header-title")}>FMI-SkillSync</p>
                <div className={cx("float-right-container")}>
                    <ul>
                        {
                            currentUser
                                ?
                                <div className={cx("home-header-profile")}>
                                    <img className={cx("icon")} src={urlPicture} />
                                    <p>{currentUser.email}</p>
                                </div>
                                :
                                <div className={cx("home-header-nav")}>
                                    <li className={cx("home-header-nav-item")}>
                                        <Link to="/register">{t("RegisterButtonText")}</Link>
                                    </li>
                                    <li className={cx("home-header-nav-item")}>
                                        <Link to="/login">{t("LoginButtonText")}</Link>
                                    </li>
                                </div>
                        }
                    </ul>
                    <LanguageSelector/>
                </div>
            </div>

            <div className={cx("container")}>
                <ImageSlider slides={slides} />
            </div>
        </div>
    )
}