// Потеря данных при stringify: undefined, функции и Symbol
const obj = {
  name: "Alice",
  age: undefined, // потеряется
  greet: function() { console.log("Hi!"); }, // потеряется
  [Symbol("id")]: 123 // потеряется
};

const json = JSON.stringify(obj);
console.log(json); // {"name":"Alice"}


// Циклические ссылки
const obj = { name: "Loop" };
obj.self = obj; // циклическая ссылка

try {
  JSON.stringify(obj); // TypeError: Converting circular structure to JSON
} catch (e) {
  console.error(e.message); 
}


// Потеря точности больших чисел
const obj = { bigNum: 12345678901234567890n }; // BigInt
const json = JSON.stringify(obj); // Ошибка: BigInt не сериализуется

// Обходной путь:
const objSafe = { bigNum: obj.bigNum.toString() };
console.log(JSON.stringify(objSafe)); // {"bigNum":"12345678901234567890"}


// Невалидный JSON при парсинге
const invalidJson = "{ name: 'Alice' }"; // Ошибка: ключ без кавычек

try {
  JSON.parse(invalidJson);
} catch (e) {
  console.error("Ошибка парсинга:", e.message); 
}

// Правильный JSON
const validJson = '{"name": "Alice"}';


// Скрытые символы (BOM) в начале файла, если JSON загружен из файла с BOM (Byte Order Mark)
const jsonWithBOM = '\uFEFF{"name":"Bob"}';
try {
  const obj = JSON.parse(jsonWithBOM); // Ошибка в старых браузерах
} catch (e) {
  console.error("BOM!", e);
}

// Решение: удалить BOM
const cleanJson = jsonWithBOM.replace(/^\uFEFF/, '');
JSON.parse(cleanJson); // OK


// toJSON() — кастомизация сериализации
const obj = {
  name: "Alice",
  toJSON() { return { name: this.name + "!" }; }
};

console.log(JSON.stringify(obj)); // {"name":"Alice!"}