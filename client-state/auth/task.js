document.addEventListener('DOMContentLoaded', () => {
    const signin = document.getElementById('signin');
    const welcome = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const form = document.getElementById('signin__form');
    const submitBtn = document.getElementById('signin__btn');
    const STORAGE_KEY = 'auth-user-id';
    const API_URL = 'https://students.netoservices.ru/nestjs-backend/auth';
    const savedUserId = localStorage.getItem(STORAGE_KEY);
    if(savedUserId) {
        userIdSpan.textContent = savedUserId;
        signin.classList.remove('signin_active');
        welcome.classList.add('welcome_active');
    }
    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Вход...';
        try {
            const formData = new FormData(form);
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if(result.success) {
                localStorage.setItem(STORAGE_KEY, result.user_id);
                userIdSpan.textContent = result.user_id;
                signin.classList.remove('signin_active');
                welcome.classList.add('welcome_active');
            } else {
                alert('Неверный логин/пароль');
            }
        } catch(error) {
            console.error('Ошибка авторизации:', error);
            alert('Ошибка сети. Попробуйте позже.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
            form.reset();
        }
    });
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn_danger';
    logoutBtn.textContent = 'Выйти';
    logoutBtn.style.marginTop = '20px';
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        welcome.classList.remove('welcome_active');
        signin.classList.add('signin_active');
    });
    welcome.appendChild(logoutBtn);
});