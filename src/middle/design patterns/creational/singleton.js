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