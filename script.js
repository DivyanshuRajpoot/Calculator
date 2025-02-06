const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let awaitingSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function inputNumber(number) {
    if (awaitingSecondOperand) {
        currentInput = number;
        awaitingSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (operator && awaitingSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        const result = calculate(firstOperand, operator, parseFloat(currentInput));
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    awaitingSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate(first, operator, second) {
    switch (operator) {
        case 'add':
            return first + second;
        case 'subtract':
            return first - second;
        case 'multiply':
            return first * second;
        case 'divide':
            return first / second;
        default:
            return second;
    }
}

function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { action, number } = event.target.dataset;

        if (number) {
            inputNumber(number);
        } else if (action) {
            switch (action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(action);
                    break;
                case 'decimal':
                    inputDecimal();
                    break;
                case 'clear':
                    clearCalculator();
                    break;
                case 'backspace':
                    backspace();
                    break;
                case 'equals':
                    handleOperator(null);
                    break;
            }
        }
    });
});

updateDisplay();
