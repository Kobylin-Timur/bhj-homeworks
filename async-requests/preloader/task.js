document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    function renderRates(valutes) {
        itemsContainer.innerHTML = '';
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
    
    async function loadRates() {
        loader.classList.add('loader_active');
        const valutes = await fetchRates();
        loader.classList.remove('loader_active');
        if (valutes) {
            renderRates(valutes);
        }
    }

    loadRates();
});