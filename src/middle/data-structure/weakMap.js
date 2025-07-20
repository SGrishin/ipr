// 1. Создание WeakMap
const weakMap = new WeakMap();

// 2. Ключами могут быть ТОЛЬКО объекты
const objKey1 = { id: 1 };
const objKey2 = { id: 2 };
const funcKey = function() {};

weakMap.set(objKey1, 'данные для objKey1');
weakMap.set(objKey2, { name: 'John', age: 30 });
weakMap.set(funcKey, 'Этот ключ - функция');

// Попытка использовать примитив как ключ вызовет ошибку
// weakMap.set('stringKey', 'value'); // TypeError: Invalid value used as weak map key

// 3. Доступ к значениям
console.log(weakMap.get(objKey1)); // 'данные для objKey1'
console.log(weakMap.get(funcKey)); // 'Этот ключ - функция'

// 4. Проверка наличия ключа
console.log(weakMap.has(objKey1)); // true

// 5. Удаление элемента
weakMap.delete(objKey1);
console.log(weakMap.has(objKey1)); // false

// 6. WeakMap не имеет методов для итерации или определения размера
// weakMap.size // undefined
// weakMap.keys() // TypeError: weakMap.keys is not a function
// for (let item of weakMap) {} // TypeError: weakMap is not iterable

// 7. Главная особенность: слабая ссылка на ключи
let user = { name: 'Alice' };
weakMap.set(user, 'секретные данные');

console.log(weakMap.get(user)); // 'секретные данные'

// Когда объект-ключ удаляется, он автоматически удаляется из WeakMap
user = null; // Теперь объект user может быть удален сборщиком мусора

// После этого запись в WeakMap будет автоматически удалена
// (хотя мы не можем проверить это напрямую, т.к. нет способа проверить все ключи)