//BIG TASK: Restructure the entire code to avoid bugs


const numBtns = document.querySelectorAll(".digit-con button")
const operators = document.querySelectorAll(".operations-con .arithmetic")

const clearScr = document.querySelector(".clear")
let calcuScreen = document.querySelector(".display")
const equalSign = document.querySelector(".equals-sign")
const percent = document.querySelector(".percent")
const del = document.querySelector(".delete")
const decimal = document.querySelector(".decimal")
const negPos = document.querySelector(".neg")


let firstNum, secondNum, operatorUsed;
let leftIsOperator = false;
let allowOperator = false;
let equalIsUsed = false;
let negIsUsed = false;
let tempNum = "";


negPos.addEventListener('click', enterNeg)


document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    if (name === 'Shift') {
      // Do nothing.
        return;
    }
    if (event.shiftKey) {
        //alert(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);

        if (regexpTest(name)) {
            enterOperatorKeyboard(name);
        } else if (name == '%') {
            enterPercent();
        }
    } else {
        //alert(`Key pressed ${name} \n Key code Value: ${code}`)
        if (/[0-9]/.test(name)) {
            //console.log(event);
        
            inputNumber(name);
        } else if (name == 'Backspace') {
            enterDelete();
        } else if (name == '-' || name == '/') {
            enterOperatorKeyboard(name);
        } else if(name == '.') {
            enterDecimal();
        } else if (name == '=' || name == 'Enter') {
            enterEqualSign();
        } else if(name === 'c') {
            resetEverything();
        }
    }
}, false);

function enterOperatorKeyboard(operator) {
    
    //this simply limits the operand entered one at a time unless a number is entered.
    if (allowOperator) {

        //automatically calculates unfinished operation if operand is clicked instead of equal sign
        if (operatorUsed) {
           tempNum = "";
           startCalculate();
       }

       firstNum = tempNum;
       tempNum = "";

       operatorUsed = operator;
       calcuScreen.textContent += operatorUsed;

       allowOperator = false;
       leftIsOperator = true;
       equalIsUsed = false;
       dcmlExist = false;

   }
}



numBtns.forEach( button => {
    button.addEventListener('click', enterOperand)
})

operators.forEach(button => {
    button.addEventListener('click', enterOperator);
})


equalSign.addEventListener('click', enterEqualSign)

function enterEqualSign(e) {
    if (!leftIsOperator) {
        
        secondNum = tempNum;
        tempNum = "";
        equalIsUsed = true
        startCalculate();
        operatorUsed = "";
        allowOperator = true;
    }
}


clearScr.addEventListener('click', resetEverything)

percent.addEventListener('click', enterPercent)

function enterPercent(e) {
    if (tempNum !== '') {
        if (Number(calcuScreen.textContent)) {
            calcuScreen.textContent = Number(calcuScreen.textContent)/100;
            tempNum = calcuScreen.textContent;
            
        } else {
            tempNum = Number(tempNum)/100;
            breakDownOperation();
            calcuScreen.textContent = firstNum + operatorUsed + tempNum;
        }
    }
}

del.addEventListener('click', enterDelete)

function enterDelete(e) {

    if ((list && isDigit(calcuScreen.textContent)) || (list && isStillANum(calcuScreen.textContent))) {
        calcuScreen.textContent = list.head.data;

        if (list.head.next) {
            list = new LinkedList(list.head.next);
        } else {
            list = ""
            delCommence();
        }
        
        leftIsOperator = false;
        allowOperator = true;
    } else if (isDigit(calcuScreen.textContent)) {
        resetEverything();

    } else {
        delCommence();
    }

    console.log(list);
    console.log()
}

let dcmlExist;
decimal.addEventListener('click', enterDecimal)

function enterDecimal(params) {

    let txt = calcuScreen.textContent
    let txtArr = txt.split("");
    let opIndex = txtArr.findIndex(regexpTest)
    operatorUsed = txtArr[opIndex]

    firstNum = txt.slice(0, opIndex);
    secondNum = txt.slice(opIndex + 1);

    //TO BE FIXED!!
    
    //If screen has a dot without an operator
    if (txt.includes('.')) {
        if (operatorUsed && secondNum.includes('.')) {
            dcmlExist = true;

        } else if(operatorUsed){
            dcmlExist = false;
        } else {
            dcmlExist = true;
        }
        
    } else {
        dcmlExist = false;
    }

    if (!dcmlExist) {
        calcuScreen.textContent += "."
        dcmlExist = true;
    }
}

//Separated into function for reusability
function delCommence() {
    let txt = calcuScreen.textContent;
    let notOperator;


    if (txt.length == 1) {
        calcuScreen.textContent = "";
    } else {
        notOperator = Number(txt.slice(txt.length))
        txt = txt.slice(0, txt.length - 1);
        calcuScreen.textContent = txt;
    }

    console.log(txt)

    //or in simple terms if an operator
    if (!notOperator) {
        operatorUsed = ""
    }
}

//function to check if value is a single digit number
function isDigit(val) {
    return String(+val).charAt(0) == val;
}

function isStillANum(val) {
    return Number(val) == val;
}



function resetEverything() {

    //reset every variable state from the start
    calcuScreen.textContent = "";
    firstNum = "";
    secondNum = "";
    operatorUsed = "";

    leftIsOperator = false;
    allowOperator = false;
    equalIsUsed = false;
    tempNum = "";
    list = ""
    dcmlExist = false;
}

function enterOperand(num) {
    
    let number = num.target.textContent

    inputNumber(number);
}

function inputNumber(number) {
    if (equalIsUsed) {
        tempNum = "";
        calcuScreen.textContent = "";
        equalIsUsed = false;
    }

    calcuScreen.textContent += number;
    tempNum += number;

    //Once we enter number, operand buttons are allowed
    allowOperator = true;
    leftIsOperator = false;
}

function enterOperator(operator) {

    //this simply limits the operand entered one at a time until a number is entered.
    if (allowOperator) {

         //automatically calculates unfinished operation if operand is clicked instead of equal sign
         if (operatorUsed) {
            tempNum = "";
            startCalculate();
        }

        firstNum = tempNum;
        tempNum = "";

        operatorUsed = operator.target.textContent;
        calcuScreen.textContent += operatorUsed;

        allowOperator = false;
        leftIsOperator = true;
        equalIsUsed = false;
        dcmlExist = false;

    }
}

//the ++ is for the keyboard support
const ops = ['+', '-', '*', '/', '++'];

function regexpTest(element) {

    for (let i = 0; i < ops.length; i++) {
        
        if (ops[i] == element) {
            return true
        }
        
    }

    return false;
}
let isNotNegative;

function enterNeg() {

    if (negIsUsed) {
        delCommence()
        negIsUsed = false
    } else {
        calcuScreen.textContent += "-";
        negIsUsed = true;
    }
    
}

function breakDownOperation() {
    let currentOp = calcuScreen.textContent.split("");
    isNotNegative = Number(currentOp[0]);

    let opIndex;
    let negSym;
    if (!isNotNegative) {
        negSym = currentOp.shift();
        opIndex = currentOp.findIndex(regexpTest);
        operatorUsed = currentOp[opIndex];
        currentOp = currentOp.join("");

        firstNum = Number(negSym + currentOp.slice(0, opIndex));
        secondNum = Number(currentOp.slice(opIndex + 1));
    } else {
        opIndex = currentOp.findIndex(regexpTest);
        operatorUsed = currentOp[opIndex];
        currentOp = currentOp.join("");

        firstNum = Number(currentOp.slice(0, opIndex));
        secondNum = Number(currentOp.slice(opIndex + 1));
    }

}

function startCalculate() {
    breakDownOperation();

    if (operatorUsed == '/' && secondNum == 0) {
        alert("Error: Cannot be divided by 0")
    } else {
        operationList(calcuScreen.textContent);

        calcuScreen.textContent = operate(operatorUsed, firstNum, secondNum);

        operatorUsed = "";
        firstNum = "";
        secondNum = "";

        tempNum = calcuScreen.textContent;
    }

    
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





//These portion is used for for the advanced/smart functionality of delete button to retain past calculations 

let numNodes = 0;
let prevNode;
let node;
let list;


class ListNode {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
    }
}

function operationList(value) {
    node = new ListNode(value);

    if (!list) {
        list = new LinkedList(node);
    } else {
        node.next = prevNode;
        list = new LinkedList(node);
    }

    prevNode = node;
}