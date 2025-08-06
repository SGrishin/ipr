// Event Channel (также известный как Event Bus или Message Channel) — это поведенческий паттерн проектирования,
// который обеспечивает централизованную систему для публикации и подписки на события.
// Он позволяет различным компонентам приложения общаться друг с другом, не зная друг о друге напрямую.

class EventChannel {
  constructor() {
    this.subscribers = {};
  }

  // Метод для подписки на событие
  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
    
    // Возвращаем функцию для отписки
    return () => {
      this.subscribers[eventType] = this.subscribers[eventType].filter(
        cb => cb !== callback
      );
    };
  }

  // Метод для публикации события
  publish(eventType, data) {
    if (!this.subscribers[eventType]) return;
    
    this.subscribers[eventType].forEach(callback => {
      callback(data);
    });
  }
}

// Пример использования
const eventChannel = new EventChannel();

// Подписчик 1
const unsubscribeUserCreated1 = eventChannel.subscribe('user_created', (user) => {
  console.log(`Подписчик 1: Пользователь создан - ${user.name}`);
});

// Подписчик 2
const unsubscribeUserCreated2 = eventChannel.subscribe('user_created', (user) => {
  console.log(`Подписчик 2: Новый пользователь - ${user.name}, email: ${user.email}`);
});

// Подписчик на другое событие
const unsubscribeOrderPlaced = eventChannel.subscribe('order_placed', (order) => {
  console.log(`Заказ размещен: ID ${order.id}, сумма: $${order.amount}`);
});

// Публикация событий
eventChannel.publish('user_created', {
  name: 'Иван Иванов',
  email: 'ivan@example.com'
});

eventChannel.publish('order_placed', {
  id: 12345,
  amount: 99.99
});

// Отписка первого подписчика
unsubscribeUserCreated();

// Следующее событие не вызовет первый обработчик
eventChannel.publish('user_created', {
  name: 'Петр Петров',
  email: 'petr@example.com'
});

// Преимущества:
// - Слабосвязанность компонентов
// - Упрощение коммуникации между многими компонентами
// - Гибкость и масштабируемость
// - Упрощение отладки (централизованная логика событий)