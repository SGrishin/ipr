// Lazy Initialization - это паттерн, который откладывает создание объекта,
// вычисление значения или выполнение ресурсоемкой операции до того момента, пока это действительно не понадобится.

class ExpensiveResource {
  constructor() {
    console.log('Создается ресурсоемкий объект...');
    // Имитация долгой инициализации
    this.data = this._loadData();
  }
  
  _loadData() {
    // Имитация загрузки данных (например, из базы данных)
    return { loaded: new Date() };
  }
  
  getData() {
    return this.data;
  }
}

class LazyExpensiveResource {
  constructor() {
    this.resource = null;
  }
  
  getInstance() {
    if (!this.resource) {
      this.resource = new ExpensiveResource();
    }
    return this.resource;
  }
}

// Использование
const lazyResource = new LazyExpensiveResource();

console.log('До первого обращения');
// Ресурс еще не создан

console.log('Первое обращение');
console.log(lazyResource.getInstance().getData()); 
// Создается ресурсоемкий объект...
// Выводит данные

console.log('Второе обращение');
console.log(lazyResource.getInstance().getData()); 
// Просто выводит данные (объект не создается заново)


// Достоинства:
// - Инициализация выполняется только в тех случаях, когда она действительно необходима
// - Ускоряется начальная инициализация

// Недостатки:
// - Возникает задержка при первом обращении к объекту, что может оказаться критичным при параллельном выполнении другой ресурсоёмкой операции