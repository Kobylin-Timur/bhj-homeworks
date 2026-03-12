document.addEventListener('DOMContentLoaded', () => {

    const rotators = document.querySelectorAll('.rotator');

    rotators.forEach(rotator => {
        const cases = rotator.querySelectorAll('.rotator__case');
        if (cases.length === 0) return;

        let currentIndex = Array.from(cases).findIndex(el =>
            el.classList.contains('rotator__case_active')
        );

        if (currentIndex === -1) currentIndex = 0;

        let intervalId = null;

        function rotate() {
            const currentCase = cases[currentIndex];
            currentCase.classList.remove('rotator__case_active');
            currentCase.style.color = '';

            currentIndex = (currentIndex + 1) % cases.length;

            const nextCase = cases[currentIndex];
            nextCase.classList.add('rotator__case_active');

            const color = nextCase.dataset.color;
            if (color) {
                nextCase.style.color = color;
            }

            const speed = parseInt(nextCase.dataset.speed) || 1000;

            clearInterval(intervalId);
            intervalId = setInterval(rotate, speed);
        }

        const initialSpeed = parseInt(cases[currentIndex].dataset.speed) || 1000;
        intervalId = setInterval(rotate, initialSpeed);
    });
});