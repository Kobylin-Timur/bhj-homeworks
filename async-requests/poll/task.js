document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');
    async function loadPoll() {
        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
            const data = await response.json();
            pollTitle.textContent = data.data.title;
            pollAnswers.innerHTML = '';
            data.data.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'poll__answer';
                button.textContent = answer;
                button.addEventListener('click', () => {
                    alert('Спасибо, ваш голос засчитан!');
                });
                pollAnswers.appendChild(button);
            });
        } catch (error) {
            console.error('Ошибка загрузки опроса:', error);
            pollTitle.textContent = 'Не удалось загрузить опрос';
        }
    }
    loadPoll();
});