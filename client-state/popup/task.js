document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = modal.querySelector('.modal__close');
    const COOKIE_NAME = 'subscribe-modal-closed';

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    if(!getCookie(COOKIE_NAME)) {
        modal.classList.add('modal_active');
    }
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        setCookie(COOKIE_NAME, 'true', 365);
    });
});