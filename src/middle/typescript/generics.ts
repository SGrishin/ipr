// Простая дженерик-функция
function identity<T>(arg: T): T {
    return arg;
}

// Использование
let output1 = identity<string>("hello");  // Тип вывода: string
let output2 = identity<number>(42);      // Тип вывода: number

// Дженерик-интерфейс
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

// Использование
let pair1: KeyValuePair<number, string> = { key: 1, value: "one" };
let pair2: KeyValuePair<string, boolean> = { key: "isValid", value: true };

// Дженерик-класс
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// Использование
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

// Дженерик с ограничением типа (constraint)
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Использование
loggingIdentity("hello");  // OK, строка имеет свойство length
loggingIdentity([1, 2, 3]); // OK, массив имеет свойство length
// loggingIdentity(3);      // Ошибка: число не имеет свойства length