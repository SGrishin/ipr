// // Создаем Web Worker
// const worker = new Worker('worker.js');

const workerCode = `
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  self.onmessage = function(e) {
    const n = e.data;
    const startTime = Date.now();
    const result = fibonacci(n);
    const time = Date.now() - startTime;
    self.postMessage({ result, time });
  };
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

// Элементы DOM
const runInMainBtn = document.getElementById('runInMain');
const runInWorkerBtn = document.getElementById('runInWorker');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');
const counterEl = document.getElementById('counter');

// Демонстрация отзывчивости UI
let counter = 0;
setInterval(() => {
    counter++;
    counterEl.textContent = counter;
}, 100);

// Тяжелая функция - вычисление n-го числа Фибоначчи
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Выполнить в основном потоке
runInMainBtn.addEventListener('click', () => {
    statusEl.textContent = 'Вычисление в основном потоке...';
    resultEl.textContent = '';
    
    // Это заблокирует интерфейс!
    const startTime = Date.now();
    const result = fibonacci(42); // Большое число для демонстрации
    const time = Date.now() - startTime;
    
    resultEl.textContent = `Результат: ${result} (${time}мс)`;
    statusEl.textContent = 'Готов к работе';
});

// Выполнить в Web Worker
runInWorkerBtn.addEventListener('click', () => {
    statusEl.textContent = 'Вычисление в Web Worker...';
    resultEl.textContent = '';
    
    worker.postMessage(42); // Отправляем данные в worker
});

// Получаем результат от Web Worker
worker.onmessage = function(e) {
    const { result, time } = e.data;
    resultEl.textContent = `Результат: ${result} (${time}мс)`;
    statusEl.textContent = 'Готов к работе';
};