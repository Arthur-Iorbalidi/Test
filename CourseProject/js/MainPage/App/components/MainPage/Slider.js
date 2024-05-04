class Slider {
    currentSlide = 0;
    totalSlides = 3;

    init() {
        document.querySelector('.arrowLeft').addEventListener('click', this.left.bind(this));

        document.querySelector('.arrowRight').addEventListener('click', this.right.bind(this));
    }

    right() {
        const container =  document.querySelector('.slider_container');
        if(this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;

            container.style.right = (100 * this.currentSlide) + '%';
        }
        else {
            this.currentSlide = 0;

            container.style.right = (100 * this.currentSlide) + '%';
        }
    }

    left() {
        const container =  document.querySelector('.slider_container');
        if(this.currentSlide > 0) {
            this.currentSlide--;

            container.style.right = (100 * this.currentSlide) + '%';
        }
        else {
            this.currentSlide = this.totalSlides - 1;

            container.style.right = (100 * this.currentSlide) + '%';
        }
    }
}

export default Slider;
