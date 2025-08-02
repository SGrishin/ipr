// Liskov Substitution Principle

// Пример нарушения

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  setWidth(width) {
    this.width = width;
  }
  
  setHeight(height) {
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
  
  setWidth(width) {
    this.width = width;
    this.height = width;
  }
  
  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function testArea(rectangle) {
  rectangle.setWidth(5);
  rectangle.setHeight(4);
  console.log(rectangle.area()); // Ожидается 20, но для Square получим 16
}

// Исправленный вариант

class Shape {
  area() {
    throw new Error('Метод area должен быть реализован');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(size) {
    super();
    this.size = size;
  }
  
  area() {
    return this.size ** 2;
  }
}