// Фабрика решает, какой объект создать, на основе входных данных.

class Car {
  constructor(model, price) {
    this.model = model;
    this.price = price;
  }
}

class CarFactory {
  create(type) {
    switch (type) {
      case "Tesla":
        return new Car("Tesla Model 3", 40000);
      case "BMW":
        return new Car("BMW X5", 60000);
      default:
        throw new Error("Unknown car type");
    }
  }
}

const factory = new CarFactory();
const tesla = factory.create("Tesla");
const bmw = factory.create("BMW");

console.log(tesla); // Car { model: 'Tesla Model 3', price: 40000 }
console.log(bmw);   // Car { model: 'BMW X5', price: 60000 }