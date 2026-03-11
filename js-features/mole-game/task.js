document.addEventListener("DOMContentLoaded", () => {
    const deadElement = document.getElementById("dead");
    const lostElement = document.getElementById("lost");

    if (!deadElement || !lostElement) {
        console.error("Не найдены элементы #dead или #lost");
        return;
    }

    let deadCount = 0; // Убито кротов
    let lostCount = 0; // Промахи

    function getHole(index) {
        return document.getElementById(`hole${index}`);
    }

    function resetGame() {
        deadCount = 0;
        lostCount = 0;
        deadElement.textContent = deadCount;
        lostElement.textContent = lostCount;
    }

    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);

        if (!hole) continue;
        hole.addEventListener("click", () => {
            if (hole.classList.contains("hole_has-mole")) {
                deadCount++;
                deadElement.textContent = deadCount;

                if (deadCount >= 10) {
                    setTimeout(() => {
                        alert("Вы победили!");
                        resetGame();
                    }, 100);
                }
            } else {
                lostCount++;
                lostElement.textContent = lostCount;
                if (lostCount >= 5) {
                    setTimeout(() => {
                        alert("Вы проиграли!");
                        resetGame();
                    }, 100);
                }
            }
        });
    }
});
