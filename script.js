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

                // Evaluate the expression to check for division by zero
                const result = eval(string);
                if (result === Infinity || result === -Infinity) {
                    throw new Error('Cannot divide by zero');
                }

                string = result;
                input.value = string;
            } catch (error) {
                input.value = error.message; // Show specific error message
                string = ''; // Reset string to prevent further calculations
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
            // Prevent starting with an operator
            if (string.length === 0 && isOperator(value)) {
                input.value = 'Input some value first'; // Show message to user
                setTimeout(() => {
                    input.value = ''; // Clear the message after a short delay
                }, 2000); // Message lasts for 2 seconds
                return; // Do not add the operator
            }

            // Prevent multiple decimal points in a single number
            if (value === '.' && (string.slice(-1) === '.' || /[+\-*/]$/.test(string))) {
                return; // Do not add another decimal point
            }

            // Prevent multiple operators in a row
            if (isOperator(value) && isOperator(string.slice(-1))) {
                return; // Do not add another operator
            }

            string += value;
            input.value = string;
        }
    });
});

// Function to validate the expression
function isValidExpression(expr) {
    // Regex to check for invalid sequences
    const invalidPatterns = /(\d+[\+\-\*\/]{2,})|([\+\-\*\/]{2,})|(\.\.)/;
    return !invalidPatterns.test(expr);
}

// Function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}
