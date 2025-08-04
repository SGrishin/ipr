function mergeSort(arr) {
  // Если массив содержит один элемент или пуст, возвращаем его
  if (arr.length <= 1) {
    return arr;
  }

  // Находим середину массива
  const middle = Math.floor(arr.length / 2);
  
  // Делим массив на две части
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Рекурсивно сортируем обе части и объединяем их
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Сравниваем элементы из обоих массивов и добавляем меньший в результат
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Добавляем оставшиеся элементы из левого массива
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Добавляем оставшиеся элементы из правого массива
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

// Пример использования
const array = [64, 34, 25, 1, 12, 22, 11, 2, 9];
console.log("До сортировки:", array);
console.log("После сортировки:", mergeSort(array)); // [1, 2, 9, 11, 12, 22, 25, 34, 64]

// @TODO: ДОРАБОТАТЬ!!!!

// сложность - O(n * logn)

// количество сравнений:
// - отсортированный - O(n * logn)
// - случайный - O(n * logn)
// - обратный - O(n * logn)

// количество перестановок:
// - отсортированный - O(n * logn)
// - случайный - O(n * logn) 
// - обратный - O(n * logn)

// память - O(n)

// особенности: сохраняет порядок равных элементов, не ускоряется на частично отсортированных данных