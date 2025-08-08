// Паттерн Singleton гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к нему.

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = "Connected to DB";
    Database.instance = this;
  }

  query(sql) {
    console.log(`Executing: ${sql}`);
  }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true (один и тот же объект)
db1.query("SELECT * FROM users"); // Executing: SELECT * FROM users



// Преимущества:
// - Контролируемый доступ к единственному экземпляру
// - Глобальный доступ без загрязнения глобальной области видимости
// - Ленивая инициализация (Lazy Initialization)
// - Упрощение управления общими ресурсами

// Недостатки:
// - Нарушение принципа единственной ответственности (SRP). Управляет своим жизненным циклом и основной логику
// - Проблемы с тестированием
// - Глобальное состояние
// - Потенциальные проблемы в многопоточной среде
// - Антипаттерн в некоторых случаях. Чрезмерное использование Singleton ведет к жесткой связности (tight coupling) кода.
