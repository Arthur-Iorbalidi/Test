class BurgerMenu {
    init() {
        document.querySelector('.burger_menu').addEventListener('click', this.hideBurger.bind(this));

        document.querySelector('.burger').addEventListener('click', this.toggleBurger.bind(this));
    }

    hideBurger(event) {
        const target = event.target;
        if (target.closest('li')) {
            document.querySelector('.burger_menu').classList.remove('opened');
            document.querySelector('.burger').classList.remove('burgeroff');
            document.body.classList.remove('noscroll');
        }
    }

    toggleBurger(event) {
        const target = event.target;
        target.classList.toggle('burgeroff');
        document.querySelector('.burger_menu')?.classList.toggle('opened');
        document.body.classList.toggle('noscroll');
    }
}

export default BurgerMenu;
