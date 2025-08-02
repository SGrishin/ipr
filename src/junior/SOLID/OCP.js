// Open/Closed Principle

// Пример нарушения

class AreaCalculator {
  calculate(shape) {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === 'square') {
      return shape.side ** 2;
    }
  }
}

// Исправленный вариант

class Shape {
  area() {
    throw new Error('Метод area должен быть реализован');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  
  area() {
    return this.side ** 2;
  }
}

class AreaCalculator {
  calculate(shape) {
    return shape.area();
  }
}