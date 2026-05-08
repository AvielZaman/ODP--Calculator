// Basic arithmetic function
function add(a, b){
    return (a+b).toFixed(10);
}

function subtract(a, b){
    return (a-b).toFixed(10);
}

function multiply(a, b){
    return (a*b).toFixed(10);
}

function divide(a, b){
    return (a/b).toFixed(10);
}

function modulus(a,b){
    return (a%b).toFixed(10);
}


function operate(num1, num2, operator){
    switch(operator){
        case "+":
            return add(num1,num2);
        
        case "-":
            return subtract(num1,num2);

        case "X":
            return multiply(num1,num2);

        case "/":
            return divide(num1,num2);

        case '%':
            return modulus(num1,num2);

        default:
            alert("Error! Invalid operator!");
    }
}


function calculate(){
    const output = document.querySelector(".output");
    let num1, num2, operator, currentInput="";

    const numBtn = document.querySelectorAll(".num");
    numBtn.forEach(button => {
        button.addEventListener('click', () => {
            // prevents from enerting multiple decimal dots
            if(button.textContent === '.' && currentInput.includes("."))
                return;

            // prevent entering long numbers
            if(currentInput.length >= 12)
                return;

            currentInput += button.textContent;
            output.textContent = currentInput;

            // if there's no operator, store the input in the first operand (num1)
            // if is exists, store in the second operand (num2)
            if(!operator)
                num1 = parseFloat(currentInput);
            else
                num2 = parseFloat(currentInput);
        })
    });

    const opBtn = document.querySelectorAll(".op");
    opBtn.forEach(button =>  {
        button.addEventListener('click', () => {
            // if " = " was clicked, check if there are numbers from the input and do the operation
            if(button.textContent === '='){
                if(num1 !== undefined && num2 !== undefined){
                    let result = operate(num1,num2,operator);
                    result = parseFloat(result);

                    // check if the result is a long number
                    if(result.toString().length >12){
                        console.log("result = " +result);
                        alert("Error! Answer1 is to big!");
                        num1 = num2 = operator = undefined;
                        output.textContent = "";
                        currentInput = "";
                        return;
                    }

                    output.textContent = result;

                    // save for the next calculation
                    num1 = result;
                    num2 = operator = undefined;
                    currentInput = "";
                }

            } else if(operator !== undefined){
                if(num2 !== undefined){
                    num1 = operate(num1, num2, operator);

                    // check if the result is a long number
                    if(num1.toString().length >12){
                        alert("Error! Answer2 is to big!");
                        num1 = num2 = operator = undefined;
                        output.textContent = "";
                        currentInput = "";
                        return;
                    }
                }

                operator = button.textContent;
                output.textContent = operator;
                num2 = undefined;
                currentInput = "";

            } else {
                operator = button.textContent;
                console.log("operator: " +operator + " , num1 = " +num1
                     +" , num2 = " +num2 + " , currentInput = " +currentInput 
                     +" , output.textContent = " +output.textContent);
                output.textContent = operator;
                currentInput = "";
            }

            if(num2 === 0 && operator === "/"){
                alert("Error! can't divide by 0!");
                currentInput = "";
                output.textContent = "";
                num1 = num2 = operator = undefined;
                return;
            }

        });
    });

    const funcBtn = document.querySelectorAll(".function");
    funcBtn.forEach(button => {
        button.addEventListener('click', () => {
            if(button.textContent === 'AC'){
                output.textContent = "";
                currentInput = "";
                num1 = num2 = operator = undefined;
            }

            if(button.textContent === '⌫' && output.textContent !== ""){
                output.textContent= output.textContent.slice(0,-1);
                currentInput = currentInput.slice(0,-1);
                if(num2 !== undefined){
                    num2 = parseInt(num2/10);
                } else if (operator !== undefined){
                    operator = "";
                } else if (num1 !== undefined){
                    num1 = parseInt(num1/10);
                }

                console.log("after ⌫ : num1 = " +num1 +" , operator = " +operator + " , num2 = "+ num2 +
                    " , currentInput = " +currentInput);
            }
            
            if(button.textContent === '+/-')
                num1 = output.textContent = Number(output.textContent) * -1 ;

            if(button.textContent === "%")
                operator = '%';
        })
    });
}


calculate();