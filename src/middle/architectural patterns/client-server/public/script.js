function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    document.getElementById('result').innerHTML = '';
}

function calculate() {
    const expression = document.getElementById('display').value;
    if (!expression) return;
    
    // Определяем операцию
    let operation, num1, num2;
    if (expression.includes('+')) {
        operation = 'add';
        [num1, num2] = expression.split('+');
    } else if (expression.includes('-')) {
        operation = 'subtract';
        [num1, num2] = expression.split('-');
    } else if (expression.includes('*')) {
        operation = 'multiply';
        [num1, num2] = expression.split('*');
    } else if (expression.includes('/')) {
        operation = 'divide';
        [num1, num2] = expression.split('/');
    } else {
        document.getElementById('result').innerHTML = 'Invalid expression';
        return;
    }
    
    // Отправляем запрос на сервер
    fetch(`/calculate?operation=${operation}&num1=${num1}&num2=${num2}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerHTML = 'Error: ' + data.error;
            } else {
                document.getElementById('result').innerHTML = 'Result: ' + data.result;
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        });
}