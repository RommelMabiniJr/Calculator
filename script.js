let displayCon = document.querySelector(".display")
const numBtns = document.querySelectorAll(".digit-con button")
const operators = document.querySelectorAll(".operations-con button")
let firstNum, secondNum, operatorUsed;
let allowOperate = false;
let tempNum = 0;

numBtns.forEach( button => {
    button.addEventListener('click', enterOperand)
})

operators.forEach(button => {
    button.addEventListener('click', enterOperator);
})








function enterOperand(num) {
    let number = num.target.textContent
    displayCon.textContent += number;
    tempNum += number;

    //Once we enter number, operand buttons are allowed
    allowOperate = true
}

function enterOperator(operator) {

    //this simply limits the operand entered one at a time unless a number is entered.
    if (allowOperate) {

        if (operator.target.textContent == '=') {

            //assuming that firsNum is already set, change num values to integers
            secondNum = tempNum;
            
            startCalculate();
            allowOperate = false




        } else {

            //automatically calculates unfinished operation if operand is clicked instead of equal sign
            if (operatorUsed) {
                secondNum = tempNum;
                startCalculate();
            }

            firstNum = tempNum;
            tempNum = "";
            operatorUsed = operator.target.textContent;
            displayCon.textContent += operator.target.textContent;
            allowOperate = false;
        }
    }
}

function startCalculate() {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    displayCon.textContent = operate(operatorUsed, firstNum, secondNum);

    //assign the result in the temp var to be automatically assigned as firstNum later on
    tempNum = displayCon.textContent;
}

function operate(operator, a, b) {

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "Not a valid operation!";
      }
}



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