// Замыкания, сохраняющие ненужные данные
function createLeaker() {
  const bigArray = new Array(1000000).fill('leak');
  return () => console.log(bigArray[0]);
}
const leaker = createLeaker();



// setInterval / setTimeout без clear
setInterval(() => {
  // работает вечно, даже если страница/компонент уже не нужен
  console.log(document.body.innerText);
}, 1000);




// Слушатели событий не снимаются
const el = document.createElement('div');
document.body.appendChild(el);
el.addEventListener('click', () => console.log('clicked'));
document.body.removeChild(el); // но слушатель остался



// "Detached DOM nodes" (отсоединенные узлы)
let detached;

function createDetachedDiv() {
  const div = document.createElement('div');
  div.textContent = 'I will leak';
  detached = div;
}

createDetachedDiv();



// Глобальные переменные
function cacheSomething() {
  window._cache = new Array(1000000).fill('data');
}
cacheSomething();



// Большой кэш без ограничений
const cache = {};

function addToCache(key, value) {
  cache[key] = value;
}

addToCache('someKey', new Array(1000000).fill('data'));


// React useEffect без очистки
useEffect(() => {
  const id = setInterval(() => {
    console.log('tick');
  }, 1000);
  // 🔥 пропущен clearInterval!
}, []);