// Property container - позволяет добавлять дополнительные свойства для класса в контейнер (внутри класса), вместо расширения класса новыми свойствами.

class PropertyContainer {
  constructor() {
    this._properties = new Map();
  }

  // Добавить или обновить свойство
  setProperty(name, value) {
    this._properties.set(name, value);
    return this; // для чейнинга
  }

  // Получить значение свойства
  getProperty(name) {
    return this._properties.get(name);
  }

  // Проверить наличие свойства
  hasProperty(name) {
    return this._properties.has(name);
  }

  // Удалить свойство
  removeProperty(name) {
    this._properties.delete(name);
    return this; // для чейнинга
  }

  // Получить все свойства
  getAllProperties() {
    return Object.fromEntries(this._properties.entries());
  }
}

// Пример использования
const gameCharacter = new PropertyContainer();

// Добавляем динамические свойства
gameCharacter
  .setProperty('name', 'Warrior')
  .setProperty('health', 100)
  .setProperty('inventory', ['sword', 'shield']);

// Добавляем новое свойство позже
gameCharacter.setProperty('level', 5);

console.log(gameCharacter.getProperty('health')); // 100
console.log(gameCharacter.hasProperty('mana')); // false

// Удаляем свойство
gameCharacter.removeProperty('inventory');

console.log(gameCharacter.getAllProperties());
// { name: 'Warrior', health: 100, level: 5 }


// Преимущества:
// - Гибкость в добавлении новых свойств
// - Избегание жесткой структуры класса
// - Простота расширения функциональности
// - Уменьшение количества классов-наследников

// Недостатки:
// - Потеря строгой типизации
// - Меньшая прозрачность (неясно, какие свойства доступны)
// - Возможные ошибки в именах свойств (опечатки)