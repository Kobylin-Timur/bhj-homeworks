document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'cart-items';
    const cartProducts = document.querySelector('.cart__products');
    const cartTitle = document.querySelector('.cart__title');
    const cartContainer = document.querySelector('.cart');

    function loadCart() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function updateCartVisibility() {
        const cart = loadCart();
        const hasItems = Object.keys(cart).length > 0;

        if (cartTitle) cartTitle.style.display = hasItems ? 'block' : 'none';
        if (cartContainer) cartContainer.style.display = hasItems ? 'block' : 'none';
    }

    function renderCart() {
        const cart = loadCart();
        cartProducts.innerHTML = '';

        Object.entries(cart).forEach(([id, item]) => {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = id;

            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${item.image}" alt="">
                <div class="cart__product-count">${item.quantity}</div>
                <div class="cart__product-remove" title="Удалить">×</div>
            `;

            cartProducts.appendChild(cartProduct);
        });

        updateCartVisibility();
    }

    function addToCart(productId, quantity, imageSrc) {
        const cart = loadCart();

        if (cart[productId]) {

            cart[productId].quantity += quantity;
        } else {
            cart[productId] = {
                quantity: quantity,
                image: imageSrc
            };
        }

        saveCart(cart);
        renderCart();
    }

    function removeFromCart(productId) {
        const cart = loadCart();
        delete cart[productId];
        saveCart(cart);
        renderCart();
    }

    document.querySelectorAll('.product').forEach(product => {
        const quantityValue = product.querySelector('.product__quantity-value');
        const decBtn = product.querySelector('.product__quantity-control_dec');
        const incBtn = product.querySelector('.product__quantity-control_inc');

        decBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            if (value > 1) {
                quantityValue.textContent = value - 1;
            }
        });

        incBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            quantityValue.textContent = value + 1;
        });
    });

    document.querySelectorAll('.product__add').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.dataset.id;
            const image = product.querySelector('.product__image');
            const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);

            addToCart(productId, quantity, image.src);

            animateFlyToCart(image, product.querySelector('.cart__product'));

            product.querySelector('.product__quantity-value').textContent = '1';
        });
    });

    function animateFlyToCart(sourceImg, targetElement) {

        if (!targetElement) return;

        const sourceRect = sourceImg.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const flyImg = sourceImg.cloneNode();
        flyImg.style.cssText = `
            position: fixed;
            left: ${sourceRect.left}px;
            top: ${sourceRect.top}px;
            width: ${sourceRect.width}px;
            height: ${sourceRect.height}px;
            object-fit: contain;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.6s ease-in-out;
            border-radius: 6px;
            opacity: 0.9;
        `;

        document.body.appendChild(flyImg);

        setTimeout(() => {
            flyImg.style.left = `${targetRect.left}px`;
            flyImg.style.top = `${targetRect.top}px`;
            flyImg.style.width = '100px';
            flyImg.style.height = '100px';
            flyImg.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            flyImg.remove();
        }, 610);
    }

    cartProducts.addEventListener('click', (event) => {
        const removeBtn = event.target.closest('.cart__product-remove');
        if (removeBtn) {
            const cartProduct = removeBtn.closest('.cart__product');
            const productId = cartProduct.dataset.id;
            removeFromCart(productId);
        }
    });

    renderCart();
});