// You Aren't Gonna Need It

// Пример нарушения

// Плохо: добавляем лишнюю логику "на всякий случай"
function calculate(a, b, operation) {
  if (operation === "add") {
    return a + b;
  } else if (operation === "subtract") {
    return a - b;
  } else if (operation === "multiply") {  // А вдруг пригодится?
    return a * b;
  } else if (operation === "divide") {    // А вдруг пригодится?
    return a / b;
  }
}

// Сейчас нужен только '+', но мы написали всё подряд
console.log(calculate(2, 3, "add"));

// Исправленный вариант

// Хорошо: реализуем только то, что нужно сейчас
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // Просто и по делу