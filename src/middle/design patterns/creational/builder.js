// Builder — порождающий шаблон проектирования предоставляет способ создания составного объекта.

// Продукт, который мы будем строить
class Pizza {
  constructor() {
    this.size = null;
    this.crust = null;
    this.cheese = false;
    this.pepperoni = false;
    this.mushrooms = false;
  }

  describe() {
    console.log(`Пицца: 
      Размер: ${this.size}
      Тесто: ${this.crust}
      Сыр: ${this.cheese ? 'да' : 'нет'}
      Пепперони: ${this.pepperoni ? 'да' : 'нет'}
      Грибы: ${this.mushrooms ? 'да' : 'нет'}
    `);
  }
}

// Строитель для пиццы
class PizzaBuilder {
  constructor() {
    this.pizza = new Pizza();
  }

  setSize(size) {
    this.pizza.size = size;
    return this;
  }

  setCrust(crust) {
    this.pizza.crust = crust;
    return this;
  }

  addCheese() {
    this.pizza.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pizza.pepperoni = true;
    return this;
  }

  addMushrooms() {
    this.pizza.mushrooms = true;
    return this;
  }

  build() {
    return this.pizza;
  }
}

// Использование
const myPizza = new PizzaBuilder()
  .setSize('large')
  .setCrust('thin')
  .addCheese()
  .addPepperoni()
  .build();

myPizza.describe();

// Можно создать другую пиццу с другим набором параметров
const vegetarianPizza = new PizzaBuilder()
  .setSize('medium')
  .setCrust('thick')
  .addCheese()
  .addMushrooms()
  .build();

vegetarianPizza.describe();


// Плюсы:
// - позволяет изменять внутреннее представление продукта
// - изолирует код, реализующий конструирование и представление
// - дает более тонкий контроль над процессом конструирования

// Минусы:
// - алгоритм создания сложного объекта не должен зависеть от того, из каких частей состоит объект и как они стыкуются между собой
// - процесс конструирования должен обеспечивать различные представления конструируемого объекта