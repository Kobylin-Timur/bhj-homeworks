document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');

    function loadPoll() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status === 200) {
                const pollData = xhr.response;
                if (pollData?.data?.title && pollData?.data?.answers) {
                    pollTitle.textContent = pollData.data.title;
                    pollData.data.answers.forEach((answer, index) => {
                        const button = document.createElement('button');
                        button.classList.add('poll__answer');
                        button.textContent = answer;
                        button.dataset.id = pollData.id;
                        button.dataset.index = index;
                        button.addEventListener('click', onAnswerClick);
                        pollAnswers.appendChild(button);
                    });
                } else {
                    pollTitle.textContent = 'Некорректные данные опроса';
                    console.error('Ошибка: неверный формат данных', pollData);
                }
            } else {
                pollTitle.textContent = `Ошибка загрузки опроса (статус ${xhr.status})`;
            }
        };
        xhr.onerror = () => {
            pollTitle.textContent = 'Ошибка соединения. Проверьте интернет.';
        };

        xhr.send();
    }

    function onAnswerClick(event) {
        const button = event.currentTarget;
        const pollId = button.dataset.id;
        const answerIndex = button.dataset.index;

        if (!pollId || answerIndex === undefined) {
            console.error('Ошибка: отсутствуют данные для голосования');
            return;
        }

        alert('Спасибо, ваш голос засчитан!');

        pollAnswers.innerHTML = 'Загрузка результатов...';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const result = xhr.response;
                console.log('Ответ сервера после голосования:', result);
                if (result && result.stat && Array.isArray(result.stat)) {
                    displayStats(result.stat);
                } else if (result && Array.isArray(result)) {
                    displayStats(result);
                } else {
                    console.error('Неизвестный формат ответа:', result);
                    pollAnswers.innerHTML = 'Ошибка обработки статистики. Ответ сервера не содержит данных.';
                }
            } else {
                console.error('HTTP ошибка:', xhr.status, xhr.statusText);
                pollAnswers.innerHTML = `Ошибка загрузки статистики (статус ${xhr.status}). Попробуйте позже.`;
            }
        };

        xhr.onerror = () => {
            console.error('Сетевая ошибка при отправке голоса');
            pollAnswers.innerHTML = 'Ошибка сети. Не удалось отправить голос.';
        };

        xhr.send(`vote=${pollId}&answer=${answerIndex}`);
    }

    function displayStats(stat) {
        pollAnswers.innerHTML = '';
        const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

        stat.forEach(item => {
            const percent = totalVotes > 0 ? (item.votes * 100 / totalVotes).toFixed(1) : 0;
            const statItem = document.createElement('div');
            statItem.textContent = `${item.answer}: ${percent}% (${item.votes} голосов)`;
            pollAnswers.appendChild(statItem);
        });
    }

    loadPoll();
});