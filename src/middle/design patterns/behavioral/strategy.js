// Strategy — поведенческий шаблон проектирования, предназначенный для определения семейства алгоритмов,
// инкапсуляции каждого из них и обеспечения их взаимозаменяемости. Это позволяет выбирать алгоритм путём определения соответствующего класса.
// Шаблон Strategy позволяет менять выбранный алгоритм независимо от объектов-клиентов, которые его используют.


// Контекст - обработчик платежей
class PaymentProcessor {
  constructor() {
    this.strategy = null;
    this.paymentHistory = [];
  }

  setPaymentStrategy(strategy) {
    this.strategy = strategy;
  }

  async processPayment(amount, paymentDetails) {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }

    // Валидация данных
    const isValid = this.strategy.validate(paymentDetails);
    if (!isValid) {
      throw new Error('Invalid payment details');
    }

    // Обработка платежа
    try {
      const result = await this.strategy.execute(amount, paymentDetails);
      this.paymentHistory.push({
        amount,
        method: this.strategy.constructor.name,
        date: new Date(),
        status: 'success'
      });
      return result;
    } catch (error) {
      this.paymentHistory.push({
        amount,
        method: this.strategy.constructor.name,
        date: new Date(),
        status: 'failed',
        error: error.message
      });
      throw error;
    }
  }

  getPaymentHistory() {
    return this.paymentHistory;
  }
}

// Базовый класс стратегии
class PaymentStrategy {
  validate() {
    throw new Error('validate method must be implemented');
  }

  execute() {
    throw new Error('execute method must be implemented');
  }
}

// Конкретные стратегии оплаты
class CreditCardStrategy extends PaymentStrategy {
  validate(details) {
    return (
      details.cardNumber &&
      details.cardNumber.length === 16 &&
      details.expiryDate &&
      details.cvv &&
      details.cvv.length === 3
    );
  }

  async execute(amount, details) {
    console.log(`Processing credit card payment of $${amount} with card ${details.cardNumber.slice(-4)}`);
    // Здесь была бы реальная логика обработки карты
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ transactionId: `CC-${Date.now()}`, amount });
      }, 1000);
    });
  }
}

class PayPalStrategy extends PaymentStrategy {
  validate(details) {
    return details.email && details.password;
  }

  async execute(amount, details) {
    console.log(`Processing PayPal payment of $${amount} for ${details.email}`);
    // Имитация асинхронного запроса к PayPal
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ transactionId: `PP-${Date.now()}`, amount });
      }, 1500);
    });
  }
}

class CryptoStrategy extends PaymentStrategy {
  constructor() {
    super();
    this.supportedCryptos = ['BTC', 'ETH', 'LTC'];
  }

  validate(details) {
    return (
      this.supportedCryptos.includes(details.cryptoType) &&
      details.walletAddress &&
      details.walletAddress.length > 20
    );
  }

  async execute(amount, details) {
    console.log(`Processing ${details.cryptoType} payment of $${amount} to ${details.walletAddress.slice(0, 10)}...`);
    // Имитация работы с блокчейном
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          transactionId: `CRYPTO-${Date.now()}`,
          amount,
          cryptoAmount: amount / this.getCryptoRate(details.cryptoType),
          cryptoType: details.cryptoType
        });
      }, 2000);
    });
  }

  getCryptoRate(cryptoType) {
    // Упрощенная логика - в реальности был бы запрос к API
    const rates = { BTC: 50000, ETH: 3000, LTC: 150 };
    return rates[cryptoType] || 1;
  }
}

// Использование
async function runPaymentExample() {
  const paymentProcessor = new PaymentProcessor();

  // Оплата кредитной картой
  paymentProcessor.setPaymentStrategy(new CreditCardStrategy());
  try {
    const result = await paymentProcessor.processPayment(100, {
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123'
    });
    console.log('Credit card payment success:', result);
  } catch (error) {
    console.error('Credit card payment failed:', error);
  }

  // Оплата через PayPal
  paymentProcessor.setPaymentStrategy(new PayPalStrategy());
  try {
    const result = await paymentProcessor.processPayment(75, {
      email: 'user@example.com',
      password: 'securepassword'
    });
    console.log('PayPal payment success:', result);
  } catch (error) {
    console.error('PayPal payment failed:', error);
  }

  // Оплата криптовалютой
  paymentProcessor.setPaymentStrategy(new CryptoStrategy());
  try {
    const result = await paymentProcessor.processPayment(50, {
      cryptoType: 'ETH',
      walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
    });
    console.log('Crypto payment success:', result);
  } catch (error) {
    console.error('Crypto payment failed:', error);
  }

  // История платежей
  console.log('Payment history:', paymentProcessor.getPaymentHistory());
}

runPaymentExample();


// Преимущества:
// - Изолирует код и данные алгоритмов от основного кода
// - Позволяет легко добавлять новые алгоритмы
// - Заменяет условные операторы (switch/case или if/else)

// Недостатки:
// - Клиент должен знать о существовании стратегий
// - Увеличивает количество объектов в приложении