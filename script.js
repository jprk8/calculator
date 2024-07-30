function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let first = '';
let operator = '';
let second = '';

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}
const display = document.querySelector("#display");
const numButton = document.querySelectorAll(".numeric");
let displayNumber = document.createElement("span");

numButton.forEach((button) => {
    button.addEventListener("click", () => enterNumber(button.textContent))
});

function enterNumber(num) {
    displayNumber.textContent += num;
    display.appendChild(displayNumber);
}

