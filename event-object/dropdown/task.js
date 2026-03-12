document.addEventListener('DOMContentLoaded', () => {

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const valueElement = dropdown.querySelector('.dropdown__value');
        const listElement = dropdown.querySelector('.dropdown__list');
        const items = dropdown.querySelectorAll('.dropdown__item');

        valueElement.addEventListener('click', (event) => {
            event.stopPropagation(); // Чтобы клик не ушёл на document
            // Переключаем класс активности у списка
            listElement.classList.toggle('dropdown__list_active');
        });

        items.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const link = item.querySelector('.dropdown__link');
                if (link) {
                    // Обновляем отображаемое значение
                    valueElement.textContent = link.textContent.trim();
                }
                listElement.classList.remove('dropdown__list_active');
            });
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown__list').forEach(list => {
                list.classList.remove('dropdown__list_active');
            });
        }
    });
});