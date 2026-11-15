
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
//const key_decimal = document.getElementById("decimal").addEventListener("click", () => handleClick("."));

const key_del = document.getElementById("delete").addEventListener("click", () => handleClick("del"));
const key_clear = document.getElementById("clear").addEventListener("click", () => handleClick("clr"));

const display = document.querySelector(".display_para")

let num1 = 0;
let num2 = 0;
let operator = "";
let lastEval = false;

/////////////////////////////////////////////////////
///////////////// FUNCTIONS
////////////////////////////////////////////////////

function operate(operator, a, b){
    let result;
    let aNum = parseInt(a);
    let bNum = parseInt(b);

    if(aNum === bNum && aNum === 0){
        return "That's impossible bro 🥀";
    }
    else if(bNum === 0) return "Do normal calcs bru 🥀";

    switch(operator){
        case '+': result = add(aNum, bNum); 
                  break;
        case '-': result = sub(aNum, bNum); 
                  break;
        case '×': result = multiply(aNum, bNum); 
                  break;
        case '÷': result = divide(aNum, bNum); 
                  break;
        default: return "Err"
    }

    if(Number.isInteger(result)) return result;
    else if(typeof(result === 'number') && !Number.isInteger(result)){
        if(hasFivePlusDigits(result) === true){ 
            return result.toFixed(5);
        }
        else{
            return result;
        }
    }
}
function handleClick(numop){
    const numbers = "0123456789"
    const operators = "+-×÷"
    var result = 0

    if(!(display.textContent === "" && !numbers.includes(numop))){
        if(display.textContent === "Err" || display.textContent === "That's impossible bro 🥀" || display.textContent === "Do normal calcs bru 🥀" || display.textContent === "NaN"){
            display.textContent = ""
        }

        if(numbers.includes(numop)){
            if(lastEval){
                display.textContent = numop;
                lastEval = false;
            }
            else{
                result = parseInt(numop);
                display.textContent += result
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
            display.textContent = ""
            lastEval = false;
        }
        else if(numop === "del"){
            display.textContent = display.textContent.slice(0, -1);
            lastEval = false;
        }

        const expressionArr = display.textContent.split(" ");

        if(expressionArr.length >= 4){
            display.textContent = operate(expressionArr[1], expressionArr[0], expressionArr[2]) + " " + numop + " ";
            lastEval = false;
        }
        else if(numop === "=" && expressionArr.length >= 3 && (expressionArr[2] != "")){
            display.textContent = operate(expressionArr[1], expressionArr[0], expressionArr[2]);
            lastEval = true;
        }
    }
}

function hasFivePlusDigits(num){
    const str = num.toString();
    const parts = str.split('.');

    if(parts.length < 2) return false;

    if(parts[1].length > 5){
        return true;
    };
}

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