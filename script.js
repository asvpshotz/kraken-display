// Kraken Z63 LCD demo script
// Values can later be connected to live hardware data

let temp = 44;
let load = 6;

function updateDisplay() {
    const tempElement = document.querySelector(".temperature");
    const loadElement = document.querySelector(".stats");
    const barElement = document.querySelector(".fill");

    tempElement.textContent = temp + "°";
    loadElement.innerHTML = "LOAD&nbsp;&nbsp;" + String(load).padStart(2, "0") + "%";
    barElement.style.width = load + "%";
}

// Small demo animation
setInterval(() => {

    temp += Math.random() > 0.5 ? 1 : -1;

    if (temp < 35) temp = 35;
    if (temp > 75) temp = 75;

    load = Math.floor(Math.random() * 40) + 5;

    updateDisplay();

}, 3000);

updateDisplay();