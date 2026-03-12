document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const progress = document.getElementById('progress');
    const sendButton = document.getElementById('send');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if(!fileInput.files.length) {
            alert('Пожалуйста, выберите файл для загрузки');
            return;
        }
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
        xhr.upload.addEventListener('progress', (event) => {
            if(event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });
        xhr.onload = () => {
            if(xhr.status === 200 || xhr.status === 201) {
                progress.value = 1;
                alert('Файл успешно загружен!');
                form.reset();
                document.querySelector('.input__wrapper-desc').textContent = 'Имя файла...';
            } else {
                alert('Ошибка при загрузке файла: ' + xhr.status);
            }
            setTimeout(() => {
                progress.value = 0;
            }, 2000);
        };
        xhr.onerror = () => {
            alert('Ошибка сети при загрузке файла');
            progress.value = 0;
        };
        xhr.send(formData);
    });
});