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
                // Check for division by zero
                if (string.includes('/0') || string.includes('0/0')) {
                    throw new Error('Cannot divide by zero');
                }
                string = eval(string);
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
            // Prevent multiple decimal points in a single number
            if (value === '.' && string.slice(-1) === '.') {
                return; // Do not add another decimal point
            }
            string += value;
            input.value = string;
        }
    });
});

// Function to validate the expression
function isValidExpression(expr) {
    // Regex to check for invalid sequences
    const invalidPatterns = /(\d+[\+\-\*\/]{2,})|([\+\-\*\/]{2,})|(\d+\.\d+\.\d+)/;
    return !invalidPatterns.test(expr);
}
