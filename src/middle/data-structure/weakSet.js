// 1. Создание WeakSet
const weakSet = new WeakSet();

// 2. Добавление объектов (только объекты!)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const func = function() {};

weakSet.add(obj1);
weakSet.add(obj2);
weakSet.add(func);

// Попытка добавить примитив вызовет ошибку
// weakSet.add("строка"); // TypeError: Invalid value used in weak set

// 3. Проверка наличия объекта
console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(func)); // true

// 4. Удаление объекта
weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // false

// 5. Главная особенность: слабые ссылки
let user = { name: "Alex" };
weakSet.add(user);

console.log(weakSet.has(user)); // true

// Когда ссылки на объект исчезают, он удаляется из WeakSet
user = null; // Теперь объект может быть удален сборщиком мусора

// После этого запись в WeakSet будет автоматически удалена
// (проверить это напрямую мы не можем, так как нет методов для итерации)

// 6. WeakSet не поддерживает итерацию и не имеет свойства размера
// weakSet.size // undefined
// weakSet.forEach() // TypeError: weakSet.forEach is not a function
// for (let item of weakSet) {} // TypeError: weakSet is not iterable