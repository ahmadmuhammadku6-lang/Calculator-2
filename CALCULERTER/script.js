let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');
let expression = "";
let buttonArray = Array.from(buttons);

buttonArray.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;
        
        if (buttonText === '=') {
            try {
                // Replace % with /100 for calculation
                let calcExpression = expression.replace('%', '/100');
                // Validate expression before evaluating
                if (/^[0-9+\-*/.%()\s]+$/.test(calcExpression)) {
                    expression = eval(calcExpression).toString();
                    input.value = expression;
                } else {
                    throw new Error('Invalid expression');
                }
            } catch (error) {
                expression = "";
                input.value = "Error";
            }
        }
        else if (buttonText === 'DEL') {
            expression = expression.substring(0, expression.length - 1);
            input.value = expression || "0";
        }
        else if (buttonText === 'AC') {
            expression = "";
            input.value = "0";
        }
        else if (buttonText === '.') {
            // Prevent multiple decimal points in a number
            const lastNumber = expression.split(/[\+\-\*\/]/).pop();
            if (!lastNumber.includes('.')) {
                expression += buttonText;
                input.value = expression;
            }
        }
        else if (['+', '-', '*', '/', '%'].includes(buttonText)) {
            // Prevent multiple operators in a row
            const lastChar = expression.slice(-1);
            if (!['+', '-', '*', '/', '%', '.'].includes(lastChar) || expression === "") {
                expression += buttonText;
                input.value = expression;
            }
        }
        else {
            // Handle numbers and 00
            expression += buttonText;
            input.value = expression;
        }
    });
});