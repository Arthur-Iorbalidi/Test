import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";

class ChangeTheme {
    localStorageHandler = new LocalStorageHandler();

    init() {
        document.querySelector('.changeTheme').addEventListener('click', this.toggleTheme.bind(this));
    }

    toggleTheme() {
        document.body.classList.toggle('darkTheme');

        const user = JSON.parse(this.localStorageHandler.get('user'));

        if (user.theme === 'light') {
            user.theme = 'dark';
        }
        else {
            user.theme = 'light';
        }

        this.localStorageHandler.set('user', JSON.stringify(user));
    }
}

export default ChangeTheme;
