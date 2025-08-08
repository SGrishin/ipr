// Узел связанного списка
class ListNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public next: ListNode<K, V> | null = null
  ) {}
}

// Связанный список для корзины
class LinkedList<K, V> {
  private head: ListNode<K, V> | null = null;

  // Добавление или обновление элемента
  upsert(key: K, value: V): void {
    let current = this.head;
    
    // Поиск существующего ключа
    while (current) {
      if (current.key === key) {
        current.value = value; // Обновление значения
        return;
      }
      current = current.next;
    }
    
    // Добавление нового узла в начало
    this.head = new ListNode(key, value, this.head);
  }

  // Поиск элемента
  find(key: K): V | undefined {
    let current = this.head;
    
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    
    return undefined;
  }

  // Удаление элемента
  delete(key: K): boolean {
    if (!this.head) return false;
    
    // Удаление из головы
    if (this.head.key === key) {
      this.head = this.head.next;
      return true;
    }
    
    let prev = this.head;
    let current = this.head.next;
    
    while (current) {
      if (current.key === key) {
        prev.next = current.next;
        return true;
      }
      prev = current;
      current = current.next;
    }
    
    return false;
  }

  // Получение всех ключей
  keys(): K[] {
    const keys: K[] = [];
    let current = this.head;
    
    while (current) {
      keys.push(current.key);
      current = current.next;
    }
    
    return keys;
  }

  // Получение всех значений
  values(): V[] {
    const values: V[] = [];
    let current = this.head;
    
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    
    return values;
  }
}

// Основная хеш-таблица
class HashTable<K extends string | number, V> {
  private size: number;
  private buckets: LinkedList<K, V>[];

  constructor(size: number = 10) {
    this.size = size;
    this.buckets = new Array(size);
    
    for (let i = 0; i < size; i++) {
      this.buckets[i] = new LinkedList<K, V>();
    }
  }

  // Хеш-функция
  private hash(key: K): number {
    const keyString = String(key);
    let hashValue = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hashValue = (hashValue << 5) + keyString.charCodeAt(i);
      hashValue = hashValue & hashValue; // Преобразование в 32-битное целое
    }
    
    return Math.abs(hashValue) % this.size;
  }

  public set(key: K, value: V): void {
    const index = this.hash(key);
    this.buckets[index].upsert(key, value);
  }

  public get(key: K): V | undefined {
    const index = this.hash(key);
    return this.buckets[index].find(key);
  }

  public delete(key: K): boolean {
    const index = this.hash(key);
    return this.buckets[index].delete(key);
  }

  public has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  public keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.buckets) {
      keys.push(...bucket.keys());
    }
    
    return keys;
  }

  public values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.buckets) {
      values.push(...bucket.values());
    }
    
    return values;
  }

  public clear(): void {
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = new LinkedList<K, V>();
    }
  }
}

// Пример использования
const hashTable = new HashTable<string, string | number>();

// Добавление элементов
hashTable.set("name", "Alice");
hashTable.set("age", 25);
hashTable.set("city", "New York");

// Коллизии
hashTable.set("mane", "Lion");
hashTable.set("eag", "Bird");

// Проверка работы
console.log(hashTable.get("name")); // "Alice"
console.log(hashTable.get("mane")); // "Lion"

hashTable.delete("age");
console.log(hashTable.has("age")); // false

console.log("Keys:", hashTable.keys());
console.log("Values:", hashTable.values());