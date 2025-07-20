import React from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function* myGenerator() {
  console.log("Начало");

  yield sleep(1000); // Пауза на 1 секунду
  console.log("Прошла 1 секунда");

  yield sleep(2000); // Пауза на 2 секунды
  console.log("Прошло ещё 2 секунды");
  
  console.log("Конец");
}

// Раннер, который ждёт завершения промисов
function run(genFunc) {
  const gen = genFunc();

  function step(nextValue) {
    const { value, done } = gen.next(nextValue);
    if (done) return;
    // value — это промис
    value.then(result => step(result));
  }

  step();
}


function* waitWrong() {
  console.log("Начало");
  yield setTimeout(() => console.log("Прошло 1 сек"), 1000);
  console.log("Это выполнится сразу же");
  yield setTimeout(() => console.log("Прошло 1 сек"), 1000);
  console.log("Это что сейчас было?");
  yield setTimeout(() => console.log("Прошло 1 сек"), 1000);
  console.log("Конец");
}

const gen = waitWrong()

function Timeout() {
    const handleStart = () => run(myGenerator);
    const handleStart2 = () => {
        gen.next()
    };
    return (
        <div>
            <button onClick={handleStart}>Запустить генератор с таймаутом</button>
            <button onClick={handleStart2}>Запустить генератор без ожидания таймаута</button>
        </div>
    )
}

export default Timeout