// Don't Repeat Yourself

// Пример нарушения

// Плохо: дублирование кода
console.log("Привет, Вася!");
console.log("Привет, Петя!");
console.log("Привет, Маша!");

// Исправленный вариант

// Хорошо: используем функцию
function greet(name) {
  console.log(`Привет, ${name}!`);
}

greet("Вася");
greet("Петя");
greet("Маша");