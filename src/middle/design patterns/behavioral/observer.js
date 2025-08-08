// Observer — это поведенческий паттерн проектирования, который создаёт механизм подписки,
// позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.

// Основные понятия:
// - Subject (Издатель) - объект, который содержит состояние и управляет им. Когда состояние меняется, издатель уведомляет своих подписчиков.
// - Observer (Подписчик) - интерфейс с методом обновления, который вызывается издателем при изменении состояния.
// - Concrete Observers - конкретные реализации подписчиков, которые выполняют какие-то действия в ответ на уведомления от издателя.

// Издатель (Subject)
class WeatherStation {
  constructor() {
    this.observers = [];
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
  }

  // Методы подписки/отписки
  subscribe(observer) {
    this.observers.push(observer);
    console.log(`${observer.constructor.name} подписался на обновления`);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
    console.log(`${observer.constructor.name} отписался от обновлений`);
  }

  // Уведомление всех наблюдателей
  notify() {
    this.observers.forEach(observer => {
      observer.update(this.temperature, this.humidity, this.pressure);
    });
  }

  // Изменение данных и уведомление наблюдателей
  setMeasurements(temperature, humidity, pressure) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notify();
  }
}

// Абстрактный наблюдатель (необязательный, просто для структуры)
class WeatherObserver {
  update(temperature, humidity, pressure) {
    throw new Error("Метод update должен быть реализован");
  }
}

// Конкретные наблюдатели (Concrete Observers)

// 1. Дисплей текущих показаний
class CurrentConditionsDisplay extends WeatherObserver {
  update(temperature, humidity, pressure) {
    console.log(`[Текущие условия] Температура: ${temperature}°C, Влажность: ${humidity}%, Давление: ${pressure} hPa`);
  }
}

// 2. Статистический дисплей
class StatisticsDisplay extends WeatherObserver {
  constructor() {
    super();
    this.temps = [];
  }

  update(temperature, humidity, pressure) {
    this.temps.push(temperature);
    const avg = this.temps.reduce((a, b) => a + b, 0) / this.temps.length;
    const max = Math.max(...this.temps);
    const min = Math.min(...this.temps);
    
    console.log(`[Статистика] Средняя: ${avg.toFixed(1)}°C, Макс: ${max}°C, Мин: ${min}°C`);
  }
}

// 3. Прогноз погоды
class ForecastDisplay extends WeatherObserver {
  update(temperature, humidity, pressure) {
    let forecast = "Незначительные изменения";
    if (pressure < 1000 && humidity > 70) {
      forecast = "Ожидается дождь";
    } else if (pressure > 1020 && humidity < 50) {
      forecast = "Будет ясно и солнечно";
    }
    
    console.log(`[Прогноз] ${forecast}`);
  }
}

// Использование
const weatherStation = new WeatherStation();

// Создаем конкретных наблюдателей
const currentDisplay = new CurrentConditionsDisplay();
const statsDisplay = new StatisticsDisplay();
const forecastDisplay = new ForecastDisplay();

// Подписываем их на метеостанцию
weatherStation.subscribe(currentDisplay);
weatherStation.subscribe(statsDisplay);
weatherStation.subscribe(forecastDisplay);

// Изменяем погодные данные (наблюдатели получат уведомления)
weatherStation.setMeasurements(25, 65, 1015);
console.log('---');
weatherStation.setMeasurements(27, 70, 1005);
console.log('---');
weatherStation.setMeasurements(22, 90, 990);

// Отписываем один из дисплеев
weatherStation.unsubscribe(statsDisplay);

console.log('\nПосле отписки статистического дисплея:');
weatherStation.setMeasurements(20, 85, 995);


// Преимущества:
// - Гибкая связь между объектами (издатель не знает деталей о подписчиках)
// - Поддержка принципа открытости/закрытости (можно добавлять новые подписчики без изменения издателя)
// - Возможность рассылки уведомлений нескольким получателям

// Недостатки:
// - Подписчики оповещаются в случайном порядке
// - Возможны утечки памяти, если подписчики не отписываются явно