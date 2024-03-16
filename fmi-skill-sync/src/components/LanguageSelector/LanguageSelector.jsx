import i18n from 'i18next';
import classNames from 'classnames/bind';
import languageSelectorStyles from './LanguageSelector.module.css';

let cx = classNames.bind(languageSelectorStyles);

export const LanguageSelector = () => {

    const onChange = () => {
        i18n.changeLanguage(i18n.language === "en" ? "bg" : "en");
    };

    return (
        <section title=".slideThree">
            <div className={cx('slideThree')}>
                <input type="checkbox" id="slideThree" name="check" onChange={onChange} />
                <label htmlFor="slideThree"></label>
            </div>
        </section>
    )
}