import { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import imageSliderStyles from './ImageSlider.module.css';

let cx = classNames.bind(imageSliderStyles);

export const ImageSlider = ({ slides }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const backgroundImageStyle = {
        backgroundImage:
            `url(${slides[currentIndex].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        <div className={cx("slider")}>
            <div>
                <div onClick={goToPrevious} className={cx("leftArrow")} >
                    ❰
                </div>
                <div onClick={goToNext} className={cx("rightArrow")}>
                    ❱
                </div>
            </div>
            <div className={cx('currentSlide')} style={backgroundImageStyle}>
            </div>
            <div className={cx("dotsContainer")}>
                {slides.map((slide, slideIndex) => (
                    <div
                        className={cx("dot")}
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
    );
};
