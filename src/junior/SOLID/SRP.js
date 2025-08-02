// Single Responsibility Principle


// Пример нарушения

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  saveToDatabase() {
    // сохранение пользователя в базу данных
  }

  sendEmail() {
    // отправка email пользователю
  }
}

// Исправленный вариант

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // сохранение пользователя в базу данных
  }
}

class EmailService {
  sendEmail(user, message) {
    // отправка email пользователю
  }
}