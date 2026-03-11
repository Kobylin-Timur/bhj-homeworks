document.addEventListener("DOMContentLoaded", () => {
    const cookie = document.getElementById("cookie");

    const counterElement = document.getElementById("clicker__counter");

    if (!cookie || !counterElement) {
        console.error("Не найдены элементы #cookie или #clicker__counter");
        return;
    }

    let clickCount = 0;
    let isShrunk = false;
    let lastClickTime = 0;

    cookie.addEventListener("click", () => {
        clickCount++;
        counterElement.textContent = clickCount;

        if (isShrunk) {
            cookie.width = 200;
            cookie.height = 200;
            isShrunk = false;
        } else {
            cookie.width = 150;
            cookie.height = 150;
            isShrunk = true;
        }

        const currentTime = Date.now();

        if (lastClickTime !== 0) {
            const timeDiffMs = currentTime - lastClickTime;
            const timeDiffSec = timeDiffMs / 1000;

            if (timeDiffSec > 0) {
                const clickSpeed = 1 / timeDiffSec;

                let speedElement = document.getElementById("clicker__speed");
                if (!speedElement) {
                    // Если элемента нет — создаём его динамически
                    speedElement = document.createElement("span");
                    speedElement.id = "clicker__speed";
                    speedElement.style.marginLeft = "10px";
                    speedElement.style.color = "#666";
                    counterElement.parentNode.appendChild(speedElement);
                }

                speedElement.textContent = `| Скорость: ${clickSpeed.toFixed(2)}/сек`;
            }
        }

        lastClickTime = currentTime;
    });
});
