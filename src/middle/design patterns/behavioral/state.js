// State — поведенческий шаблон проектирования. Используется в тех случаях,
// когда во время выполнения программы объект должен менять своё поведение в зависимости от своего состояния.

// Контекст - автомат по продаже билетов
class TicketMachine {
  constructor() {
    // Инициализация всех возможных состояний
    this.states = {
      idle: new IdleState(this),
      selecting: new SelectingState(this),
      payment: new PaymentState(this),
      printing: new PrintingState(this),
      outOfService: new OutOfServiceState(this)
    };
    
    this.currentState = this.states.idle;
    this.selectedTicket = null;
    this.paymentAmount = 0;
    this.ticketPrice = 0;
    this.isOnline = true;
  }

  // Методы для взаимодействия с автоматом
  selectTicket(ticketType, price) {
    this.currentState.selectTicket(ticketType, price);
  }

  insertMoney(amount) {
    this.currentState.insertMoney(amount);
  }

  cancel() {
    this.currentState.cancel();
  }

  printTicket() {
    this.currentState.printTicket();
  }

  setState(newState) {
    console.log(`Переход из состояния ${this.currentState.constructor.name} в ${newState.constructor.name}`);
    this.currentState = newState;
    this.currentState.onEnter();
  }

  // Технические методы
  goOnline() {
    this.isOnline = true;
    if (this.currentState === this.states.outOfService) {
      this.setState(this.states.idle);
    }
  }

  goOffline() {
    this.isOnline = false;
    this.setState(this.states.outOfService);
  }

  // Вспомогательные методы
  resetTransaction() {
    this.selectedTicket = null;
    this.paymentAmount = 0;
    this.ticketPrice = 0;
  }

  giveChange() {
    const change = this.paymentAmount - this.ticketPrice;
    if (change > 0) {
      console.log(`Выдача сдачи: ${change} руб.`);
      this.paymentAmount = this.ticketPrice;
    }
    return change;
  }
}

// Базовый класс состояния
class State {
  constructor(machine) {
    this.machine = machine;
  }

  onEnter() {}
  selectTicket() { console.log("Недоступно в текущем состоянии"); }
  insertMoney() { console.log("Недоступно в текущем состоянии"); }
  cancel() { console.log("Недоступно в текущем состоянии"); }
  printTicket() { console.log("Недоступно в текущем состоянии"); }
}

// Конкретные состояния

// Ожидание выбора билета
class IdleState extends State {
  onEnter() {
    console.log("Готов к работе. Выберите билет.");
  }

  selectTicket(ticketType, price) {
    console.log(`Выбран билет: ${ticketType} за ${price} руб.`);
    this.machine.selectedTicket = ticketType;
    this.machine.ticketPrice = price;
    this.machine.setState(this.machine.states.selecting);
  }
}

// Выбор билета
class SelectingState extends State {
  onEnter() {
    console.log(`Выберите способ оплаты для билета: ${this.machine.selectedTicket}`);
  }

  insertMoney(amount) {
    this.machine.paymentAmount += amount;
    console.log(`Внесено: ${amount} руб. Всего: ${this.machine.paymentAmount} руб.`);
    
    if (this.machine.paymentAmount >= this.machine.ticketPrice) {
      this.machine.setState(this.machine.states.payment);
    }
  }

  cancel() {
    console.log("Отмена выбора. Возврат денег.");
    if (this.machine.paymentAmount > 0) {
      console.log(`Возврат: ${this.machine.paymentAmount} руб.`);
    }
    this.machine.resetTransaction();
    this.machine.setState(this.machine.states.idle);
  }
}

// Оплата
class PaymentState extends State {
  onEnter() {
    const change = this.machine.giveChange();
    console.log(`Оплата принята. Нажмите 'Печать' для получения билета. Сдача: ${change}`);
  }

  printTicket() {
    if (this.machine.isOnline) {
      this.machine.setState(this.machine.states.printing);
    } else {
      console.log("Нет связи с сервером. Невозможно напечатать билет.");
      this.machine.cancel();
    }
  }

  cancel() {
    console.log("Отмена операции. Возврат денег.");
    console.log(`Возврат: ${this.machine.paymentAmount} руб.`);
    this.machine.resetTransaction();
    this.machine.setState(this.machine.states.idle);
  }
}

// Печать билета
class PrintingState extends State {
  onEnter() {
    console.log(`Печать билета: ${this.machine.selectedTicket}...`);
    // Имитация печати
    setTimeout(() => {
      console.log("Билет успешно напечатан!");
      this.machine.resetTransaction();
      this.machine.setState(this.machine.states.idle);
    }, 2000);
  }
}

// Неисправность/обслуживание
class OutOfServiceState extends State {
  onEnter() {
    console.log("Автомат временно не работает. Приносим извинения за неудобства.");
  }
}

// Пример использования
const machine = new TicketMachine();

// Нормальный сценарий
machine.selectTicket("Проездной на метро", 50);
machine.insertMoney(20);
machine.insertMoney(20);
machine.insertMoney(20); // Должно хватить
machine.printTicket();

// Сценарий с отменой
setTimeout(() => {
  console.log("\nНовая транзакция:");
  machine.selectTicket("Проездной на автобус", 30);
  machine.insertMoney(10);
  machine.cancel();
}, 4000);

// Переход в автономный режим
setTimeout(() => {
  console.log("\nСервер недоступен:");
  machine.goOffline();
  machine.selectTicket("Проездной на метро", 50);
}, 7000);

// Возврат в онлайн
setTimeout(() => {
  console.log("\nСервер снова доступен:");
  machine.goOnline();
}, 10000);


// Преимущества:
// - Избегание условных операторов
// - Инкапсуляция поведения состояний
// - Упрощение добавления новых состояний
// - Явные переходы между состояниями
// - Уменьшение дублирования кода

// Недостатки:
// - Избыточность для простых случаев
// - Увеличение количества классов
// - Сложность отслеживания переходов
// - Потенциальная связность
// - Накладные расходы