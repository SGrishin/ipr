const worker = new SharedWorker('worker.js');
worker.port.start();

const messagesDiv = document.getElementById('messages');

worker.port.onmessage = (event) => {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = event.data;
  messagesDiv.appendChild(msg);
};
