const ports = [];

onconnect = function(e) {
  const port = e.ports[0];
  ports.push(port);

  port.onmessage = function(event) {
    const msg = event.data;

    // Рассылаем сообщение всем подключённым вкладкам
    ports.forEach(p => {
      p.postMessage(`Получено: ${msg.text}`);
    });
  };
};
