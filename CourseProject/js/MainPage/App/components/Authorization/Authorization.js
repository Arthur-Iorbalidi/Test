import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";
import { changeLang } from "../Translation/changeLang.js";

class Authorization {
    localStorageHandler = new LocalStorageHandler();
    
    emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    isEmailValid = false;
    emailValue = '';
    isPasswordValid = false;
    passwordValue = '';


    init() {
        document.querySelector('.modalAuthorization_Background').addEventListener('click', this.back.bind(this));

        document.querySelector('.cross_authorization').addEventListener('click', this.clear.bind(this));

        document.querySelector('.logIn').addEventListener('click', this.open.bind(this));

        document.querySelector('.logIn_burger').addEventListener('click', this.open.bind(this));

        document.querySelector('.inputEmailAuthorization').addEventListener('input', this.validationEmail.bind(this));

        document.querySelector('.inputPasswordAuthorization').addEventListener('input', this.validationPassword.bind(this));

        document.querySelector('.form_Authorization').addEventListener('submit', this.submit.bind(this));
    }

    validationEmail(event) {
        if(!this.emailPattern.test(event.target.value)) {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = 'It should be email';
            this.isEmailValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = '';
            this.isEmailValid = true;
            event.target.classList.add('correct');
            this.emailValue = event.target.value;
        }

        this.checkValidation();
    }

    validationPassword(event) {
        if(!this.passwordPattern.test(event.target.value)) {
            document.querySelector('.mistakeMessagePasswordAuthorization').textContent = 'Min length: 8. Max: 20. Should contain at least one one uppercase letter, one lowercase letter, one number and one special character';
            this.isPasswordValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessagePasswordAuthorization').textContent = '';
            this.isPasswordValid = true;
            event.target.classList.add('correct');
            this.passwordValue = event.target.value;
        }

        this.checkValidation();
    }

    checkValidation() {
        if(this.isEmailValid && this.isPasswordValid) {
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
        this.clearInputs();
    }

    back(event) {
        if (!event.target.closest('.modalAuthorization')) {
            this.clear();
        }
    }

    clearInputs() {
        document.querySelector('.inputEmailAuthorization').value = '';
        document.querySelector('.inputPasswordAuthorization').value = '';
        document.querySelector('.mistakeMessageEmailAuthorization').textContent = '';
        document.querySelector('.mistakeMessagePasswordAuthorization').textContent = '';
        document.querySelector('.submitAuthorization').disabled = true;
    }

    submit(event) {
        event.preventDefault();

        const users = JSON.parse(this.localStorageHandler.get('users'));

        if(!users) {
            document.querySelector('.mistakeMessageEmailAuthorization').textContent = 'There isn\'t such user';
        }
        else {
            let isEmailFound = false;
            let user;
            users.forEach((userItem) => {
                if(userItem.email === this.emailValue) {
                    isEmailFound = true;
                    user = userItem;
                }
            });

            if(isEmailFound) {
                if(user.password === this.passwordValue) {
                    this.clearInputs();
                    this.clear();

                    this.localStorageHandler.set('user', JSON.stringify(user));

                    this.changeTheme(user.theme);
                    changeLang(user.lang);
                    this.changePage();

                    document.querySelector('.submitAuthorization').disabled = true;
                }
                else {
                    document.querySelector('.mistakeMessagePasswordAuthorization').textContent = 'Incorrect password';
                }
            }
            else {
                document.querySelector('.mistakeMessageEmailAuthorization').textContent = 'There isn\'t such user';
            }
        }
    }

    changePage(){
        document.querySelector('.logIn').classList.add('hidden');
        document.querySelector('.logIn_burger').classList.add('hidden');
        document.querySelector('.sighIn').classList.add('hidden');
        document.querySelector('.sighIn_burger').classList.add('hidden');

        document.querySelector('.logout').classList.remove('hidden');
        document.querySelector('.logout_burger').classList.remove('hidden');

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