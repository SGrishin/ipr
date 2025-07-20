// Тяжелая функция - вычисление n-го числа Фибоначчи
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Обработчик сообщений от основного потока
self.onmessage = function(e) {
    const n = e.data;
    const startTime = Date.now();
    
    // Выполняем тяжелое вычисление
    const result = fibonacci(n);
    const time = Date.now() - startTime;
    
    // Отправляем результат обратно
    self.postMessage({ result, time });
};