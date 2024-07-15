document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const operationHistory = document.getElementById('operation-history');
    const buttons = document.querySelectorAll('.btn');
  
    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let shouldClearDisplay = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const value = this.innerText;
  
        if (value === 'C') {
          clearAll();
        } else if (value === '=') {
          if (currentInput !== '' && previousInput !== '' && operator !== null) {
            calculate();
            shouldClearDisplay = true;
          }
        } else if (isOperator(value)) {
          setOperator(value);
        } else if (value === '.') {
          appendDecimal();
        } else {
          if (shouldClearDisplay) {
            clearDisplay();
            shouldClearDisplay = false;
          }
          appendNumber(value);
          updateDisplay();
        }
      });
    });
  
    function clearAll() {
      clearDisplay();
      operationHistory.innerText = '';
      previousInput = '';
      operator = null;
    }
  
    function clearDisplay() {
      display.value = '';
      currentInput = '';
    }
  
    function calculate() {
      let result = 0;
      const num1 = parseFloat(previousInput);
      const num2 = parseFloat(currentInput);
  
      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
        default:
          return;
      }
  
      display.value = result;
      operationHistory.innerText = `${previousInput} ${operator} ${currentInput} = ${result}`;
      previousInput = result.toString();
      currentInput = '';
    }
  
    function isOperator(value) {
      return ['+', '-', '*', '/'].includes(value);
    }
  
    function setOperator(value) {
      if (currentInput !== '' && previousInput !== '' && operator !== null) {
        calculate();
      }
      operator = value;
      if (currentInput !== '') {
        previousInput = currentInput;
      }
      operationHistory.innerText = `${previousInput} ${operator}`;
      currentInput = '';
    }
  
    function appendNumber(value) {
      currentInput += value;
    }
  
    function appendDecimal() {
      if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
      }
    }
  
    function updateDisplay() {
      display.value = `${previousInput} ${operator ? operator : ''} ${currentInput}`;
    }
  });
  