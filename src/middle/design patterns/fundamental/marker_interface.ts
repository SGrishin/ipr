// Маркерный интерфейс лишь является признаком наличия определённого поведения у объектов класса, помеченного маркером.

const Deletable = Symbol("Deletable");

interface DeletableUser {
  [Deletable]: true
}

interface OtherUser {

}

// Помечаем класс как сериализуемый
class User implements DeletableUser {
  private name
  private age
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Применяем маркер
  get [Deletable](): true {
    return true
  }
}

class OtherUserImpl implements OtherUser {
  private name
  private age
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}

function isDeletableUser(user: DeletableUser | OtherUser): user is DeletableUser {
  return Deletable in user
}

class DeletionService {
  delete(entity: DeletableUser | OtherUser) {
    if (isDeletableUser(entity)) {
      // удаляем
    }
  }
}


// Преимущества:
// - Простота реализации
// - Гибкость в обработке
// - Читаемость кода
// - Совместимость с другими паттернами

// Недостатки:
// - Отсутствие контроля реализации
// - Может запутывать
// - Не во всех языках есть поддержка из коробки