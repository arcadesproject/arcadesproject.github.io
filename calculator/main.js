// Get the overall calculator and then display specifically to update it
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.display')
/* Initial values needed. Display number separate from actual display.
   First value to store and then operate on.
   Second value to track when an operator has been used.
   Operator to know which operate function to use. */
let displayNumber = '0'
let firstValue = null
let secondValue = false
let operator = null
// Keyboard support. Take key in and then act as if clicked button.
window.addEventListener('keydown', e => {
    const { key } = e

    if (/[0-9]/.test(key)) {
        return document.getElementById(key).click()
    } 

    if (/[-*+.=/]/.test(key)) {
        return document.querySelector(`[data-value="${key}"]`).click()
    }

    switch(key) {
        case 'Enter':
            return document.querySelector('[data-value="="]').click()
        case 'Backspace':
        case 'Delete':
            return document.querySelector('[data-value="backspace"]').click()
        case 'Escape':
            return document.querySelector('[data-value="clear"]').click()
    }
})
// Storing values to then operatoe on from user clicks.
calculator.addEventListener('click', e => {
    const { target } = e
    const { textContent } = target
    const { value } = target.dataset
// To ignore anything where user clicks outside of calculator.
    if (target.matches('button')) {
// Divide by zero ignore.       
        if ( (operator === '/' && textContent === '0' && secondValue === true) ) {
                return alert('Don\'t divide by zero!')
        }
// Html buttons do not have data values so know they are selected.        
        if (!value) {
            if (displayNumber === '0' || secondValue === true) { 
                displayNumber = textContent 
                secondValue = false
            } else { 
                displayNumber += textContent
            } 
        }
// For everything that isn't a number.
        switch(value) {
            case '+': 
            case '-':
            case '*':
            case '/':
                if (firstValue) {
                    displayNumber = operate(operator, firstValue, displayNumber)
                    firstValue = displayNumber
                } else {
                    firstValue = displayNumber
                }
                operator = value
                secondValue = true
                break;
            
            case '=':
                if (firstValue && secondValue === false) {
                    displayNumber = operate(operator, firstValue, displayNumber)
                    firstValue = null
                    secondValue = true
                } 
                break;
                
            case '.':
                if (secondValue === true) {
                    displayNumber = '0.'
                    secondValue = false
                } else if (!displayNumber.includes('.')) {
                    displayNumber = `${displayNumber}.`
                }
                break;
                
            case 'clear':
                displayNumber = '0'
                firstValue = null
                secondValue = false
                operator = null
                break;  

            case 'backspace':
                displayArray = displayNumber.split('')
                displayArray.pop()
                displayNumber = displayArray.join('')
                break;
        }
    
    }
    updateDisplay();   
})

let operate = (operator, x, y) => {
    let a = parseFloat(x)
    let b = parseFloat(y)
    switch(operator) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
    }
}

let updateDisplay = () => {
    if (displayNumber == []) {
        displayNumber = '0'
        return display.value = displayNumber
    }
    let a = parseFloat(displayNumber)
    let b = parseFloat(a.toFixed(9))
    return display.value = b
}