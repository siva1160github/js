class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.toString().includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand.toString();
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev  + current;
                break;
            case '-':
                computation = prev  - current;
                break; 
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
            return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandText.innerText = getDisplayNumber(this.currentOperand);
        if (this.operation != null)
            this.previousOperandText.innerText = `${getDisplayNumber(this.previousOperand)} ${this.operation}`;
        else
            this.previousOperandText.innerText = getDisplayNumber(this.previousOperand);
    }
}

const getDisplayNumber = function(number) {
    const numString = number.toString();
    const wholeNum = parseFloat(numString.split('.')[0]);
    const decimalNum = numString.split('.')[1];
    let integerDisplay;
    if(isNaN(wholeNum)) 
        return '';
    else
        integerDisplay = wholeNum.toLocaleString('en', { maximumFractionDigits: 0 });
    if (decimalNum != null)
        integerDisplay = `${integerDisplay}.${decimalNum}`

    return integerDisplay;
}

const operationButton = document.querySelectorAll('[data-operation]');
const numberButton = document.querySelectorAll('[data-number]');
const equalButton = document.querySelector('[data-equal]');
const allClearButton = document.querySelector('[data-allclear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previousoperand]');
const currentOperandText = document.querySelector('[data-currentoperand]');

const calc = new Calculator(previousOperandText, currentOperandText);

numberButton.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        calc.appendNumber(btn.innerText)
        calc.updateDisplay()
    })
})

operationButton.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        calc.chooseOperation(btn.innerText)
        calc.updateDisplay()
    })
})

equalButton.addEventListener('click', ()=>{
    calc.compute();
    calc.updateDisplay();
})

allClearButton.addEventListener('click', ()=>{
     calc.clear();
     calc.updateDisplay();
})

deleteButton.addEventListener('click', ()=>{
    calc.delete();
    calc.updateDisplay();
})