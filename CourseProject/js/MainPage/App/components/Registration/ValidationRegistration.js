import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";

class ValidationRegistration {
    localStorageHandler = new LocalStorageHandler();
    namePattern = /^[a-zA-Zа-яА-ЯёЁ]{3,}$/;
    numberPattern = /^\+375\d{9}$/;
    emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    isNameValid = false;
    isSurnameValid = false;
    isPatronymicValid = true;
    isBirthdayValid = false;
    isNumberValid = false;
    isEmailValid = false;
    isPasswordValid = false;
    isRepeatPasswordValid = false;

    nameValue = null;
    surnameValue = null;
    patronymicValue = null;
    birtdayValue = null;
    numberValue = null;
    emailValue = null;
    passwordValue = null;


    init() {
        document.querySelector('.modalRegister_Background').addEventListener('click', this.back.bind(this));

        document.querySelector('.sighIn').addEventListener('click', this.open.bind(this));

        document.querySelector('.sighIn_burger').addEventListener('click', this.open.bind(this));

        document.querySelector('.inputName').addEventListener('input', this.validationName.bind(this));

        document.querySelector('.inputSurname').addEventListener('input', this.validationSurname.bind(this));

        document.querySelector('.inputPatronymic').addEventListener('input', this.validationPatronymic.bind(this));
        
        document.querySelector('.inputBirthday').addEventListener('input', this.validationBirthday.bind(this));

        document.querySelector('.inputNumber').addEventListener('input', this.validationNumber.bind(this));

        document.querySelector('.inputEmail').addEventListener('input', this.validationEmail.bind(this));

        document.querySelector('.inputPassword').addEventListener('input', this.validationPassword.bind(this));
        document.querySelector('.generatePassword').addEventListener('click', this.generatePassword.bind(this));

        document.querySelector('.inputRepeatPassword').addEventListener('input', this.validationRepeatPassword.bind(this));

        document.querySelector('.form_Register').addEventListener('submit', this.submit.bind(this));
    }

    validationName(event) {
        if(!this.namePattern.test(event.target.value)) {
            document.querySelector('.mistakeMessageName').textContent = 'Min length: 3. shouldn\'t contain numbers special symbols and spaces';
            this.isNameValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageName').textContent = '';
            this.isNameValid = true;
            event.target.classList.add('correct');
            this.nameValue = event.target.value;
        }

        this.checkValidation();
    }

    validationSurname(event) {
        if(!this.namePattern.test(event.target.value)) {
            document.querySelector('.mistakeMessageSurname').textContent = 'Min length: 3. shouldn\'t contain numbers special symbols and spaces';
            this.isSurnameValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageSurname').textContent = '';
            this.isSurnameValid = true;
            event.target.classList.add('correct');
            this.surnameValue = event.target.value;
        }

        this.checkValidation();
    }

    validationPatronymic(event) {
        if(!this.namePattern.test(event.target.value) && event.target.value !== '') {
            document.querySelector('.mistakeMessagePatronymic').textContent = 'Min length: 3. shouldn\'t contain numbers special symbols and spaces';
            this.isPatronymicValid = false;
            event.target.classList.remove('correct');
            this.patronymicValue = null;
        }
        else {
            document.querySelector('.mistakeMessagePatronymic').textContent = '';
            this.isPatronymicValid = true;
            event.target.classList.add('correct');
            this.patronymicValue = event.target.value;
        }

        this.checkValidation();
    }

    validationNumber(event) {
        if(!this.numberPattern.test(event.target.value)) {
            document.querySelector('.mistakeMessageNumber').textContent = 'Number should be belorussian and starts with +';
            this.isNumberValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageNumber').textContent = '';
            this.isNumberValid = true;
            event.target.classList.add('correct');
            this.numberValue = event.target.value;
        }

        this.checkValidation();
    }

    validationEmail(event) {
        if(!this.emailPattern.test(event.target.value)) {
            document.querySelector('.mistakeMessageEmail').textContent = 'It should be email';
            this.isEmailValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageEmail').textContent = '';
            this.isEmailValid = true;
            event.target.classList.add('correct');
            this.emailValue = event.target.value;
        }

        this.checkValidation();
    }

    validationPassword(event) {
        if(!this.passwordPattern.test(event.target.value)) {
            document.querySelector('.mistakeMessagePassword').textContent = 'Min length: 8. Max: 20. Should contain at least one one uppercase letter, one lowercase letter, one number and one special character';
            this.isPasswordValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessagePassword').textContent = '';
            this.isPasswordValid = true;
            event.target.classList.add('correct');
            this.passwordValue = event.target.value;
        }

        document.querySelector('.inputRepeatPassword').dispatchEvent(new Event("input"));
        this.checkValidation();
    }

    validationRepeatPassword(event) {
        if(event.target.value !== this.passwordValue) {
            document.querySelector('.mistakeMessageRepeatPassword').textContent = 'passwords don\'t match';
            this.isRepeatPasswordValid = false;
            event.target.classList.remove('correct');
        }
        else {
            document.querySelector('.mistakeMessageRepeatPassword').textContent = '';
            this.isRepeatPasswordValid = true;
            event.target.classList.add('correct');
        }

        this.checkValidation();
    }

    validationBirthday(event) {
        const input = event.target;
        const value = this.formatInputDate(input.value);

        input.value = value;

        const isValidDate = this.validateDate(input.value);

        if (!isValidDate) {
            document.querySelector('.mistakeMessageBirthday').textContent = 'Incorrect. The date must be of the form dd-mm-yyyy';
            event.target.classList.remove('correct');
            this.isBirthdayValid = false;
        } else {
            document.querySelector('.mistakeMessageBirthday').textContent = "";
            var enteredDate = this.getDateFromInput(input.value);
            var today = new Date();
      
            if (this.calculateAge(enteredDate, today) < 16) {
                document.querySelector('.mistakeMessageBirthday').textContent = "Minimum age - 16";
                event.target.classList.remove('correct');
                this.isBirthdayValid = false;
            }
            else {
                input.classList.add('correct');
                this.isBirthdayValid = true;
                this.birtdayValue = input.value;
            }
        }
    }

    formatInputDate(inputDate) {
        var formattedDate = inputDate.replace(/\D/g, "");
        formattedDate = formattedDate.slice(0, 8);
    
        if (formattedDate.length >= 2) {
            formattedDate = formattedDate.slice(0, 2) + "-" + formattedDate.slice(2);
        }
        if (formattedDate.length > 4) {
            formattedDate = formattedDate.slice(0, 5) + "-" + formattedDate.slice(5);
        }
    
        return formattedDate;
    }

    validateDate(inputDate) {
        var dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        return dateRegex.test(inputDate);
    }

    getDateFromInput(inputDate) {
        var parts = inputDate.split("-");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;
        var year = parseInt(parts[2], 10);
    
        return new Date(year, month, day);
    }

    calculateAge(birthDate, currentDate) {
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
          age--;
        }
    
        return age;
    }

    generatePassword() {
        var password = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";

        while (!this.passwordPattern.test(password)) {
            password = "";
            for (var i = 0; i < 12; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                password += characters.charAt(randomIndex);
            }
        }

        document.querySelector('.inputPassword').value = password;
        document.querySelector('.inputRepeatPassword').value = password;
        document.querySelector('.inputPassword').dispatchEvent(new Event("input"));
    }

    checkValidation() {
        if(this.isNameValid && this.isSurnameValid && this.isPatronymicValid && this.isBirthdayValid && this.isNumberValid && this.isEmailValid && this.isPasswordValid) {
            document.querySelector('.submitRegistration').disabled = false;
        }
        else {
            document.querySelector('.submitRegistration').disabled = true;
        }
    }

    open() {
        document.querySelector('.modalRegister_Background').classList.add('active');
        document.body.classList.add('noscroll');
    }

    clear() {
        document.querySelector('.modalRegister_Background').classList.remove('active');
        document.body.classList.remove('noscroll');
    }

    back(event) {
        if (!event.target.closest('.modalRegister')) {
            this.clear();
        }
    }

    clearInputs() {
        document.querySelector('.inputName').value = '';
        document.querySelector('.inputSurname').value = '';
        document.querySelector('.inputPatronymic').value = '';
        document.querySelector('.inputBirthday').value = '';
        document.querySelector('.inputNumber').value = '';
        document.querySelector('.inputEmail').value = '';
        document.querySelector('.inputPassword').value = '';
        document.querySelector('.inputRepeatPassword').value = '';
    }

    submit(event) {
        event.preventDefault();

        const user = {
            name: this.nameValue,
            surname: this.surnameValue,
            patronymic: this.patronymicValue,
            birthday: this.birtdayValue,
            number: this.numberValue,
            email: this.emailValue,
            password: this.passwordValue,
            isLogined: true,
            theme: 'light',
            lang: 'en',
        }

        this.localStorageHandler.set('user', JSON.stringify(user));

        this.clearInputs();
        this.clear();

        this.changePage();

        document.querySelector('.submitRegistration').disabled = true;
    }

    changePage() {
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
}

export default ValidationRegistration;