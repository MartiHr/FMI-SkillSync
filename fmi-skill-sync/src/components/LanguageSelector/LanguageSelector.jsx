import i18n from 'i18next';
import classNames from 'classnames/bind';
import languageSelectorStyles from './LanguageSelector.module.css';

let cx = classNames.bind(languageSelectorStyles);

export const LanguageSelector = () => {

    const onChange = () => {
        console.log(i18n.language);
        i18n.changeLanguage(i18n.language === "en" ? "bg" : "en");
    };

    return (
        <div className={cx("select-container")}>
            <p>EN</p>
            <input id="btn" type="checkbox" name="language" onChange={onChange} />
            <label for="btn"></label>
            <div class="plate"></div>
            <p>BG</p>
        </div>
    )
}