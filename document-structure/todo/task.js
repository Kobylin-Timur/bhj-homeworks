document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tasks__form');
    const input = document.getElementById('task__input');
    const list = document.getElementById('tasks__list');

    function createTask(text) {
        const task = document.createElement('div');
        task.className = 'task';

        const title = document.createElement('div');
        title.className = 'task__title';
        title.textContent = text;

        const removeBtn = document.createElement('a');
        removeBtn.href = '#';
        removeBtn.className = 'task__remove';
        removeBtn.textContent = '×';

        removeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            task.remove();
        });

        task.appendChild(title);
        task.appendChild(removeBtn);

        return task;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = input.value.trim();

        if (text) {
            const task = createTask(text);
            list.appendChild(task);
            input.value = '';
            input.focus();
        }
    });
});