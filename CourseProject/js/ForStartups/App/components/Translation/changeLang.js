import { translate } from "../../../../../assets/translate/translate.js";
import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";

class ChangeLang {
    localStorageHandler = new LocalStorageHandler();

    init() {
        document.querySelector('.changeLang').addEventListener('click', this.toggleLang.bind(this));
    }

    toggleLang() {
        const user = JSON.parse(this.localStorageHandler.get('user'));

        if(document.querySelector('.changeLang').textContent === 'en') {
            document.querySelector('.changeLang').textContent = 'ru';
            changeLang('ru');
            user.lang = 'ru';
        }
        else {
            document.querySelector('.changeLang').textContent = 'en';
            changeLang('en');
            user.lang = 'en';
        }

        this.localStorageHandler.set('user', JSON.stringify(user));
    }
}

export function changeLang(lang) {
    const translation = translate[lang];

    document.querySelector('.changeLang').textContent = lang;

    const elements = document.querySelectorAll('[data-i18]');

    elements.forEach((element) => {
        const key = element.getAttribute('data-i18');
        const translatedText = translation[key];

        element.textContent = translatedText;
    });

    const inputs = document.querySelectorAll('[data-i18-placeholder]');

    inputs.forEach((element) => {
        const key = element.getAttribute('data-i18-placeholder');
        const translatedText = translation[key];

        element.placeholder = translatedText;
    });
}

export default ChangeLang;
