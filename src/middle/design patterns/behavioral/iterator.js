// Iterator — поведенческий шаблон проектирования. Представляет собой объект,
// позволяющий получить последовательный доступ к элементам объекта-агрегата без использования описаний каждого из агрегированных объектов.

// Коллекция (итерируемый объект)
class MyCollection {
  constructor(items) {
    this.items = items;
  }

  // Метод, возвращающий итератор
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

// Использование
const collection = new MyCollection([1, 2, 3, 4]);

// Итерация с помощью for..of
for (const item of collection) {
  console.log(item); // 1, 2, 3, 4
}

// Или вручную
const iterator = collection[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }


// Встроенные итераторы в JavaScript
const arr = [10, 20, 30];
const iterator1 = arr[Symbol.iterator]();

console.log(iterator1.next()); // { value: 10, done: false }
console.log(iterator1.next()); // { value: 20, done: false }


// Преимущества:
// - Единый интерфейс для обхода разных коллекций
// - Разделение ответственности
// - Поддержка разных способов обхода
// - Ленивое вычисление (Lazy Evaluation)
// - Интеграция с языковыми конструкциями

// Недостатки:
// - Избыточность для простых случаев
// - Снижение производительности
// - Не всегда подходит для изменяемых коллекций
// - Дополнительная память для состояния итератора