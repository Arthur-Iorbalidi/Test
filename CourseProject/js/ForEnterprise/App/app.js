import LocalStorageHandler from '../../services/LocalStorageHandler.js';
import Account from './components/Account/Account.js';
import Authorization from './components/Authorization/Authorization.js';
import Logout from './components/Logout/Logout.js';
import ValidationRegistration from './components/Registration/ValidationRegistration.js';
import Reset from './components/Reset/reset.js';
import ChangeLang, { changeLang } from './components/Translation/changeLang.js';
import ChangeTheme from './components/changeTheme/changeTheme.js';

class App {
    localStorageHandler = new LocalStorageHandler();

    init() {
        const validationRegistration = new ValidationRegistration();
        validationRegistration.init();

        const authorization = new Authorization();
        authorization.init();

        const logout = new Logout();
        logout.init();

        const account = new Account();
        account.init();

        const changeLang = new ChangeLang();
        changeLang.init();

        const changeTheme = new ChangeTheme();
        changeTheme.init();

        const reset = new Reset();
        reset.init();

        this.isLogined();
    }

    isLogined() {
        const user = JSON.parse(this.localStorageHandler.get('user'));
        if(!user) {
            return;
        }
        else {
            document.querySelector('.logIn').classList.add('hidden');
            document.querySelector('.sighIn').classList.add('hidden');

            document.querySelector('.logout').classList.remove('hidden');

            document.querySelectorAll('.open').forEach((elem) => {
                elem.classList.remove('hidden');
            });

            this.changeTheme(user.theme);
            changeLang(user.lang);
        }
    }

    changeTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('darkTheme');
        }
        else {
            document.body.classList.add('darkTheme');
        }
    }
}

export default App;