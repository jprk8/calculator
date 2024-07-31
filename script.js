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

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        if (b == 0) {
            return "NOT WORTHY";
        } else {
            return divide(a, b);
        }
    }
}

let first = '';
let operator = '';
let second = '';
let result = '';

const display = document.querySelector("#display");
let displayNumber = document.createElement("span");

const numButton = document.querySelectorAll(".numeric");
numButton.forEach((button) => {
    button.addEventListener("click", () => enterNumber(button.textContent))
});

function enterNumber(num) {
    opButton.forEach((button) => button.style.borderColor = "rgb(158, 158, 158)");

    if (display.textContent == '0' || showResult === true) display.textContent = '';

    if (operator && !second) {
        displayNumber.textContent = '';
        display.textContent = '';
        second = 1; //change second to true to continue making new number without erasing
    }
    //trying to prevent typing '000'
    displayNumber.textContent += num;
    display.appendChild(displayNumber);

}

const opButton = document.querySelectorAll(".operator");
opButton.forEach((button) => {
    button.addEventListener("click", () => enterOperator(button))
});

function enterOperator(btn) {
    opButton.forEach((button) => {
        if (button.textContent == btn.textContent) button.style.borderColor = "red";
        else button.style.borderColor = "rgb(158, 158, 158)";
    });

    operator = btn.textContent;
    //check if there was a first, second, and operator--ready to calculate (check if this is the third parameter in the equation)
    if (!first) {
        first = display.textContent;
    } else if (first) {
        second = display.textContent;
        let result = operate(operator, +first, +second);
        display.textContent = result;
        first = display.textContent;
        second = '';
    //can this be deleted?
    } else if (operator && !showResult) {
        let result = operate(operator, +first, +display.textContent);
        display.textContent = result;
        displayNumber.textContent = '';
        first = result;
        second = '';
    }
}

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => calculate());
let showResult = false;

function calculate() {
    opButton.forEach((button) => button.style.borderColor = "rgb(158, 158, 158)");
    if (first && display.textContent && operator) {
        second = display.textContent;
        let result = operate(operator, +first, +second);
        display.textContent = result;
        first = '';
        second = '';
        operator = '';
        displayNumber.textContent = ''; //this is for creating new number to show in display
        showResult = true;
    }
}

const acButton = document.querySelector("#reset");
acButton.addEventListener("click", () => reset());

function reset() {
    first = '';
    second = '';
    operator = '';
    displayNumber.textContent = '';
    display.textContent = '0';
    opButton.forEach((button) => button.style.borderColor = "rgb(158, 158, 158)");
}