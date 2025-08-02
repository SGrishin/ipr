// Keep It Simple, Stupid

// Пример нарушения

// Плохо: избыточная сложность
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

// Исправленный вариант

// Хорошо: просто и понятно
function isEven(num) {
  return num % 2 === 0;
}