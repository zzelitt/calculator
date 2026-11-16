
//////////////////////////////////////////////////////
/////////////////// VARIABLE DEC
/////////////////////////////////////////////////////

const key_zero = document.getElementById("zero").addEventListener("click", () => handleClick("0"));
const key_one = document.getElementById("one").addEventListener("click", () => handleClick("1"));
const key_two = document.getElementById("two").addEventListener("click", () => handleClick("2"));
const key_three = document.getElementById("three").addEventListener("click", () => handleClick("3"));
const key_four = document.getElementById("four").addEventListener("click", () => handleClick("4"));
const key_five = document.getElementById("five").addEventListener("click", () => handleClick("5"));
const key_six = document.getElementById("six").addEventListener("click", () => handleClick("6"));
const key_seven = document.getElementById("seven").addEventListener("click", () => handleClick("7"));
const key_eight = document.getElementById("eight").addEventListener("click", () => handleClick("8"));
const key_nine = document.getElementById("nine").addEventListener("click", () => handleClick("9"));

const key_plus = document.getElementById("plus").addEventListener("click", () => handleClick("+"));
const key_minus = document.getElementById("minus").addEventListener("click", () => handleClick("-"));
const key_multiply = document.getElementById("multiply").addEventListener("click", () => handleClick("×"));
const key_divide = document.getElementById("divide").addEventListener("click", () => handleClick("÷"));
const key_eval = document.getElementById("eval").addEventListener("click", () => handleClick("="));
const key_decimal = document.getElementById("decimal").addEventListener("click", () => handleClick("."));

const key_del = document.getElementById("delete").addEventListener("click", () => handleClick("del"));
const key_clear = document.getElementById("clear").addEventListener("click", () => handleClick("clr"));

const display_hi = document.querySelector(".display_high")
const display = document.querySelector(".display_low")

document.addEventListener("keydown", (event) => keyDetect(event));

let num1 = 0;
let num2 = 0;
let operator = "";
let isDec = false;
let lastEval = false;

/////////////////////////////////////////////////////
///////////////// FUNCTIONS
////////////////////////////////////////////////////

// vv I call this the Heart of my Calculator, this is the commander of every other function

function handleClick(numop){
    const numbers = "0123456789"
    const operators = "+-×÷"
    var result = 0

    const parts = display.textContent.split(/[+\-*/]/);
    const currentNumber = parts[parts.length - 1];

    if(numop === "." && currentNumber.includes(".")) return 

    if(!(display.textContent === "" && !numbers.includes(numop))){
        if(display.textContent.includes("ERROR") || display.textContent.includes("That's impossible bro 🥀") || display.textContent.includes("Do normal calcs bru 🥀") || display.textContent.includes("NaN")){
            display.textContent = ""
        }

        if(numbers.includes(numop) || numop === "."){
            if(lastEval){
                display.textContent = numop;
                display_hi.textContent = ""
                lastEval = false;
            }
            else if(numop != "."){
                result = parseInt(numop);
                display.textContent += result
            }
            else{
                display.textContent += numop
            }
        }
        else if(numop != "=" && numop != "del" && numop != "clr"){
            if(display.textContent.at(-2) != "+" && display.textContent.at(-2) != "-" &&
               display.textContent.at(-2) != "×" && display.textContent.at(-2) != "÷"){
                display.textContent += " " + numop + " "
                operator = numop;
                lastEval = false;
            }
        }

        if(numop === "clr"){
            display_hi.textContent = ""
            display.textContent = ""
            lastEval = false;
        }
        else if(numop === "del"){
            display.textContent = display.textContent.slice(0, -1);
            lastEval = false;
        }

        if(display.textContent.includes(".")){
            isDec = true;
        }
        else{
            isDec = false;
        }

        const expressionArr = display.textContent.split(" ");

        if(expressionArr.length >= 4 && isDec === false){
            display_hi.textContent = display.textContent.slice(0, -2) + " = ";
            display.textContent = operate(expressionArr[1], expressionArr[0], expressionArr[2]) + " " + numop + " ";
            lastEval = false;
        }
        else if(expressionArr.length >= 4 && isDec === true){
            display_hi.textContent = display.textContent.slice(0, -2) + " = ";
            display.textContent = operate(expressionArr[1], expressionArr[0], expressionArr[2]) + " " + numop + " ";
            lastEval = false;
        }
        else if(numop === "=" && expressionArr.length >= 3 && (expressionArr[2] != "")){
            display_hi.textContent = display.textContent + " = "
            display.textContent = operate(expressionArr[1], expressionArr[0], expressionArr[2]);
            lastEval = true;
        }
    }
    if(display.textContent === "NaN"){
        display.textContent = "ERROR"
    }
}

// vv Function to determine what calculation has to be performed

function operate(operator, a, b){
    let result;
    let aNum = parseFloat(a);
    let bNum = parseFloat(b);

    if(aNum === bNum && aNum === 0 && (operator === "×" || operator === "÷")){
        return "That's impossible bro 🥀";
    }
    else if(bNum === 0 && (operator === "×" || operator === "÷")) return "Do normal calcs bru 🥀";

    switch(operator){
        case '+': result = add(aNum, bNum); 
                  break;
        case '-': result = sub(aNum, bNum); 
                  break;
        case '×': result = multiply(aNum, bNum); 
                  break;
        case '÷': result = divide(aNum, bNum); 
                  break;
        default: return "ERROR"
    }

    if(Number.isInteger(result)) return result;
    else if(typeof(result === 'number') && !Number.isInteger(result)){
        if(hasFivePlusDigits(result) === true){ 
            return Math.round(result * 10000) / 10000
        }
        else{
            return result;
        }
    }
}

/* vv Function to determine whether the given float has more than 5 digits
      after the decimal */

function hasFivePlusDigits(num){
    const str = num.toString();
    const parts = str.split('.');

    if(parts.length < 2) return false;

    if(parts[1].length > 5){
        return true;
    };
}

// vv Calculation functions

function add(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

// ^^


// vv This function will detect keyboard events

function keyDetect(event){
    const key = event.key;
    switch(key){
        case "0": handleClick("0"); break;
        case "1": handleClick("1"); break;
        case "2": handleClick("2"); break;
        case "3": handleClick("3"); break;
        case "4": handleClick("4"); break;
        case "5": handleClick("5"); break;
        case "6": handleClick("6"); break;
        case "7": handleClick("7"); break;
        case "8": handleClick("8"); break;
        case "9": handleClick("9"); break;
        case "+": handleClick("+"); break;
        case "-": handleClick("-"); break;
        case "*": handleClick("×"); break;
        case "/": handleClick("÷"); break;
        case ".": handleClick("."); break;
        case "Enter": handleClick("="); break;
        case "Backspace": handleClick("del"); break;
        case "Delete": handleClick("clr"); break;
    }
}