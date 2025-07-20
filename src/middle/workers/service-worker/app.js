if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}

document.getElementById('loadDataBtn').addEventListener('click', () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error: ' + err;
    });
});