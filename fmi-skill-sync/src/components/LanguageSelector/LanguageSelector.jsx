import i18n from 'i18next';
import classNames from 'classnames/bind';
import languageSelectorStyles from './LanguageSelector.module.css';

let cx = classNames.bind(languageSelectorStyles);

export const LanguageSelector = () => {

    function toggleCheckbox() {
        var checkbox = document.getElementById('slideThree');
        checkbox.checked = !checkbox.checked;
    }

    const onChange = (event) => {
        console.log(i18n.language);
        i18n.changeLanguage(i18n.language === "en" ? "bg" : "en");
        var checkbox = document.getElementById('slideThree');
        event.value.checked = !event.value.checked;
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