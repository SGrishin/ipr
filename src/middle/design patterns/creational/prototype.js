// Паттерн Prototype позволяет создавать новые объекты путем клонирования существующих, а не через конструктор.

const carPrototype = {
  wheels: 4,
  start() {
    console.log("Engine started");
  },
  stop() {
    console.log("Engine stopped");
  },
};

// Создаем новый объект на основе прототипа
const myCar = Object.create(carPrototype);
myCar.model = "Toyota";

console.log(myCar.wheels); // 4 (унаследовано)
myCar.start(); // Engine started