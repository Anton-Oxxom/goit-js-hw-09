function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    const bodyEl = document.querySelector('body');
    const startBtn = document.querySelector('[data-start]');
    const stopBtn = document.querySelector('[data-stop]');

    let timer = null;

startBtn.addEventListener("click", () => {
    stopBtn.disabled = false;
    startBtn.disabled = true;
    timer = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
});


stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    clearInterval(timer);
    stopBtn.disabled = true;
    
});