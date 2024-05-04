import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";

class Authorization {
    localStorageHandler = new LocalStorageHandler();
    
    isNameValid = false;
    isPasswordValid = false;


    init() {
        document.querySelector('.modalAuthorization_Background').addEventListener('click', this.back.bind(this));

        document.querySelector('.logIn').addEventListener('click', this.open.bind(this));

        document.querySelector('.inputEmailAuthorization').addEventListener('input', this.validationEmail.bind(this));

        document.querySelector('.inputPasswordAuthorization').addEventListener('input', this.validationPassword.bind(this));

        document.querySelector('.form_Authorization').addEventListener('submit', this.submit.bind(this));
    }

    validationEmail(event) {
        const user = JSON.parse(this.localStorageHandler.get('user'));
        if(!user) {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = 'There isn\'t such user';
            this.isNameValid = false;
            return;
        }
        if(user.email !== event.target.value) {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = 'There isn\'t such user';
            this.isNameValid = false;
        }
        else {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = '';
            this.isNameValid = true;
        }

        this.checkValidation();
    }

    validationPassword(event) {
        const user = JSON.parse(this.localStorageHandler.get('user'));
        if (!this.isNameValid) {
            document.querySelector('.mistakeMessagePasswordAuthorization').textContent = 'Enter your email';
            this.isPasswordValid = false;
            return;
        }
        if(user.password !== event.target.value) {
            document.querySelector('.mistakeMessagePasswordAuthorization').textContent = 'Incorrect password';
            this.isPasswordValid = false;
        }
        else {
            document.querySelector('.mistakeMessagePasswordAuthorization').textContent = '';
            this.isPasswordValid = true;
            this.passwordValue = event.target.value;
        }

        this.checkValidation();
    }

    checkValidation() {
        if(this.isNameValid && this.isPasswordValid) {
            document.querySelector('.submitAuthorization').disabled = false;
        }
        else {
            document.querySelector('.submitAuthorization').disabled = true;
        }
    }

    open() {
        document.querySelector('.modalAuthorization_Background').classList.add('active');
        document.body.classList.add('noscroll');
    }

    clear() {
        document.querySelector('.modalAuthorization_Background').classList.remove('active');
        document.body.classList.remove('noscroll');
    }

    back(event) {
        if (!event.target.closest('.modalAuthorization')) {
            this.clear();
        }
    }

    clearInputs() {
        document.querySelector('.inputEmailAuthorization').value = '';
        document.querySelector('.inputPasswordAuthorization').value = '';
    }

    submit(event) {
        event.preventDefault();

        this.clearInputs();
        this.clear();

        const user = JSON.parse(this.localStorageHandler.get('user'));
        user.isLogined = true;
        this.localStorageHandler.set('user', JSON.stringify(user));

        this.changeTheme(user.theme);
        this.changePage();

        document.querySelector('.submitAuthorization').disabled = true;
    }

    changePage(){
        document.querySelector('.logIn').classList.add('hidden');
        document.querySelector('.sighIn').classList.add('hidden');

        document.querySelector('.logout').classList.remove('hidden');

        document.querySelectorAll('.open').forEach((elem) => {
            elem.classList.remove('hidden');
        });
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

export default Authorization;