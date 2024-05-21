import LocalStorageHandler from "../../../../services/LocalStorageHandler.js";

class Reset {
    localStorageHandler = new LocalStorageHandler();

    init() {
        document.querySelectorAll('.reset').forEach((elem) => {
            elem.addEventListener('click', this.reset.bind(this));
        });
    }

    reset() {
        this.localStorageHandler.clear();
        location.reload();
    }
}

export default Reset;