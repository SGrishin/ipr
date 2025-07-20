const worker = new SharedWorker('worker.js');
worker.port.start();

document.getElementById('input').addEventListener('input', (e) => {
  worker.port.postMessage({ text: e.target.value });
});

worker.port.onmessage = (event) => {
  console.log('Ответ от SharedWorker:', event.data);
};
