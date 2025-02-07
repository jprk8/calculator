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

let showResult = true;

function enterNumber(num) {
    opButton.forEach((button) => {
        button.style.backgroundColor = "rgb(200, 200, 200)";
    });

    //Prevent entering only zeros ('000...')
    if (display.textContent == '0' && num == '0') return;

    //To start typing new number if current display is the result or an initial value of '0'
    if (showResult == true && num != '0') {
        display.textContent = '';
        showResult = false;
    }
    //IF an operator was used, clear display for entering second number
    if (operator && !second) {
        displayNumber.textContent = '';
        display.textContent = '';
        second = 1; //change second to true to continue making new number without erasing
    }

    if (displayNumber.textContent.length < 14) {
        displayNumber.textContent += num;
        display.appendChild(displayNumber);
    }
}

const opButton = document.querySelectorAll(".operator");
opButton.forEach((button) => {
    button.addEventListener("click", () => enterOperator(button))
});

function enterOperator(btn) {
    opButton.forEach((button) => {
        if (button.textContent == btn.textContent) {
            button.style.backgroundColor = "khaki";
        }
        else { 
            button.style.backgroundColor = "rgb(200, 200, 200)";
        }
    });

    operator = btn.textContent;
    //IF the operator was pressed after just one number,
    //  SET "first" to the display text
    //IF there is already a number stored in "first"
    //  CALC first two and display result (this must be the second time an operator was used)
    if (!first) {
        first = display.textContent;
    } else if (first) {
        second = display.textContent;
        let result = operate(operator, +first, +second).toString();
        let roundedResult = roundUp(result);
        display.textContent = roundedResult;
        first = display.textContent;
        second = '';
    }
}

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => calculate());

function calculate() {
    opButton.forEach((button) => button.style.borderColor = "rgb(158, 158, 158)");
    if (first && display.textContent && operator) {
        second = display.textContent;
        let result = operate(operator, +first, +second).toString();

        if (result != "NOT WORTHY") {
            let roundedResult = roundUp(result);
            display.textContent = roundedResult;
        } else display.textContent = result;

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
    showResult = true;
    display.textContent = '0';
    opButton.forEach((button) => button.style.borderColor = "rgb(158, 158, 158)");
}

//This function will round up decimal results up to 14 characters to match screen size
//Takes string for parsing between decimal to determine decimal places
//screen can take up to 14 digits (dot excluded)
function roundUp(result) {
    if (+result != Math.floor(+result) && result.length > 14) {
        let parts = result.split(".");
        decimals = 13 - parts[0].length;
        let number = parseFloat(result);
        return number.toPrecision(decimals);
    } else if (result.length > 14) {
        return parseFloat(result).toExponential(7);
    } else {
        return +result;
    }
}