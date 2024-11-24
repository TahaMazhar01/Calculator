let input = document.getElementById("inputBox");  
let buttons = document.querySelectorAll("button");  
let string = "";  

let arr = Array.from(buttons);  

arr.forEach(button => {  
    button.addEventListener("click", (e) => {  
        const value = e.target.innerHTML;  

        if (value === '=') {  
            try {  
                if (!isValidExpression(string)) {  
                    throw new Error('Invalid expression');  
                }  

                const result = eval(string);  
                if (result === Infinity || result === -Infinity) {  
                    throw new Error('Cannot divide by zero');  
                }  

                string = result;  
                input.value = string;  
            } catch (error) {  
                input.value = error.message;  
                string = '';  
            }  
        } else if (value === 'AC') {  
            string = '';  
            input.value = string;  
        } else if (value === 'Del') {  
            if (string.length > 0) {  
                string = string.slice(0, -1);  
                input.value = string;  
            }  
        } else {  
            if (string.length === 0 && isOperator(value)) {  
                input.value = 'Input some value first';  
                setTimeout(() => {  
                    input.value = '';  
                }, 2000);  
                return;  
            }  

            if (value === '.' && (string.slice(-1) === '.' || /[+\-*/]$/.test(string))) {  
                return;  
            }  

            if (isOperator(value) && isOperator(string.slice(-1))) {  
                return;  
            }  

            string += value;  
            input.value = string;  
        }  
    });  
});  

function isValidExpression(expr) {  
    const invalidPatterns = /(\d+[\+\-\*\/]{2,})|([\+\-\*\/]{2,})|(\.\.)/;  
    return !invalidPatterns.test(expr);  
}  

function isOperator(char) {  
    return ['+', '-', '*', '/', '%'].includes(char);  
}
