// Валидация свойств объекта
const validator = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value <= 0) {
        throw new TypeError('Age must be a positive number');
      }
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
person.age = '25'; // TypeError: Age must be a positive number



//  Логирование доступа к свойствам
const logger = {
  get(target, property) {
    console.log(`Reading property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting property: ${property} = ${value}`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({ name: 'John' }, logger);
console.log(user.name); // Логирует чтение и выводит "John"
user.age = 30; // Логирует установку возраста



// Массив с отрицательными индексами
const negativeArray = (arr) => new Proxy(arr, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});

const array = negativeArray([1, 2, 3, 4, 5]);
console.log(array[-1]); // 5
console.log(array[-2]); // 4



// Защищённый объект (только для чтения)
const readOnly = (obj) => new Proxy(obj, {
  set() {
    throw new Error('Object is read-only');
  },
  deleteProperty() {
    throw new Error('Object is read-only');
  }
});

const protectedUser = readOnly({ name: 'Alice' });
console.log(protectedUser.name); // "Alice"
protectedUser.name = 'Bob'; // Error: Object is read-only



// Кэширующий прокси для функций
const cache = new Map();

const cachedFunction = (fn) => new Proxy(fn, {
  apply(target, thisArg, args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Returning cached result');
      return cache.get(key);
    }
    const result = Reflect.apply(target, thisArg, args);
    cache.set(key, result);
    return result;
  }
});

const slowCalculation = (x) => {
  console.log('Calculating...');
  return x * x;
};

const cachedCalc = cachedFunction(slowCalculation);
console.log(cachedCalc(5)); // Calculating... 25
console.log(cachedCalc(5)); // Returning cached result 25



// 