// Adapter — структурный шаблон проектирования, предназначенный для организации использования функций объекта,
// недоступного для модификации, через специально созданный интерфейс. Другими словами — это структурный паттерн проектирования,
// который позволяет объектам с несовместимыми интерфейсами работать вместе.

// Старая система
class OldCalculator {
  constructor() {
    this.operations = function(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return term1 + term2;
        case 'sub':
          return term1 - term2;
        default:
          return NaN;
      }
    };
  }
}

// Новая система
class NewCalculator {
  constructor() {
    this.add = function(term1, term2) {
      return term1 + term2;
    };
    this.sub = function(term1, term2) {
      return term1 - term2;
    };
  }
}

// Адаптер
// нужно сделать так, чтобы старый код работал с новым калькулятором
class CalculatorAdapter {
  constructor() {
    const newCalc = new NewCalculator();

    this.operations = function(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return newCalc.add(term1, term2);
        case 'sub':
          return newCalc.sub(term1, term2);
        default:
          return NaN;
      }
    };
  }
}

// Использование
const oldCalc = new OldCalculator();
console.log(oldCalc.operations(10, 5, 'add')); // 15

const newCalc = new NewCalculator();
console.log(newCalc.add(10, 5)); // 15

const adapter = new CalculatorAdapter();
console.log(adapter.operations(10, 5, 'add')); // 15 (использует NewCalculator внутри)

// Преимущества:
// - Позволяет повторно использовать существующий код
// - Отделяет и скрывает от клиента детали преобразования интерфейсов
// - Позволяет изменять интерфейс, не изменяя сам класс

// Недостатки:
// - Увеличивает сложность кода за счет дополнительных классов
// - В некоторых случаях может снижать производительность из-за дополнительного уровня абстракции