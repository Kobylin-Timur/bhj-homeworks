document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');

    // Функция отображения курсов валют
    function renderRates(valutes) {
        // Очищаем контейнер
        itemsContainer.innerHTML = '';

        // Преобразуем объект валют в массив и перебираем
        Object.values(valutes).forEach(currency => {
            const item = document.createElement('div');
            item.className = 'item';

            item.innerHTML = `
                <div class="item__code">${currency.CharCode}</div>
                <div class="item__value">${currency.Value}</div>
                <div class="item__currency">руб.</div>
            `;

            itemsContainer.appendChild(item);
        });
    }

    // Функция загрузки данных с сервера
    async function fetchRates() {
        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
            const data = await response.json();
            return data.response.Valute;
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            return null;
        }
    }

    // Основная функция загрузки
    async function loadRates() {
        // Показываем лоадер перед началом загрузки
        loader.classList.add('loader_active');

        // Загружаем данные
        const valutes = await fetchRates();

        // Скрываем лоадер после получения данных
        loader.classList.remove('loader_active');

        // Если данные получены — отображаем их
        if (valutes) {
            renderRates(valutes);
        }
    }

    // Запускаем загрузку
    loadRates();
});