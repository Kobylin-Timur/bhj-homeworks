document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const STORAGE_KEY = 'text-editor-content';

    // === Восстановление текста при загрузке страницы ===
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText !== null) {
        editor.value = savedText;
    }

    // === Сохранение текста при каждом изменении ===
    editor.addEventListener('input', () => {
        localStorage.setItem(STORAGE_KEY, editor.value);
    });

    // === Повышенный уровень: Кнопка «Очистить» ===
    // Проверяем, есть ли кнопка в HTML (если добавили)
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            editor.value = '';
            localStorage.removeItem(STORAGE_KEY);
            editor.focus(); // Возвращаем фокус в поле для удобства
        });
    }
});