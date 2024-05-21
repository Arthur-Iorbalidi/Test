import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";


class Logout {
    localStorageHandler = new LocalStorageHandler();

    init() {
        document.querySelector('.logout').addEventListener('click', this.logout.bind(this));
    }

    logout() {
        this.changePage();

        const users = JSON.parse(this.localStorageHandler.get('users'));
        const user = JSON.parse(this.localStorageHandler.get('user'));

        for(let i = 0; i < users.length; i++) {
            if(users[i].email === user.email) {
                users[i].lang = user.lang;
                users[i].theme = user.theme;

                break;
            } 
        }

        this.localStorageHandler.set('users', JSON.stringify(users));
        this.localStorageHandler.remove('user');
    }

    changePage() {
        document.querySelector('.logIn').classList.remove('hidden');
        document.querySelector('.sighIn').classList.remove('hidden');

        document.querySelector('.logout').classList.add('hidden');

        document.querySelectorAll('.open').forEach((elem) => {
            elem.classList.add('hidden');
        });
    }
}

export default Logout;