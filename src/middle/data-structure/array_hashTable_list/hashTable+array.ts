type Bucket<K, V> = Array<[K, V]>;

class HashTable<K extends string | number, V> {
  private size: number;
  private buckets: Bucket<K, V>[];

  constructor(size: number = 10) {
    this.size = size;
    this.buckets = new Array<Bucket<K, V>>(size);
    
    // Инициализируем каждую корзину пустым массивом
    for (let i = 0; i < size; i++) {
      this.buckets[i] = [];
    }
  }

  // Хеш-функция
  private hash(key: K): number {
    const keyString = String(key);
    let hashValue = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hashValue += keyString.charCodeAt(i);
    }
    
    return hashValue % this.size;
  }

  // Добавление или обновление элемента
  public set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Проверяем, есть ли уже такой ключ в цепочке
    const existingEntry = bucket.find(([k]) => k === key);
    
    if (existingEntry) {
      existingEntry[1] = value; // Обновляем значение
    } else {
      bucket.push([key, value]); // Добавляем новую пару
    }
  }

  // Получение элемента
  public get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    const entry = bucket.find(([k]) => k === key);
    return entry ? entry[1] : undefined;
  }

  // Удаление элемента
  public delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    const entryIndex = bucket.findIndex(([k]) => k === key);
    
    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      return true;
    }
    
    return false;
  }

  // Проверка наличия ключа
  public has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Получение всех ключей
  public keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    
    return keys;
  }

  // Получение всех значений
  public values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    
    return values;
  }

  // Очистка таблицы
  public clear(): void {
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = [];
    }
  }
}

// Пример использования
const hashTable = new HashTable<string, string | number>();

// Добавляем элементы
hashTable.set("name", "Alice");
hashTable.set("age", 25);
hashTable.set("city", "New York");

// Коллизия - разные ключи могут дать одинаковый хеш
hashTable.set("mane", "Lion"); // Возможна коллизия с "name"
hashTable.set("eag", "Bird");  // Возможна коллизия с "age"

// Получаем элементы
console.log(hashTable.get("name")); // "Alice"
console.log(hashTable.get("mane")); // "Lion" (коллизия разрешена списком)

// Удаляем элемент
hashTable.delete("age");
console.log(hashTable.get("age")); // undefined

// Проверяем наличие ключа
console.log(hashTable.has("city")); // true
console.log(hashTable.has("country")); // false

// Получаем все ключи и значения
console.log("Keys:", hashTable.keys());
console.log("Values:", hashTable.values());

// Выводим структуру хеш-таблицы
console.log(hashTable);