// 1. Создание символов
const idSymbol = Symbol('id'); // 'id' - это описание символа (не влияет на его уникальность)
const nameSymbol = Symbol('name');
const sameDescriptionSymbol = Symbol('id'); // Другой символ, даже с тем же описанием

console.log(idSymbol === sameDescriptionSymbol); // false - символы уникальны

// 2. Использование в качестве ключей объекта
const user = {
  [idSymbol]: 12345, // Используем символ как ключ
  [nameSymbol]: 'John Doe',
  age: 30
};

console.log(user[idSymbol]); // 12345 - доступ по символу

// 3. Символьные свойства не видны в обычных итерациях
console.log(Object.keys(user)); // ['age'] - только обычные свойства
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(name)] - только символьные

// 4. Символы для создания "скрытых" свойств
const isAdminSymbol = Symbol('isAdmin');
user[isAdminSymbol] = true;

// Это свойство не будет случайно перезаписано или обнаружено
for (let key in user) {
  console.log(key); // age - символьные свойства не перечисляются
}

// 5. Глобальный реестр символов
const globalSymbol = Symbol.for('globalId'); // Создает или находит символ в глобальном реестре
const sameGlobalSymbol = Symbol.for('globalId');

console.log(globalSymbol === sameGlobalSymbol); // true - один и тот же символ

// 6. Известные символы (well-known symbols) - встроенные символы для изменения поведения объектов
const collection = {
  items: [1, 2, 3],
  [Symbol.iterator]: function*() { // Используем Symbol.iterator для создания итерируемого объекта
    for (let item of this.items) {
      yield item;
    }
  }
};

for (let item of collection) {
  console.log(item); // 1, 2, 3
}