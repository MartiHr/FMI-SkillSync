import classNames from 'classnames/bind';
import styles from './EventDetails.module.css';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from 'react-router';

let cx = classNames.bind(styles);

export const EventDetails = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);

    return (
        <div className={cx("details-container")}>
            <div className={cx("details-box")}>
                <div className={cx("props-container")}>
                    <div className={cx("header-props-container")}>
                        <img className={cx("icon")} src={"https://wallpapers.com/images/hd/cool-picture-art-of-lion-rlst9ftvz1dvvn37.jpg"} />
                        <div className={cx("title-box")}>
                            <h1>Kak se reshavat integrali?</h1>
                        </div>
                    </div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <div className={cx("pills-container")}>
                        <p>Math</p>
                        <p>Descreate Math</p>
                        <p>Calculus</p>
                    </div>
                </div>
            </div></div>
    )
}