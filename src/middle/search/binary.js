// итеративный вариант
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Находим средний индекс
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            // Элемент найден
            return mid;
        } else if (arr[mid] < target) {
            // Искомый элемент в правой половине
            left = mid + 1;
        } else {
            // Искомый элемент в левой половине
            right = mid - 1;
        }
    }
    
    // Элемент не найден
    return -1;
}

// Пример использования (массив должен быть отсортирован)
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(binarySearch(sortedArray, 6)); // Вернет 5 (индекс числа 6)
console.log(binarySearch(sortedArray, 10)); // Вернет -1 (число 10 отсутствует)

// рекурсивный вариант
function recursiveBinarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return recursiveBinarySearch(arr, target, mid + 1, right);
    } else {
        return recursiveBinarySearch(arr, target, left, mid - 1);
    }
}

// Пример использования
console.log(recursiveBinarySearch(sortedArray, 3)); // Вернет 2
console.log(recursiveBinarySearch(sortedArray, 0)); // Вернет -1

// Сложность - O(logN)

// Память:
// итеративный - O(1)
// рекурсивный - O(log n)

// Особенности: требует предварительной сортировки данных, эффективен для больших массивов