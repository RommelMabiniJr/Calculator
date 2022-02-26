let calcuScreen = document.querySelector(".display")
const numBtns = document.querySelectorAll(".digit-con button")
const operators = document.querySelectorAll(".operations-con .arithmetic")
const equalSign = document.querySelector(".equals-sign")


let firstNum, secondNum, operatorUsed;
let operatorExist = false;
let allowOperator = false;
let equalIsUsed = false;
let tempNum = 0;

numBtns.forEach( button => {
    button.addEventListener('click', enterOperand)
})

operators.forEach(button => {
    button.addEventListener('click', enterOperator);
})


equalSign.addEventListener('click', function(e) {
    if (!operatorExist) {
        
        secondNum = tempNum;
        tempNum = "";

        startCalculate();
        operatorUsed = "";
        equalIsUsed = true
        allowOperator = true;
    }
})







function enterOperand(num) {
    
    let number = num.target.textContent

    if (equalIsUsed) {
        tempNum = "";
        calcuScreen.textContent = "";
        equalIsUsed = false;
    }

    calcuScreen.textContent += number;
    tempNum += number;

    //Once we enter number, operand buttons are allowed
    allowOperator = true;
    operatorExist = false;
}

function enterOperator(operator) {

    //this simply limits the operand entered one at a time unless a number is entered.
    if (allowOperator) {

         //automatically calculates unfinished operation if operand is clicked instead of equal sign
         if (operatorUsed) {
            secondNum = tempNum;
            tempNum = "";
            startCalculate();
        }

        firstNum = tempNum;
        tempNum = "";

        operatorUsed = operator.target.textContent;
        calcuScreen.textContent += operatorUsed;

        allowOperator = false;
        operatorExist = true;
        equalIsUsed = false;

    }
}

function startCalculate() {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    calcuScreen.textContent = operate(operatorUsed, firstNum, secondNum);

    operatorUsed = "";
    firstNum = "";
    secondNum = ""

    tempNum = calcuScreen.textContent;
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