// Интерфейс — это класс, который обеспечивает программисту простой или более программно-специфический способ доступа к другим классам.

// "Интерфейс" в виде набора ожидаемых методов
class ShapeInterface {
  area() {
    throw new Error("Метод area() должен быть реализован");
  }
}

// Класс, реализующий интерфейс
class Circle extends ShapeInterface {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

// Использование
const circle = new Circle(5);
console.log(circle.area()); // 78.53981633974483