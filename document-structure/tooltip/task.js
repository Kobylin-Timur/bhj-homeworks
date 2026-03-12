document.addEventListener('DOMContentLoaded', () => {

    const tooltipElements = document.querySelectorAll('.has-tooltip');

    tooltipElements.forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Запрещаем переход по ссылке

            document.querySelectorAll('.tooltip_active').forEach(tooltip => {
                tooltip.classList.remove('tooltip_active');

            });

            const tooltipText = element.getAttribute('title');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip tooltip_active';
            tooltip.textContent = tooltipText;

            const position = element.dataset.position || 'bottom';
            const rect = element.getBoundingClientRect();

            switch (position) {
                case 'top':
                    tooltip.style.top = `${rect.top - 10}px`;
                    tooltip.style.left = `${rect.left + rect.width / 2}px`;
                    tooltip.style.transform = 'translate(-50%, -100%)';
                    break;
                case 'left':
                    tooltip.style.top = `${rect.top + rect.height / 2}px`;
                    tooltip.style.left = `${rect.left - 10}px`;
                    tooltip.style.transform = 'translate(-100%, -50%)';
                    break;
                case 'right':
                    tooltip.style.top = `${rect.top + rect.height / 2}px`;
                    tooltip.style.left = `${rect.right + 10}px`;
                    tooltip.style.transform = 'translateY(-50%)';
                    break;
                case 'bottom':
                default:
                    tooltip.style.top = `${rect.bottom + 10}px`;
                    tooltip.style.left = `${rect.left + rect.width / 2}px`;
                    tooltip.style.transform = 'translateX(-50%)';
                    break;
            }

            document.body.appendChild(tooltip);

            const closeTooltip = (e) => {
                if (!element.contains(e.target) && !tooltip.contains(e.target)) {
                    tooltip.classList.remove('tooltip_active');
                    document.removeEventListener('click', closeTooltip);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeTooltip);
            }, 0);
        });
    });
});