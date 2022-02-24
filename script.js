let displayCon = document.querySelector(".display")
const numBtns = document.querySelectorAll(".digit-con button")

numBtns.forEach( button => {
    button.addEventListener('click', function(e) {
        displayCon.textContent += e.target.textContent;
    })
})

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