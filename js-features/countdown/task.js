document.addEventListener('DOMContentLoaded', () => {

    const timerElement = document.getElementById('timer');

    if (!timerElement) {
        console.error('Элемент #timer не найден в HTML');
        return;
    }

    let timeLeft = parseInt(timerElement.textContent);


    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const hDisplay = h < 10 ? '0' + h : h;
        const mDisplay = m < 10 ? '0' + m : m;
        const sDisplay = s < 10 ? '0' + s : s;

        return `${hDisplay}:${mDisplay}:${sDisplay}`;
    }


    function downloadFile() {
        const link = document.createElement('a');

        link.href = 'https://netology.ru/';
        link.download = 'prize.txt';
        link.target = '_blank';
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    function startTimer() {

        timerElement.textContent = formatTime(timeLeft);

        const intervalId = setInterval(() => {
            timeLeft--;


            timerElement.textContent = formatTime(timeLeft);


            if (timeLeft <= 0) {
                clearInterval(intervalId);


                setTimeout(() => {
                    alert('Вы победили в конкурсе!');

                    downloadFile();
                }, 100);
            }
        }, 1000);
    }

    startTimer();
});