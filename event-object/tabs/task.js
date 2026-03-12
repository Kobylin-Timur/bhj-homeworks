document.addEventListener('DOMContentLoaded', () => {

    const tabGroups = document.querySelectorAll('.tabs');

    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const contents = group.querySelectorAll('.tab__content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (event) => {
                event.preventDefault(); // На всякий случай, если вкладка внутри ссылки

                tabs.forEach(t => t.classList.remove('tab_active'));
                tab.classList.add('tab_active');

                contents.forEach(c => c.classList.remove('tab__content_active'));
                contents[index].classList.add('tab__content_active');
            });
        });
    });
});