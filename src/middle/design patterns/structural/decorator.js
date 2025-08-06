// Decorator — структурный шаблон проектирования, предназначенный для динамического подключения дополнительного поведения к объекту.
// Шаблон Декоратор предоставляет гибкую альтернативу практике создания подклассов с целью расширения функциональности.

// Базовый класс компонента - Кофе
class Coffee {
  getCost() {
    return 5; // Базовая стоимость кофе
  }
  
  getDescription() {
    return "Простой кофе";
  }
}

// Базовый декоратор
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  getCost() {
    return this.coffee.getCost();
  }
  
  getDescription() {
    return this.coffee.getDescription();
  }
}

// Конкретные декораторы - добавки к кофе

// Молоко
class MilkDecorator extends CoffeeDecorator {
  getCost() {
    return this.coffee.getCost() + 2;
  }
  
  getDescription() {
    return this.coffee.getDescription() + ", молоко";
  }
}

// Сахар
class SugarDecorator extends CoffeeDecorator {
  getCost() {
    return this.coffee.getCost() + 1;
  }
  
  getDescription() {
    return this.coffee.getDescription() + ", сахар";
  }
}

// Взбитые сливки
class WhipDecorator extends CoffeeDecorator {
  getCost() {
    return this.coffee.getCost() + 3;
  }
  
  getDescription() {
    return this.coffee.getDescription() + ", взбитые сливки";
  }
}

// Использование
let coffee = new Coffee();
console.log(coffee.getDescription(), "-", coffee.getCost() + "₽"); 
// Простой кофе - 5₽

coffee = new MilkDecorator(coffee);
console.log(coffee.getDescription(), "-", coffee.getCost() + "₽"); 
// Простой кофе, молоко - 7₽

coffee = new SugarDecorator(coffee);
console.log(coffee.getDescription(), "-", coffee.getCost() + "₽"); 
// Простой кофе, молоко, сахар - 8₽

coffee = new WhipDecorator(coffee);
console.log(coffee.getDescription(), "-", coffee.getCost() + "₽"); 
// Простой кофе, молоко, сахар, взбитые сливки - 11₽


// Преимущества:
// - Большая гибкость, чем у наследования
// - Позволяет избежать перегруженных функциями классов
// - Можно добавлять и удалять обязанности во время выполнения
// - Позволяет комбинировать несколько декораторов

// Недостатки:
// - Может привести к большому количеству маленьких классов
// - Усложняет код из-за множества обёрток
// - Трудно реализовать декораторы, которые не зависят от порядка