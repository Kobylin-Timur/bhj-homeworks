document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const STORAGE_KEY = 'text-editor-content';
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText !== null) {
        editor.value = savedText;
    }

    editor.addEventListener('input', () => {
        localStorage.setItem(STORAGE_KEY, editor.value);
    });

    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            editor.value = '';
            localStorage.removeItem(STORAGE_KEY);
            editor.focus(); 
        });
    }
});